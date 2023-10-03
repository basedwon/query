const { _, log } = require('@basd/base')

/**
 * Parses queries and generates abstract syntax trees.
 */
class QueryParser {
  /**
   * Constructs a new QueryParser.
   */
  constructor() {
    this.fields = new Set()
    this.operators = new Set()
    this.transforms = {}
  }

  /**
   * Parses a query and generates an abstract syntax tree.
   * @param {Object} query - The query object to parse.
   * @returns {Object} - The parsed representation of the query.
   */
  parse(query) {
    if (this._parsed)
      return this._parsed
    this.ast = this.parseQuery(query)
    this.fields = Array.from(this.fields)
    this.operators = Array.from(this.operators)
    _.objProp(this, '_parsed', { ...this })
    return this._parsed
  }

  /**
   * Generates the abstract syntax tree for a query.
   * @param {Object} query - The query to parse.
   * @returns {Object} - The abstract syntax tree representation of the query.
   */
  parseQuery(query) {
    const ast = { type: 'AND', children: [] }
    for (const [key, condition] of Object.entries(query)) {
      if (condition.$or) {
        const children = condition.$or.map(cond => this.visit(key, cond, this))
        const orNode = { type: 'OR', children }
        ast.children.push(orNode)
      } else if (condition.$and) {
        const children = condition.$and.map(cond => this.visit(key, cond, this))
        const andNode = { type: 'AND', children }
        ast.children.push(andNode)
      } else {
        if (!_.isObj(condition)) {
          const type = String(key.slice(1)).toLowerCase()
          this.transforms[type] = condition
        } else {
          ast.children.push(this.visit(key, condition, this))
        }
      }
    }
    return ast
  }

  /**
   * Visits a key-condition pair and generates a node for the abstract syntax tree.
   * @param {string} key - The property key.
   * @param {Object} condition - The condition associated with the key.
   * @returns {Object} - A node representing the key and condition for the abstract syntax tree.
   * @throws {Error} Throws an error if an unsupported condition operator is encountered.
   */
  visit(key, condition) {
    this.fields.add(key)
    for (const [op, value] of Object.entries(condition)) {
      this.operators.add({ op, value })
      const type = String(op.slice(1)).toUpperCase()
      return { type, key, value }
    }
    throw new Error(`Unsupported condition operator: ${op}`)
  }
}

module.exports = QueryParser
