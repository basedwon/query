# Query

[![npm](https://img.shields.io/npm/v/@basd/query?style=flat&logo=npm)](https://www.npmjs.com/package/@basd/query)
[![pipeline](https://gitlab.com/frenware/framework/plaindb/query/badges/master/pipeline.svg)](https://gitlab.com/frenware/framework/plaindb/query/-/pipelines)
[![license](https://img.shields.io/npm/l/@basd/query)](https://gitlab.com/frenware/framework/plaindb/query/-/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dw/@basd/query)](https://www.npmjs.com/package/@basd/query) 

[![Gitlab](https://img.shields.io/badge/Gitlab%20-%20?logo=gitlab&color=%23383a40)](https://gitlab.com/frenware/framework/plaindb/query)
[![Github](https://img.shields.io/badge/Github%20-%20?logo=github&color=%23383a40)](https://github.com/basedwon/@basd/query)
[![Twitter](https://img.shields.io/badge/@basdwon%20-%20?logo=twitter&color=%23383a40)](https://twitter.com/basdwon)
[![Discord](https://img.shields.io/badge/Basedwon%20-%20?logo=discord&color=%23383a40)](https://discordapp.com/users/basedwon)

A powerful library that provides a robust and fluent interface to build, parse, and execute queries. Designed with the principles of modularity, the library consists of a collection of classes that work in unison to create complex query expressions, translate them into an Abstract Syntax Tree (AST), and execute them. Built with modern JavaScript and extensible design patterns.

## Features

- **Supports Various Query Operations**: like `$eq`, `$gt`, `$lte`, `$in`, etc.
- **Extensible**: Incorporate OOP principles and design patterns.
- **Fluent API**: Chainable methods for intuitive query building.
- **Customizable**: Use the Factory to replace or extend the built-in classes.

## Installation

Install the package with:

```bash
npm install @basd/query
```

## Usage

First, import the `Query` library.

```js
import Query from '@basd/query'
```
or
```js
const Query = require('@basd/query')
```

### Create a new Query

```javascript
const query = new Query({
  // Optional configurations...
})
```

### Build a Query

Using the `QueryBuilder` class:

```javascript
const builder = new QueryBuilder()
builder.where('age').gte(18).and().lt(30)
const resultQuery = builder.build()
```

### Parsing a Query

Once you have a built query, use `QueryParser` to parse it:

```javascript
const parser = new QueryParser()
const parsed = parser.parse(resultQuery)
```

### Interpreting a Query

Execute a parsed query using the `QueryInterpreter`:

```javascript
const interpreter = new QueryInterpreter()
const result = interpreter.interpret(parsed, yourEntity)
```

### Using the Query Engine

To perform database operations like refine, filter, and find:

```javascript
const engine = new QueryEngine()
engine.find({ age: { $gte: 18, $lt: 30 } })
```

## Documentation

- [API Reference](/docs/api.md)

### Classes

- **Query**: Main class to manage query building, parsing, and execution.
- **QueryBuilder**: Helps construct query objects in a fluent manner.
- **QueryParser**: Transforms a query object into an abstract syntax tree.
- **QueryInterpreter**: Evaluates an entity against the parsed query.
- **QueryVisitor**: Visit AST nodes to evaluate them against an entity.
- **QueryFactory**: Factory for creating instances of other classes.
- **QueryEngine**: Provides higher-level database operations.

## Tests

In order to run the test suite, simply clone the repository and install its dependencies:

```bash
git clone https://gitlab.com/frenware/framework/plaindb/query.git
cd query
npm install
```

To run the tests:

```bash
npm test
```

## Contributing

Thank you! Please see our [contributing guidelines](/docs/contributing.md) for details.

## Donations

If you find this project useful and want to help support further development, please send us some coin. We greatly appreciate any and all contributions. Thank you!

**Bitcoin (BTC):**
```
1JUb1yNFH6wjGekRUW6Dfgyg4J4h6wKKdF
```

**Monero (XMR):**
```
46uV2fMZT3EWkBrGUgszJCcbqFqEvqrB4bZBJwsbx7yA8e2WBakXzJSUK8aqT4GoqERzbg4oKT2SiPeCgjzVH6VpSQ5y7KQ
```

## License

@basd/query is [MIT licensed](https://gitlab.com/frenware/framework/plaindb/query/-/blob/master/LICENSE).
