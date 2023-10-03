const QueryBuilder = require('../lib/query-builder')
const QueryVisitor = require('../lib/query-visitor')
const QueryInterpreter = require('../lib/query-interpreter')
const QueryEngine = require('../lib/query-engine')
const QueryFactory = require('../lib/query-factory')
const QueryParser = require('../lib/query-parser')
const Registry = require('@basd/registry')

// Builder

describe('QueryBuilder', () => {
  let builder

  beforeEach(() => {
    builder = new QueryBuilder()
  })

  it('should build an equal query', () => {
    builder.where('name').equals('Alice')
    expect(builder.build()).to.deep.equal({ name: { $eq: 'Alice' } })
  })

  it('should build a greater than query', () => {
    builder.where('age').gt(25)
    expect(builder.build()).to.deep.equal({ age: { $gt: 25 } })
  })

  it('should build a less than or equal query', () => {
    builder.where('age').lte(30)
    expect(builder.build()).to.deep.equal({ age: { $lte: 30 } })
  })

  it('should build an "in" query', () => {
    builder.where('tags').in(['dev', 'js'])
    expect(builder.build()).to.deep.equal({ tags: { $in: ['dev', 'js'] } })
  })

  it('@todo - should build an "or" condition', () => {
    // builder.where('name').equals('Alice').or().where('name').equals('Bob')
    // log(builder.build())
    // expect(builder.build()).to.deep.equal({ name: { $or: [{ $eq: 'Alice' }, { $eq: 'Bob' }] } })
  })

  it('should build an "and" condition', () => {
    builder.where('age').gt(20).and().where('age').lt(30)
    expect(builder.build()).to.deep.equal({ age: { $and: [{ $gt: 20 }, { $lt: 30 }] } })
  })

  it('@todo - should build a combined query', () => {
    // builder.where('name').equals('Alice').and().where('age').gte(25).or().where('tags').all(['dev'])
    // expect(builder.build()).to.deep.equal({
    //   name: { $eq: 'Alice' },
    //   age: { $and: [{ $gte: 25 }, { $all: ['dev'] }] }
    // })
  })

  it('should merge existing queries', () => {
    builder.setQuery({ city: 'New York' }).where('name').equals('Alice')
    expect(builder.build()).to.deep.equal({ city: { $eq: 'New York' }, name: { $eq: 'Alice' } })
  })



  it('should build a not in query', () => {
    builder.where('tags').nin(['dev', 'js'])
    expect(builder.build()).to.deep.equal({ tags: { $nin: ['dev', 'js'] } })
  })

  it('should ignore $ prefixed conditions in setQuery', () => {
    builder.setQuery({ $sort: 'name', name: 'Alice' })
    expect(builder.build()).to.deep.equal({ $sort: 'name', name: { $eq: 'Alice' } })
  })

  it('should handle deeply nested "or" conditions', () => {
    builder.where('name').equals('Alice').or().equals('Bob').equals('Charlie')
    const query = { name: { $or: [{ $eq: 'Alice' }, { $eq: 'Bob' }, { $eq: 'Charlie' }] }}
    expect(builder.build()).to.deep.equal(query)
  })

  it('@todo - should handle combination of "or" and "and" conditions', () => {
    builder.where('name').equals('Alice').or().where('age').gt(25)
    // log(builder.build())
    // builder.where('name').equals('Alice').or().where('age').gt(25).and().where('city').equals('New York')
    // expect(builder.build()).to.deep.equal({
    //   name: { $or: [{ $eq: 'Alice' }, { $and: [{ $gt: 25 }, { $eq: 'New York' }] }] }
    // })
  })

  it('@todo - should handle complex conditions', () => {
    // builder.where('name').equals('Alice').and().where('age').gt(25).or().where('city').equals('New York').where('tags').in(['dev'])
    // expect(builder.build()).to.deep.equal({
    //   name: { $and: [{ $eq: 'Alice' }, { $or: [{ $gt: 25 }, { $eq: 'New York' }] }, { $in: ['dev'] }] }
    // })
  })

  it('@todo - should correctly chain conditions', () => {
    // builder.where('name').equals('Alice').and().where('age').gte(25).or().where('tags').all(['dev']).or().where('city').equals('New York')
    // expect(builder.build()).to.deep.equal({
    //   name: { $and: [{ $eq: 'Alice' }, { $gte: 25 }, { $or: [{ $all: ['dev'] }, { $eq: 'New York' }] }] }
    // })
  })

  it('@todo - should override existing property with setQuery', () => {
    builder.where('city').equals('London')
    builder.setQuery({ city: 'New York' })
    // log(builder.build())
    // expect(builder.build()).to.deep.equal({ city: { $eq: 'New York' } })
  })
})

// Visitor

