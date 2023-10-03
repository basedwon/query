## Classes

<dl>
<dt><a href="#QueryBuilder">QueryBuilder</a></dt>
<dd><p>Represents a builder for constructing queries.</p>
</dd>
<dt><a href="#QueryEngineVisitor">QueryEngineVisitor</a></dt>
<dd><p>Specialized visitor for refining query results.</p>
</dd>
<dt><a href="#QueryEngine">QueryEngine</a></dt>
<dd><p>Main engine to execute and handle query operations.</p>
</dd>
<dt><a href="#QueryFactory">QueryFactory</a></dt>
<dd><p>Factory class to create various query-related instances.</p>
</dd>
<dt><a href="#QueryInterpreter">QueryInterpreter</a></dt>
<dd><p>Interprets the parsed query against an entity.</p>
</dd>
<dt><a href="#QueryParser">QueryParser</a></dt>
<dd><p>Parses queries and generates abstract syntax trees.</p>
</dd>
<dt><a href="#QueryVisitor">QueryVisitor</a></dt>
<dd><p>Visits different nodes of the parsed query to evaluate them.</p>
</dd>
<dt><a href="#Query">Query</a></dt>
<dd><p>Represents a query instance, initialized with certain options.
The query is constructed using the builder, parser, visitor, and interpreter.</p>
</dd>
</dl>

<a name="QueryBuilder"></a>

## QueryBuilder
Represents a builder for constructing queries.

**Kind**: global class  

