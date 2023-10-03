const { _, log } = require('@basd/base')

/**
 * Represents a builder for constructing queries.
 */
class QueryBuilder {
  /**
   * Creates a new QueryBuilder instance.
   * @param {Object} query - The initial query to start building from.
   */
  constructor(query) {
    this.conditions = []
    this.currentCondition = null
    this.setQuery(query)
  }

  /**
   * Sets the base query for the builder.
   * @param {Object} [query={}] - The query to set.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  setQuery(query = {}) {
    for (const [key, value] of Object.entries(query)) {
      if (key.startsWith('$')) continue
      if (typeof value === 'object' && Object.keys(value).every(k => k.startsWith('$'))) {
        this.where(key)
        for (const [conditionKey, conditionValue] of Object.entries(value)) {
          this.addCondition(conditionKey, conditionValue)
        }
        continue
      }
      query[key] = { $eq: value }
    }
    this.query = { ...this.query, ...query }
    return this
  }

  /**
   * Specifies a property to begin constructing conditions for.
   * @param {string} prop - The property name.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  where(prop) {
    this.and()
    if (this.currentCondition) {
      this.conditions.push(this.currentCondition)
      this.currentCondition = null
    }
    this.prop = prop
    return this
  }

  /**
   * Adds an equality condition.
   * @param {*} value - The value to compare against.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  equals(value) {
    return this.addCondition('$eq', value)
  }

  /**
   * Adds a greater than condition.
   * @param {number} num - The threshold value.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  gt(num) {
    return this.addCondition('$gt', num)
  }

  /**
   * Adds a greater than or equal condition.
   * @param {number} num - The threshold value.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  gte(num) {
    return this.addCondition('$gte', num)
  }

  /**
   * Adds a less than condition.
   * @param {number} num - The threshold value.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  lt(num) {
    return this.addCondition('$lt', num)
  }

  /**
   * Adds a less than or equal condition.
   * @param {number} num - The threshold value.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  lte(num) {
    return this.addCondition('$lte', num)
  }

  /**
   * Adds an "in" condition.
   * @param {Array<*>} arr - The array of possible values.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  in(arr) {
    return this.addCondition('$in', arr)
  }

  /**
   * Adds a "not in" condition.
   * @param {Array<*>} arr - The array of values to be excluded.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  nin(arr) {
    return this.addCondition('$nin', arr)
  }

  /**
   * Adds an "all" condition.
   * @param {Array<*>} arr - The array of all values that should be matched.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  all(arr) {
    return this.addCondition('$all', arr)
  }

  /**
   * Sets the current grouping condition to OR.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  or() {
    this.isOrCondition = true
    return this
  }

  /**
   * Sets the current grouping condition to AND.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  and() {
    this.isOrCondition = false
    return this
  }

  /**
   * Adds a new condition to the query.
   * @param {string} operator - The condition operator.
   * @param {*} value - The value for the condition.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  addCondition(operator, value) {
    const condition = { operator, value }
    if (this.isOrCondition)
      this.handleOrCondition(condition)
    else
      this.handleAndCondition(condition)
    return this
  }

  /**
   * Handle an OR condition.
   * @param {object} condition - The condition to handle.
   * @private
   */
  handleOrCondition(condition) {
    if (!this.currentCondition)
      this.currentCondition = { prop: this.prop, $or: [] }
    if (!this.currentCondition.$or)
      this.currentCondition = { prop: this.prop, $or: [this.currentCondition] }
    this.currentCondition.$or.push({ prop: this.prop, ...condition })
  }

  /**
   * Handle an AND condition.
   * @param {object} condition - The condition to handle.
   * @private
   */
  handleAndCondition(condition) {
    if (this.currentCondition)
      this.conditions.push(this.currentCondition)
    this.currentCondition = { prop: this.prop, ...condition }
  }

  /**
   * Convert a condition to its final form.
   * @param {object} condition - The condition to convert.
   * @returns {object} The converted condition.
   * @private
   */
  convertCondition(condition) {
    if (condition.$or)
      return { $or: condition.$or.map(cond => this.convertCondition(cond)) }
    return { [condition.operator]: condition.value }
  }

  /**
   * Adds a transformation condition.
   * @param {string} operator - The operator string.
   * @param {*} value - The value for the transformation.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  addTransform(operator, value) {
    const query = { [operator]: value }
    this.query = { ...this.query, ...query }
    return this
  }

  /**
   * Adds a limit transformation.
   * @param {number} num - The limit value.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  limit(num) {
    return this.addTransform('$limit', num)
  }

  /**
   * Adds a skip transformation.
   * @param {number} num - The skip value.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  skip(num) {
    return this.addTransform('$skip', num)
  }

  /**
   * Adds a sort transformation.
   * @param {string} key - The key by which to sort.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  sort(key) {
    return this.addTransform('$sort', key)
  }

  /**
   * Adds a select transformation.
   * @param {...string} keys - The keys to select.
   * @returns {QueryBuilder} The current instance for chaining.
   */
  select(...keys) {
    return this.addTransform('$select', _.flatten(keys))
  }

  /**
   * Builds the current state of the query into its final form.
   * @returns {Object} The final query object.
   */
  build() {
    if (this.currentCondition)
      this.conditions.push(this.currentCondition)
    const query = { ...this.query }
    const propConditions = {}
    for (const condition of this.conditions) {
      if (condition) {
        if (!propConditions[condition.prop])
          propConditions[condition.prop] = []
        propConditions[condition.prop].push(this.convertCondition(condition))
      }
    }
    for (const [prop, conditions] of Object.entries(propConditions))
      query[prop] = conditions.length > 1 ? { $and: conditions } : conditions[0]
    return query
  }
}

module.exports = QueryBuilder
