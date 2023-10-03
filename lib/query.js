const { _, log } = require('@basd/base')
const Registry = require('@basd/registry')
const QueryBuilder = require('./query-builder')
const QueryParser = require('./query-parser')
const QueryVisitor = require('./query-visitor')
const QueryInterpreter = require('./query-interpreter')
const QueryEngine = require('./query-engine')
const QueryFactory = require('./query-factory')

/**
 * Represents a query instance, initialized with certain options.
 * The query is constructed using the builder, parser, visitor, and interpreter.
 */
class Query {
  static get Query() { return Query }
  static get Builder() { return QueryBuilder }
  static get Parser() { return QueryParser }
  static get Visitor() { return QueryVisitor }
  static get Interpreter() { return QueryInterpreter }
  static get Engine() { return QueryEngine }
  static get Factory() { return QueryFactory }
  /**
   * Creates a new Query instance.
   * @param {Object} [opts={}] - The options to initialize the query with.
   */
  constructor(opts = {}) {
    _.objProp(this, 'opts', opts)
    _.objProp(this, 'registry', Registry.get(opts))
    _.objProp(this, 'factory', new this.constructor.Factory(this.registry))
    this.builder = this.factory.createBuilder(this.opts.builder)
    for (const [tag, fn] of _.entries(opts.builders))
      _.objProp(this.builder, tag, fn.bind(this.builder))
    this.parser = this.factory.createParser(this.opts.parser)
    this.visitor = this.factory.createVisitor(this.opts.visitor)
    for (const [tag, fn] of _.entries(opts.visitors))
      _.objProp(this.visitor, _.uc(tag), fn.bind(this.visitor), { show: true })
    this.interpreter = this.factory.createInterpreter(this.visitor)
    if (_.isFunction(opts.prepare))
      _.objProp(this, 'prepare', opts.prepare)
  }

  /**
   * Builds the query using the builder.
   * @returns {Object} The constructed query.
   */
  build() {
    return this.builder.build()
  }

  /**
   * Parses the built query to generate an abstract syntax tree (AST).
   * @returns {Object} The parsed query AST.
   */
  parse() {
    const query = this.builder.build()
    return this.parser.parse(query)
  }

  /**
   * Creates an evaluator function to evaluate the query against an entity.
   * @returns {Function} A function that takes an entity and returns a 
   * boolean indicating whether the entity matches the query.
   */
  evaluator() {
    const config = this.parse()
    if (this.prepare)
      this.prepare(config)
    return (entity) => this.interpreter.interpret(config.ast, entity, config)
  }
}

QueryEngine.Query = Query

module.exports = Query
