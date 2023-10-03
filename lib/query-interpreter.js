const { _, log } = require('@basd/base')
const QueryVisitor = require('./query-visitor')

/**
 * Interprets the parsed query against an entity.
 */
class QueryInterpreter {
  /**
   * Creates an instance of the QueryInterpreter.
   * 
   * @param {QueryVisitor} visitor - An instance of a QueryVisitor.
   * @param {Object} [options={}] - Optional configuration for the interpreter.
   */
  constructor(visitor, options) {
    this.visitor = visitor || new QueryVisitor()
  }

  /**
   * Interprets an AST (Abstract Syntax Tree) against an entity.
   * 
   * @param {Object} ast - The AST representation of the query.
   * @param {Object} entity - The entity to be interpreted against the AST.
   * @param {Object} config - Configuration options for the interpreter.
   * @returns {boolean} - True if the entity matches the criteria, false otherwise.
   */
  interpret(ast, entity, config) {
    return this.visitor.visit(ast, entity, config)
  }
}

module.exports = QueryInterpreter
