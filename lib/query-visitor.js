const { _, log } = require('@basd/base')

/**
 * Visits different nodes of the parsed query to evaluate them.
 */
class QueryVisitor {
  /**
   * Visits a node in the AST and evaluates it against an entity.
   * 
   * @param {Object} node - The AST node.
   * @param {Object} entity - The entity to evaluate.
   * @param {Object} config - Configuration options for the visitor.
   * @returns {boolean} - True if the node and entity match the criteria, false otherwise.
   */
  visit(node, entity, config) {
    if (node.type === 'AND')
      return node.children.every(child => this.visit(child, entity, config))
    else if (node.type === 'OR')
      return node.children.some(child => this.visit(child, entity, config))
    else if (_.isFunction(this[node.type]))
      return this[node.type](_.get(entity, node.key), node.value, config)
    throw new Error(`Unsupported query node type: ${node.type}`)
  }

  /**
   * Evaluates the equality condition between a property and a constraint.
   * 
   * @param {*} property - The property from the entity.
   * @param {*} constraint - The constraint to evaluate against.
   * @returns {boolean} - True if the property matches the constraint, false otherwise.
   */
  EQ(property, constraint) {
    if (_.isFunction(constraint)) {
      return constraint(property)
    } else if (_.isRegExp(constraint)) {
      return constraint.test(String(property))
    }
    return property === constraint
  }

  /**
   * Evaluates if the property is greater than the constraint.
   * 
   * @param {number} property - The numeric property from the entity.
   * @param {number} constraint - The number to evaluate against.
   * @returns {boolean} - True if the property is greater than the constraint, false otherwise.
   */
  GT(property, constraint) {
    return property > constraint
  }

  /**
   * Evaluates if the property is greater than or equal to the constraint.
   * 
   * @param {number} property - The numeric property from the entity.
   * @param {number} constraint - The number to evaluate against.
   * @returns {boolean} - True if the property is greater than or equal to the constraint, false otherwise.
   */
  GTE(property, constraint) {
    return property >= constraint
  }

  /**
   * Evaluates if the property is less than the constraint.
   * 
   * @param {number} property - The numeric property from the entity.
   * @param {number} constraint - The number to evaluate against.
   * @returns {boolean} - True if the property is less than the constraint, false otherwise.
   */
  LT(property, constraint) {
    return property < constraint
  }

  /**
   * Evaluates if the property is less than or equal to the constraint.
   * 
   * @param {number} property - The numeric property from the entity.
   * @param {number} constraint - The number to evaluate against.
   * @returns {boolean} - True if the property is less than or equal to the constraint, false otherwise.
   */
  LTE(property, constraint) {
    return property <= constraint
  }
}

module.exports = QueryVisitor
