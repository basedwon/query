declare class QueryBuilder {
  conditions: any[];
  currentCondition: any;
  query: any;
  prop: string;
  isOrCondition: boolean;
  constructor(query?: any);
  setQuery(query?: any): QueryBuilder;
  where(prop: string): QueryBuilder;
  equals(value: any): QueryBuilder;
  gt(num: number): QueryBuilder;
  gte(num: number): QueryBuilder;
  lt(num: number): QueryBuilder;
  lte(num: number): QueryBuilder;
  in(arr: any[]): QueryBuilder;
  nin(arr: any[]): QueryBuilder;
  all(arr: any[]): QueryBuilder;
  or(): QueryBuilder;
  and(): QueryBuilder;
  addCondition(operator: string, value: any): QueryBuilder;
  handleOrCondition(condition: any): void;
  handleAndCondition(condition: any): void;
  convertCondition(condition: any): any;
  build(): any;
}

declare class QueryParser {
  fields: Set<string>;
  ast: any;
  parse(query: any): QueryParser;
  parseQuery(query: any): any;
  visit(key: string, condition: any): any;
}

declare class QueryVisitor {
  visit(node: any, entity: any): boolean;
  EQ(property: any, constraint: any): boolean;
  GT(property: any, constraint: any): boolean;
  GTE(property: any, constraint: any): boolean;
  LT(property: any, constraint: any): boolean;
  LTE(property: any, constraint: any): boolean;
}

declare class QueryInterpreter {
  visitor: QueryVisitor;
  constructor(visitor?: QueryVisitor, options?: any);
  interpret(ast: any, entity: any): boolean;
}

declare class QueryFactory {
  config: any;
  constructor(config?: any);
  createBuilder(): QueryBuilder;
  createParser(): QueryParser;
  createVisitor(): QueryVisitor;
  createInterpreter(visitor?: QueryVisitor): QueryInterpreter;
}

declare class Query {
  static Factory: typeof QueryFactory;
  static Builder: typeof QueryBuilder;
  static Parser: typeof QueryParser;
  static Visitor: typeof QueryVisitor;
  static Interpreter: typeof QueryInterpreter;
  factory: QueryFactory;
  builder: QueryBuilder;
  parser: QueryParser;
  interpreter: QueryInterpreter;
  constructor(config: QueryFactory | any);
  build(query?: any): any;
  parse(queryObject: any): any;
  evaluator(queryObject: any): (context: any) => boolean;
  evaluate(context: any, query?: any): boolean;
  static builder(query?: any, config?: any): QueryBuilder;
  static evaluator(query: any, config?: any): (context: any) => boolean;
  static evaluate(query: any, context: any, config?: any): boolean;
}

declare class QueryEngine {
  static Query: typeof Query;
  static Storage: typeof Storage;
  storage: any;
  config: any;
  constructor(config?: any, storage?: any);
  createQueryInstance(query?: any): Query;
  find(query?: any): any;
  getIterator(config: any): Promise<any>;
  refineResults(results: any, config: any): Promise<any>;
  executor(obj: any): Promise<any>;
}