* [QueryBuilder](#QueryBuilder)
    * [new QueryBuilder(query)](#new_QueryBuilder_new)
    * [.setQuery([query])](#QueryBuilder+setQuery) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.where(prop)](#QueryBuilder+where) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.equals(value)](#QueryBuilder+equals) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.gt(num)](#QueryBuilder+gt) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.gte(num)](#QueryBuilder+gte) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.lt(num)](#QueryBuilder+lt) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.lte(num)](#QueryBuilder+lte) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.in(arr)](#QueryBuilder+in) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.nin(arr)](#QueryBuilder+nin) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.all(arr)](#QueryBuilder+all) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.or()](#QueryBuilder+or) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.and()](#QueryBuilder+and) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.addCondition(operator, value)](#QueryBuilder+addCondition) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.addTransform(operator, value)](#QueryBuilder+addTransform) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.limit(num)](#QueryBuilder+limit) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.skip(num)](#QueryBuilder+skip) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.sort(key)](#QueryBuilder+sort) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.select(...keys)](#QueryBuilder+select) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.build()](#QueryBuilder+build) ⇒ <code>Object</code>

<a name="new_QueryBuilder_new"></a>

### new QueryBuilder(query)
Creates a new QueryBuilder instance.


| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | The initial query to start building from. |

<a name="QueryBuilder+setQuery"></a>

### queryBuilder.setQuery([query]) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Sets the base query for the builder.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [query] | <code>Object</code> | <code>{}</code> | The query to set. |

<a name="QueryBuilder+where"></a>

### queryBuilder.where(prop) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Specifies a property to begin constructing conditions for.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> | The property name. |

<a name="QueryBuilder+equals"></a>

### queryBuilder.equals(value) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds an equality condition.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to compare against. |

<a name="QueryBuilder+gt"></a>

### queryBuilder.gt(num) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds a greater than condition.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | The threshold value. |

<a name="QueryBuilder+gte"></a>

### queryBuilder.gte(num) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds a greater than or equal condition.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | The threshold value. |

<a name="QueryBuilder+lt"></a>

### queryBuilder.lt(num) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds a less than condition.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | The threshold value. |

<a name="QueryBuilder+lte"></a>

### queryBuilder.lte(num) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds a less than or equal condition.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | The threshold value. |

<a name="QueryBuilder+in"></a>

### queryBuilder.in(arr) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds an "in" condition.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;\*&gt;</code> | The array of possible values. |

<a name="QueryBuilder+nin"></a>

### queryBuilder.nin(arr) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds a "not in" condition.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;\*&gt;</code> | The array of values to be excluded. |

<a name="QueryBuilder+all"></a>

### queryBuilder.all(arr) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds an "all" condition.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;\*&gt;</code> | The array of all values that should be matched. |

<a name="QueryBuilder+or"></a>

### queryBuilder.or() ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Sets the current grouping condition to OR.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  
<a name="QueryBuilder+and"></a>

### queryBuilder.and() ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Sets the current grouping condition to AND.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  
<a name="QueryBuilder+addCondition"></a>

### queryBuilder.addCondition(operator, value) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds a new condition to the query.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| operator | <code>string</code> | The condition operator. |
| value | <code>\*</code> | The value for the condition. |

<a name="QueryBuilder+addTransform"></a>

### queryBuilder.addTransform(operator, value) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds a transformation condition.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| operator | <code>string</code> | The operator string. |
| value | <code>\*</code> | The value for the transformation. |

<a name="QueryBuilder+limit"></a>

### queryBuilder.limit(num) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds a limit transformation.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | The limit value. |

<a name="QueryBuilder+skip"></a>

### queryBuilder.skip(num) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds a skip transformation.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | The skip value. |

<a name="QueryBuilder+sort"></a>

### queryBuilder.sort(key) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds a sort transformation.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key by which to sort. |

<a name="QueryBuilder+select"></a>

### queryBuilder.select(...keys) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Adds a select transformation.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - The current instance for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| ...keys | <code>string</code> | The keys to select. |

<a name="QueryBuilder+build"></a>

### queryBuilder.build() ⇒ <code>Object</code>
Builds the current state of the query into its final form.

**Kind**: instance method of [<code>QueryBuilder</code>](#QueryBuilder)  
**Returns**: <code>Object</code> - The final query object.  
<a name="QueryEngineVisitor"></a>

## QueryEngineVisitor
Specialized visitor for refining query results.

**Kind**: global class  

* [QueryEngineVisitor](#QueryEngineVisitor)
    * [.refine(results, config)](#QueryEngineVisitor+refine) ⇒ <code>Array</code>
    * [.sort(results, value)](#QueryEngineVisitor+sort) ⇒ <code>Array</code>
    * [.select(results, value)](#QueryEngineVisitor+select) ⇒ <code>Array</code>
    * [.skip(results, value)](#QueryEngineVisitor+skip) ⇒ <code>Array</code>

<a name="QueryEngineVisitor+refine"></a>

### queryEngineVisitor.refine(results, config) ⇒ <code>Array</code>
Refines the results based on the provided configuration.
Applies transformations to the results, like sorting or selecting specific fields.

**Kind**: instance method of [<code>QueryEngineVisitor</code>](#QueryEngineVisitor)  
**Returns**: <code>Array</code> - - Refined results.  
**Throws**:

- Will throw an error if an unsupported ORM query engine type is encountered.


| Param | Type | Description |
| --- | --- | --- |
| results | <code>Array</code> | Array of results to be refined. |
| config | <code>Object</code> | Configuration for refining the results. |

<a name="QueryEngineVisitor+sort"></a>

### queryEngineVisitor.sort(results, value) ⇒ <code>Array</code>
Sorts the given results array based on the provided value.
Can handle ascending and descending orders.

**Kind**: instance method of [<code>QueryEngineVisitor</code>](#QueryEngineVisitor)  
**Returns**: <code>Array</code> - - Sorted results.  

| Param | Type | Description |
| --- | --- | --- |
| results | <code>Array</code> | Array of results to be sorted. |
| value | <code>string</code> | Property name on which to sort the results. |

<a name="QueryEngineVisitor+select"></a>

### queryEngineVisitor.select(results, value) ⇒ <code>Array</code>
Selects specific keys from each result in the results array.

**Kind**: instance method of [<code>QueryEngineVisitor</code>](#QueryEngineVisitor)  
**Returns**: <code>Array</code> - - Results with only the selected keys.  

| Param | Type | Description |
| --- | --- | --- |
| results | <code>Array</code> | Array of results from which to select specific fields. |
| value | <code>Array.&lt;string&gt;</code> | Array of keys to be selected. |

<a name="QueryEngineVisitor+skip"></a>

### queryEngineVisitor.skip(results, value) ⇒ <code>Array</code>
Skips a certain number of results from the beginning of the results array.

**Kind**: instance method of [<code>QueryEngineVisitor</code>](#QueryEngineVisitor)  
**Returns**: <code>Array</code> - - Results after skipping the specified number.  

| Param | Type | Description |
| --- | --- | --- |
| results | <code>Array</code> | Array of results to be processed. |
| value | <code>number</code> | Number of results to skip from the beginning. |

<a name="QueryEngine"></a>

## QueryEngine
Main engine to execute and handle query operations.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [opts.Query] | <code>function</code> | Custom Query constructor. |
| [opts.getIterator] | <code>function</code> | Function to provide an iterator. |
| [opts.refine] | <code>function</code> | Custom refine function. |
| [opts.filter] | <code>function</code> | Custom filter function. |


* [QueryEngine](#QueryEngine)
    * [new QueryEngine(opts)](#new_QueryEngine_new)
    * [.refine(results, config)](#QueryEngine+refine) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.filter(entity, config)](#QueryEngine+filter)
    * [.find(queryObject, iterator)](#QueryEngine+find) ⇒ <code>function</code> \| <code>Promise.&lt;Array&gt;</code>
    * [.execute(query, iterator)](#QueryEngine+execute) ⇒ <code>Promise.&lt;Array&gt;</code>

<a name="new_QueryEngine_new"></a>

### new QueryEngine(opts)
Constructs a new QueryEngine instance.


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> \| <code>function</code> | Configuration options or a getIterator function. |

<a name="QueryEngine+refine"></a>

### queryEngine.refine(results, config) ⇒ <code>Promise.&lt;Array&gt;</code>
Refines the results array using the provided configuration.
Uses the `QueryEngineVisitor` to apply transformations like sort, select, etc.

**Kind**: instance method of [<code>QueryEngine</code>](#QueryEngine)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - - Refined results.  

| Param | Type | Description |
| --- | --- | --- |
| results | <code>Array</code> | Array of results to be refined. |
| config | <code>Object</code> | Configuration for refining the results. |

<a name="QueryEngine+filter"></a>

### queryEngine.filter(entity, config)
Filters an entity based on the provided configuration.
This is a placeholder function and can be overridden.

**Kind**: instance method of [<code>QueryEngine</code>](#QueryEngine)  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | The entity to filter. |
| config | <code>Object</code> | Configuration for filtering. |

<a name="QueryEngine+find"></a>

### queryEngine.find(queryObject, iterator) ⇒ <code>function</code> \| <code>Promise.&lt;Array&gt;</code>
Finds entities matching a given query object.
Constructs and returns a query builder if no query object is provided.

**Kind**: instance method of [<code>QueryEngine</code>](#QueryEngine)  
**Returns**: <code>function</code> \| <code>Promise.&lt;Array&gt;</code> - - Either the query builder or the result of the search.  

| Param | Type | Description |
| --- | --- | --- |
| queryObject | <code>Object</code> | Query object specifying search criteria. |
| iterator | <code>function</code> | Custom iterator function. |

<a name="QueryEngine+execute"></a>

### queryEngine.execute(query, iterator) ⇒ <code>Promise.&lt;Array&gt;</code>
Executes the query and fetches results matching the criteria.
Iterates through entities, filters them, and collects matching ones.

**Kind**: instance method of [<code>QueryEngine</code>](#QueryEngine)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - - Array of entities that match the query criteria.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | The query instance. |
| iterator | <code>function</code> | Iterator function to loop through entities. |

<a name="QueryFactory"></a>

## QueryFactory
Factory class to create various query-related instances.

**Kind**: global class  

* [QueryFactory](#QueryFactory)
    * [new QueryFactory(registry)](#new_QueryFactory_new)
    * [.createBuilder(...args)](#QueryFactory+createBuilder) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
    * [.createParser(...args)](#QueryFactory+createParser) ⇒ [<code>QueryParser</code>](#QueryParser)
    * [.createVisitor(...args)](#QueryFactory+createVisitor) ⇒ [<code>QueryVisitor</code>](#QueryVisitor)
    * [.createInterpreter(visitor, ...args)](#QueryFactory+createInterpreter) ⇒ [<code>QueryInterpreter</code>](#QueryInterpreter)

<a name="new_QueryFactory_new"></a>

### new QueryFactory(registry)
Constructs a new QueryFactory.


| Param | Type | Description |
| --- | --- | --- |
| registry | <code>Object</code> | An object that acts as the registry for various instances. |

<a name="QueryFactory+createBuilder"></a>

### queryFactory.createBuilder(...args) ⇒ [<code>QueryBuilder</code>](#QueryBuilder)
Creates a new instance of a QueryBuilder.

**Kind**: instance method of [<code>QueryFactory</code>](#QueryFactory)  
**Returns**: [<code>QueryBuilder</code>](#QueryBuilder) - - A new QueryBuilder instance.  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | Arguments to pass to the QueryBuilder constructor. |

<a name="QueryFactory+createParser"></a>

### queryFactory.createParser(...args) ⇒ [<code>QueryParser</code>](#QueryParser)
Creates a new instance of a QueryParser.

**Kind**: instance method of [<code>QueryFactory</code>](#QueryFactory)  
**Returns**: [<code>QueryParser</code>](#QueryParser) - - A new QueryParser instance.  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | Arguments to pass to the QueryParser constructor. |

<a name="QueryFactory+createVisitor"></a>

### queryFactory.createVisitor(...args) ⇒ [<code>QueryVisitor</code>](#QueryVisitor)
Creates a new instance of a QueryVisitor.

**Kind**: instance method of [<code>QueryFactory</code>](#QueryFactory)  
**Returns**: [<code>QueryVisitor</code>](#QueryVisitor) - - A new QueryVisitor instance.  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | Arguments to pass to the QueryVisitor constructor. |

<a name="QueryFactory+createInterpreter"></a>

### queryFactory.createInterpreter(visitor, ...args) ⇒ [<code>QueryInterpreter</code>](#QueryInterpreter)
Creates a new instance of a QueryInterpreter.

**Kind**: instance method of [<code>QueryFactory</code>](#QueryFactory)  
**Returns**: [<code>QueryInterpreter</code>](#QueryInterpreter) - - A new QueryInterpreter instance.  
**Throws**:

- <code>Error</code> Throws an error if the provided visitor is not a valid instance.


| Param | Type | Description |
| --- | --- | --- |
| visitor | [<code>QueryVisitor</code>](#QueryVisitor) | A visitor instance. |
| ...args | <code>\*</code> | Additional arguments to pass to the QueryInterpreter constructor. |

<a name="QueryInterpreter"></a>

## QueryInterpreter
Interprets the parsed query against an entity.

**Kind**: global class  

* [QueryInterpreter](#QueryInterpreter)
    * [new QueryInterpreter(visitor, [options])](#new_QueryInterpreter_new)
    * [.interpret(ast, entity, config)](#QueryInterpreter+interpret) ⇒ <code>boolean</code>

<a name="new_QueryInterpreter_new"></a>

### new QueryInterpreter(visitor, [options])
Creates an instance of the QueryInterpreter.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| visitor | [<code>QueryVisitor</code>](#QueryVisitor) |  | An instance of a QueryVisitor. |
| [options] | <code>Object</code> | <code>{}</code> | Optional configuration for the interpreter. |

<a name="QueryInterpreter+interpret"></a>

### queryInterpreter.interpret(ast, entity, config) ⇒ <code>boolean</code>
Interprets an AST (Abstract Syntax Tree) against an entity.

**Kind**: instance method of [<code>QueryInterpreter</code>](#QueryInterpreter)  
**Returns**: <code>boolean</code> - - True if the entity matches the criteria, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| ast | <code>Object</code> | The AST representation of the query. |
| entity | <code>Object</code> | The entity to be interpreted against the AST. |
| config | <code>Object</code> | Configuration options for the interpreter. |

<a name="QueryParser"></a>

## QueryParser
Parses queries and generates abstract syntax trees.

**Kind**: global class  

* [QueryParser](#QueryParser)
    * [new QueryParser()](#new_QueryParser_new)
    * [.parse(query)](#QueryParser+parse) ⇒ <code>Object</code>
    * [.parseQuery(query)](#QueryParser+parseQuery) ⇒ <code>Object</code>
    * [.visit(key, condition)](#QueryParser+visit) ⇒ <code>Object</code>

<a name="new_QueryParser_new"></a>

### new QueryParser()
Constructs a new QueryParser.

<a name="QueryParser+parse"></a>

### queryParser.parse(query) ⇒ <code>Object</code>
Parses a query and generates an abstract syntax tree.

**Kind**: instance method of [<code>QueryParser</code>](#QueryParser)  
**Returns**: <code>Object</code> - - The parsed representation of the query.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | The query object to parse. |

<a name="QueryParser+parseQuery"></a>

### queryParser.parseQuery(query) ⇒ <code>Object</code>
Generates the abstract syntax tree for a query.

**Kind**: instance method of [<code>QueryParser</code>](#QueryParser)  
**Returns**: <code>Object</code> - - The abstract syntax tree representation of the query.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | The query to parse. |

<a name="QueryParser+visit"></a>

### queryParser.visit(key, condition) ⇒ <code>Object</code>
Visits a key-condition pair and generates a node for the abstract syntax tree.

**Kind**: instance method of [<code>QueryParser</code>](#QueryParser)  
**Returns**: <code>Object</code> - - A node representing the key and condition for the abstract syntax tree.  
**Throws**:

- <code>Error</code> Throws an error if an unsupported condition operator is encountered.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The property key. |
| condition | <code>Object</code> | The condition associated with the key. |

<a name="QueryVisitor"></a>

## QueryVisitor
Visits different nodes of the parsed query to evaluate them.

**Kind**: global class  

* [QueryVisitor](#QueryVisitor)
    * [.visit(node, entity, config)](#QueryVisitor+visit) ⇒ <code>boolean</code>
    * [.EQ(property, constraint)](#QueryVisitor+EQ) ⇒ <code>boolean</code>
    * [.GT(property, constraint)](#QueryVisitor+GT) ⇒ <code>boolean</code>
    * [.GTE(property, constraint)](#QueryVisitor+GTE) ⇒ <code>boolean</code>
    * [.LT(property, constraint)](#QueryVisitor+LT) ⇒ <code>boolean</code>
    * [.LTE(property, constraint)](#QueryVisitor+LTE) ⇒ <code>boolean</code>

<a name="QueryVisitor+visit"></a>

### queryVisitor.visit(node, entity, config) ⇒ <code>boolean</code>
Visits a node in the AST and evaluates it against an entity.

**Kind**: instance method of [<code>QueryVisitor</code>](#QueryVisitor)  
**Returns**: <code>boolean</code> - - True if the node and entity match the criteria, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Object</code> | The AST node. |
| entity | <code>Object</code> | The entity to evaluate. |
| config | <code>Object</code> | Configuration options for the visitor. |

<a name="QueryVisitor+EQ"></a>

### queryVisitor.EQ(property, constraint) ⇒ <code>boolean</code>
Evaluates the equality condition between a property and a constraint.

**Kind**: instance method of [<code>QueryVisitor</code>](#QueryVisitor)  
**Returns**: <code>boolean</code> - - True if the property matches the constraint, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>\*</code> | The property from the entity. |
| constraint | <code>\*</code> | The constraint to evaluate against. |

<a name="QueryVisitor+GT"></a>

### queryVisitor.GT(property, constraint) ⇒ <code>boolean</code>
Evaluates if the property is greater than the constraint.

**Kind**: instance method of [<code>QueryVisitor</code>](#QueryVisitor)  
**Returns**: <code>boolean</code> - - True if the property is greater than the constraint, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>number</code> | The numeric property from the entity. |
| constraint | <code>number</code> | The number to evaluate against. |

<a name="QueryVisitor+GTE"></a>

### queryVisitor.GTE(property, constraint) ⇒ <code>boolean</code>
Evaluates if the property is greater than or equal to the constraint.

**Kind**: instance method of [<code>QueryVisitor</code>](#QueryVisitor)  
**Returns**: <code>boolean</code> - - True if the property is greater than or equal to the constraint, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>number</code> | The numeric property from the entity. |
| constraint | <code>number</code> | The number to evaluate against. |

<a name="QueryVisitor+LT"></a>

### queryVisitor.LT(property, constraint) ⇒ <code>boolean</code>
Evaluates if the property is less than the constraint.

**Kind**: instance method of [<code>QueryVisitor</code>](#QueryVisitor)  
**Returns**: <code>boolean</code> - - True if the property is less than the constraint, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>number</code> | The numeric property from the entity. |
| constraint | <code>number</code> | The number to evaluate against. |

<a name="QueryVisitor+LTE"></a>

### queryVisitor.LTE(property, constraint) ⇒ <code>boolean</code>
Evaluates if the property is less than or equal to the constraint.

**Kind**: instance method of [<code>QueryVisitor</code>](#QueryVisitor)  
**Returns**: <code>boolean</code> - - True if the property is less than or equal to the constraint, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>number</code> | The numeric property from the entity. |
| constraint | <code>number</code> | The number to evaluate against. |

<a name="Query"></a>

## Query
Represents a query instance, initialized with certain options.
The query is constructed using the builder, parser, visitor, and interpreter.

**Kind**: global class  

* [Query](#Query)
    * [new Query([opts])](#new_Query_new)
    * [.build()](#Query+build) ⇒ <code>Object</code>
    * [.parse()](#Query+parse) ⇒ <code>Object</code>
    * [.evaluator()](#Query+evaluator) ⇒ <code>function</code>

<a name="new_Query_new"></a>

### new Query([opts])
Creates a new Query instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [opts] | <code>Object</code> | <code>{}</code> | The options to initialize the query with. |

<a name="Query+build"></a>

### query.build() ⇒ <code>Object</code>
Builds the query using the builder.

**Kind**: instance method of [<code>Query</code>](#Query)  
**Returns**: <code>Object</code> - The constructed query.  
<a name="Query+parse"></a>

### query.parse() ⇒ <code>Object</code>
Parses the built query to generate an abstract syntax tree (AST).

**Kind**: instance method of [<code>Query</code>](#Query)  
**Returns**: <code>Object</code> - The parsed query AST.  
<a name="Query+evaluator"></a>

### query.evaluator() ⇒ <code>function</code>
Creates an evaluator function to evaluate the query against an entity.

**Kind**: instance method of [<code>Query</code>](#Query)  
**Returns**: <code>function</code> - A function that takes an entity and returns a 
boolean indicating whether the entity matches the query.  