describe('QueryVisitor', () => {
  let visitor

  beforeEach(() => {
    visitor = new QueryVisitor()
  })

  it('should evaluate EQ operation', () => {
    const result = visitor.EQ(5, 5)
    expect(result).to.be.true
  })

  it('should evaluate GT operation', () => {
    const result = visitor.GT(6, 5)
    expect(result).to.be.true
  })

  it('should evaluate GTE operation', () => {
    const result = visitor.GTE(5, 5)
    expect(result).to.be.true
  })

  it('should evaluate LT operation', () => {
    const result = visitor.LT(4, 5)
    expect(result).to.be.true
  })

  it('should evaluate LTE operation', () => {
    const result = visitor.LTE(5, 5)
    expect(result).to.be.true
  })

  it('should evaluate AND operation', () => {
    const node = { type: 'AND', children: [{ type: 'EQ', key: 'a', value: 5 }] }
    const entity = { a: 5 }
    const result = visitor.visit(node, entity)
    expect(result).to.be.true
  })

  it('should evaluate OR operation', () => {
    const node = { type: 'OR', children: [{ type: 'EQ', key: 'a', value: 5 }] }
    const entity = { a: 5 }
    const result = visitor.visit(node, entity)
    expect(result).to.be.true
  })

  it('should throw error for unsupported query node type', () => {
    const node = { type: 'INVALID', children: [] }
    const entity = {}
    expect(() => visitor.visit(node, entity)).to.throw(Error)
  })

  it('should throw error for unsupported query operation type', () => {
    expect(() => visitor.visit({ type: 'INVALID' })).to.throw(Error)
  })
})

// Interpreter

describe('QueryInterpreter', () => {
  let visitor, interpreter

  beforeEach(() => {
    visitor = new QueryVisitor()
    interpreter = new QueryInterpreter(visitor)
  })

  it('should interpret equality', () => {
    const ast = { type: 'EQ', key: 'name', value: 'Alice' }
    const entity = { name: 'Alice' }
    expect(interpreter.interpret(ast, entity)).to.be.true
  })

  it('should interpret greater than', () => {
    const ast = { type: 'GT', key: 'age', value: 21 }
    const entity = { age: 25 }
    expect(interpreter.interpret(ast, entity)).to.be.true
  })

  it('should interpret less than or equal', () => {
    const ast = { type: 'LTE', key: 'score', value: 50 }
    const entity = { score: 40 }
    expect(interpreter.interpret(ast, entity)).to.be.true
  })

  it('should interpret logical AND', () => {
    const ast = {
      type: 'AND',
      children: [
        { type: 'EQ', key: 'name', value: 'Alice' },
        { type: 'GT', key: 'age', value: 21 },
      ],
    }
    const entity = { name: 'Alice', age: 25 }
    expect(interpreter.interpret(ast, entity)).to.be.true
  })

  it('should interpret logical OR', () => {
    const ast = {
      type: 'OR',
      children: [
        { type: 'EQ', key: 'name', value: 'Bob' },
        { type: 'LT', key: 'age', value: 25 },
      ],
    }
    const entity = { name: 'Alice', age: 22 }
    expect(interpreter.interpret(ast, entity)).to.be.true
  })

  it('should return false for mismatched equality', () => {
    const ast = { type: 'EQ', key: 'name', value: 'Bob' }
    const entity = { name: 'Alice' }
    expect(interpreter.interpret(ast, entity)).to.be.false
  })

  it('should handle nested logical conditions', () => {
    const ast = {
      type: 'AND',
      children: [
        { type: 'OR', children: [{ type: 'EQ', key: 'name', value: 'Alice' }, { type: 'EQ', key: 'name', value: 'Bob' }] },
        { type: 'GT', key: 'age', value: 21 },
      ],
    }
    const entity = { name: 'Alice', age: 25 }
    expect(interpreter.interpret(ast, entity)).to.be.true
  })

  it('should handle unsupported query node type', () => {
    const ast = { type: 'INVALID', key: 'name', value: 'Alice' }
    expect(() => interpreter.interpret(ast, {})).to.throw('Unsupported query node type: INVALID')
  })
})

// Parser

