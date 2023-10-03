const { _, log } = require('@basd/base')
const QueryBuilder = require('./query-builder')
const QueryParser = require('./query-parser')
const QueryVisitor = require('./query-visitor')
const QueryInterpreter = require('./query-interpreter')

/**
 * Factory class to create various query-related instances.
 */
class QueryFactory {
  /**
   * Constructs a new QueryFactory.
   * @param {Object} registry - An object that acts as the registry for various instances.
   */
  constructor(registry) {
    this.registry = registry
    this.registry.setMany({
      builder: QueryBuilder,
      parser: QueryParser,
      visitor: QueryVisitor,
      interpreter: QueryInterpreter,
    })
  }

  /**
   * Creates a new instance of a QueryBuilder.
   * @param {...*} args - Arguments to pass to the QueryBuilder constructor.
   * @returns {QueryBuilder} - A new QueryBuilder instance.
   */
  createBuilder(...args) {
    return this.registry.createInstance('builder', QueryBuilder, ...args)
  }

  /**
   * Creates a new instance of a QueryParser.
   * @param {...*} args - Arguments to pass to the QueryParser constructor.
   * @returns {QueryParser} - A new QueryParser instance.
   */
  createParser(...args) {
    return this.registry.createInstance('parser', QueryParser, ...args)
  }

  /**
   * Creates a new instance of a QueryVisitor.
   * @param {...*} args - Arguments to pass to the QueryVisitor constructor.
   * @returns {QueryVisitor} - A new QueryVisitor instance.
   */
  createVisitor(...args) {
    return this.registry.createInstance('visitor', QueryVisitor, ...args)
  }

  /**
   * Creates a new instance of a QueryInterpreter.
   * @param {QueryVisitor} visitor - A visitor instance.
   * @param {...*} args - Additional arguments to pass to the QueryInterpreter constructor.
   * @returns {QueryInterpreter} - A new QueryInterpreter instance.
   * @throws {Error} Throws an error if the provided visitor is not a valid instance.
   */
  createInterpreter(visitor, ...args) {
    visitor = visitor || this.createVisitor()
    if (!this.registry.isValidInstance(visitor, QueryVisitor))
      throw new Error(`Invalid visitor instance`)
    return this.registry.createInstance('interpreter', QueryInterpreter, visitor, ...args)
  }
}

module.exports = QueryFactory
