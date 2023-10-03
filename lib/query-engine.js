const { _, log } = require('@basd/base')

/**
 * Specialized visitor for refining query results.
 */
class QueryEngineVisitor {
  /**
   * Refines the results based on the provided configuration.
   * Applies transformations to the results, like sorting or selecting specific fields.
   * 
   * @param {Array} results - Array of results to be refined.
   * @param {Object} config - Configuration for refining the results.
   * @returns {Array} - Refined results.
   * @throws Will throw an error if an unsupported ORM query engine type is encountered.
   * @async
   */
  async refine(results = [], config = {}) {
    for (const [type, value] of _.entries(_.omit(config.transforms, ['limit']))) {
      if (_.isFunction(this[type]))
        return this[type](results, value)
      throw new Error(`Unsupported ORM query engine type: ${type}`)
    }
    return results
  }

  /**
   * Sorts the given results array based on the provided value.
   * Can handle ascending and descending orders.
   * 
   * @param {Array} results - Array of results to be sorted.
   * @param {string} value - Property name on which to sort the results.
   * @returns {Array} - Sorted results.
   */
  sort(results, value) {
    let invert = 1
    if (value.startsWith('-')) {
      value = value.slice(1)
      invert = -1
    }
    results.sort((A, B) => {
      const a = _.get(A, value)
      const b = _.get(B, value)
      if (a > b) return 1 * invert
      if (a < b) return -1 * invert
      return 0
    })
    return results
  }

  /**
   * Selects specific keys from each result in the results array.
   * 
   * @param {Array} results - Array of results from which to select specific fields.
   * @param {Array<string>} value - Array of keys to be selected.
   * @returns {Array} - Results with only the selected keys.
   */
  select(results, value) {
    return results.map(result => _.pick(result, value))
  }

  /**
   * Skips a certain number of results from the beginning of the results array.
   * 
   * @param {Array} results - Array of results to be processed.
   * @param {number} value - Number of results to skip from the beginning.
   * @returns {Array} - Results after skipping the specified number.
   */
  skip(results, value) {
    return results.slice(value)
  }
}

/**
 * Main engine to execute and handle query operations.
 */
class QueryEngine {
  /**
   * Constructs a new QueryEngine instance.
   * 
   * @param {Object|Function} opts - Configuration options or a getIterator function.
   * @property {Function} [opts.Query] - Custom Query constructor.
   * @property {Function} [opts.getIterator] - Function to provide an iterator.
   * @property {Function} [opts.refine] - Custom refine function.
   * @property {Function} [opts.filter] - Custom filter function.
   */
  constructor(opts = {}) {
    if (_.isFunction(opts))
      opts = { getIterator: opts }
    _.objProp(this, 'Query', opts.Query || this.constructor.Query)
    _.objProp(this, 'opts', opts)
    _.objProp(this, 'getIterator', opts.getIterator)
    if (_.isFunction(this.opts.refine))
      _.objProp(this, 'refine', this.opts.refine.bind(this))
    if (_.isFunction(this.opts.filter))
      _.objProp(this, 'filter', this.opts.filter.bind(this))
  }

  /**
   * Refines the results array using the provided configuration.
   * Uses the `QueryEngineVisitor` to apply transformations like sort, select, etc.
   * 
   * @param {Array} results - Array of results to be refined.
   * @param {Object} config - Configuration for refining the results.
   * @returns {Promise<Array>} - Refined results.
   * @async
   */
  async refine(results, config) {
    const visitor = new QueryEngineVisitor()
    return visitor.refine(results, config)
  }

  /**
   * Filters an entity based on the provided configuration.
   * This is a placeholder function and can be overridden.
   * 
   * @param {Object} entity - The entity to filter.
   * @param {Object} config - Configuration for filtering.
   * @async
   */
  async filter(entity, config) {
  }

  /**
   * Finds entities matching a given query object.
   * Constructs and returns a query builder if no query object is provided.
   * 
   * @param {Object} queryObject - Query object specifying search criteria.
   * @param {Function} iterator - Custom iterator function.
   * @returns {Function|Promise<Array>} - Either the query builder or the result of the search.
   */
  find(queryObject, iterator) {
    const query = new this.Query(this.opts)
    _.objProp(query.builder, 'exec', this.execute.bind(this, query, iterator))
    if (!queryObject)
      return query.builder
    query.builder.setQuery(queryObject)
    return query.builder.exec()
  }

  /**
   * Executes the query and fetches results matching the criteria.
   * Iterates through entities, filters them, and collects matching ones.
   * 
   * @param {Object} query - The query instance.
   * @param {Function} iterator - Iterator function to loop through entities.
   * @returns {Promise<Array>} - Array of entities that match the query criteria.
   * @async
   */
  async execute(query, iterator) {
    const evaluate = query.evaluator()
    const config = query.parse()
    const { limit = 0 } = config.transforms
    const results = []
    for await (const [, entity] of iterator || this.getIterator()) {
      if (limit && results.length >= limit)
        break
      await this.filter(entity, config)
      if (evaluate(entity))
        results.push(entity)
    }
    return this.refine(results, config)
  }
}

module.exports = QueryEngine