describe('QueryParser', () => {
  let parser

  beforeEach(() => {
    parser = new QueryParser()
  })

  it('should parse a simple equality query', () => {
    const query = { name: { $eq: 'Alice' } }
    const result = parser.parse(query)
    expect(result.ast).to.deep.equal({ type: 'AND', children: [{ type: 'EQ', key: 'name', value: 'Alice' }] })
    expect(result.fields).to.deep.equal(['name'])
  })

  it('should parse a query with multiple conditions', () => {
    const query = {
      name: { $eq: 'Alice' },
      age: { $gt: 21 }
    }
    const result = parser.parse(query)
    expect(result.ast).to.deep.equal({
      type: 'AND',
      children: [
        { type: 'EQ', key: 'name', value: 'Alice' },
        { type: 'GT', key: 'age', value: 21 }
      ]
    })
    expect(result.fields).to.deep.equal(['name', 'age'])
  })

  it('should parse an OR condition', () => {
    const query = {
      name: { $or: [{ $eq: 'Alice' }, { $eq: 'Bob' }] }
    }
    const result = parser.parse(query)
    expect(result.ast).to.deep.equal({
      type: 'AND',
      children: [{
        type: 'OR',
        children: [
          { type: 'EQ', key: 'name', value: 'Alice' },
          { type: 'EQ', key: 'name', value: 'Bob' }
        ]
      }]
    })
    expect(result.fields).to.deep.equal(['name'])
  })

  it('should parse an AND condition', () => {
    const query = {
      age: { $and: [{ $gt: 21 }, { $lt: 30 }] }
    }
    const result = parser.parse(query)
    expect(result.ast).to.deep.equal({
      type: 'AND',
      children: [{
        type: 'AND',
        children: [
          { type: 'GT', key: 'age', value: 21 },
          { type: 'LT', key: 'age', value: 30 }
        ]
      }]
    })
    expect(result.fields).to.deep.equal(['age'])
  })

  it('@todo - should throw an error for an unsupported operator', () => {
    const query = { name: { $unsupported: 'Alice' } }
    // log(parser.parse(query))
    // expect(() => parser.parse(query)).to.throw('Unsupported condition operator: $unsupported')
  })
})

// Factory

describe('QueryFactory', () => {
  let factory

  beforeEach(() => {
    factory = new QueryFactory(new Registry())
  })

  describe('#createBuilder', () => {
    it('should create a QueryBuilder instance', () => {
      const builder = factory.createBuilder()
      expect(builder).to.be.an.instanceOf(QueryBuilder)
    })
  })

  describe('#createParser', () => {
    it('should create a QueryParser instance', () => {
      const parser = factory.createParser()
      expect(parser).to.be.an.instanceOf(QueryParser)
    })
  })

  describe('#createVisitor', () => {
    it('should create a QueryVisitor instance', () => {
      const visitor = factory.createVisitor()
      expect(visitor).to.be.an.instanceOf(QueryVisitor)
    })
  })

  describe('#createInterpreter', () => {
    it('should create a QueryInterpreter instance', () => {
      const interpreter = factory.createInterpreter()
      expect(interpreter).to.be.an.instanceOf(QueryInterpreter)
    })

    it('should throw an error if provided visitor is not an instance of QueryVisitor', () => {
      const badVisitor = {} // Not an instance of QueryVisitor
      expect(() => factory.createInterpreter(badVisitor)).to.throw('Invalid visitor instance')
    })

    it('should create an interpreter with the provided visitor', () => {
      const visitor = new QueryVisitor()
      const interpreter = factory.createInterpreter(visitor)
      expect(interpreter.visitor).to.equal(visitor)
    })
  })
})

// Engine

describe('QueryEngine', () => {
  it('@todo - should find matching entities based on equality', async () => {
    // const mockStorage = new MockStorage([
    //   { name: 'Alice', age: 30 },
    //   { name: 'Bob', age: 25 }
    // ])
    // const engine = new QueryEngine({}, mockStorage)
    // const results = await engine.find({ name: 'Alice' })
    // expect(results).to.deep.equal([{ name: 'Alice', age: 30 }])
  })

  it('@todo - should execute a query and find the matching entities', async () => {
    // const engine = new QueryEngine({}, new MockStorage())
    // const results = await engine.find({ name: 'Alice' })
    // expect(results).to.deep.equal([])
  })
  
  it('@todo - should find matching entities based on complex query with OR and AND', async () => {
    // const mockStorage = new MockStorage([
    //   { name: 'Alice', age: 30 },
    //   { name: 'Bob', age: 25 },
    //   { name: 'Alice', age: 25 }
    // ])
    // const engine = new QueryEngine({}, mockStorage)
    // const query = { $or: [{ name: 'Alice' }, { age: { $lt: 30 } }] }
    // const results = await engine.find(query)
    // expect(results).to.deep.equal([
    //   { name: 'Alice', age: 30 },
    //   { name: 'Bob', age: 25 },
    //   { name: 'Alice', age: 25 }
    // ])
  })

  it('@todo - should return empty array when no entities match', async () => {
    // const mockStorage = new MockStorage([
    //   { name: 'Alice', age: 30 },
    //   { name: 'Bob', age: 25 }
    // ])
    // const engine = new QueryEngine({}, mockStorage)
    // const results = await engine.find({ name: 'Eve' })
    // expect(results).to.deep.equal([])
  })

  it('@todo - should find matching entities based on custom operators', async () => {
    // const mockStorage = new MockStorage([
    //   { name: 'Alice', age: 30 },
    //   { name: 'Bob', age: 40 }
    // ])
    // const engine = new QueryEngine({}, mockStorage)
    // const query = { age: { $gte: 30, $lte: 40 } }
    // const results = await engine.find(query)
    // expect(results).to.deep.equal([
    //   { name: 'Alice', age: 30 },
    //   { name: 'Bob', age: 40 }
    // ])
  })
})
