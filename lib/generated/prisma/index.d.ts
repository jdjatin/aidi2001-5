
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Resume
 * 
 */
export type Resume = $Result.DefaultSelection<Prisma.$ResumePayload>
/**
 * Model TailoredResume
 * 
 */
export type TailoredResume = $Result.DefaultSelection<Prisma.$TailoredResumePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ResumeParseStatus: {
  UPLOADED: 'UPLOADED',
  PARSING: 'PARSING',
  PARSED: 'PARSED',
  FAILED: 'FAILED'
};

export type ResumeParseStatus = (typeof ResumeParseStatus)[keyof typeof ResumeParseStatus]

}

export type ResumeParseStatus = $Enums.ResumeParseStatus

export const ResumeParseStatus: typeof $Enums.ResumeParseStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Resumes
 * const resumes = await prisma.resume.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Resumes
   * const resumes = await prisma.resume.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tailoredResume`: Exposes CRUD operations for the **TailoredResume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TailoredResumes
    * const tailoredResumes = await prisma.tailoredResume.findMany()
    * ```
    */
  get tailoredResume(): Prisma.TailoredResumeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Resume: 'Resume',
    TailoredResume: 'TailoredResume'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "resume" | "tailoredResume"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Resume: {
        payload: Prisma.$ResumePayload<ExtArgs>
        fields: Prisma.ResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findFirst: {
            args: Prisma.ResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findMany: {
            args: Prisma.ResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          create: {
            args: Prisma.ResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          createMany: {
            args: Prisma.ResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          delete: {
            args: Prisma.ResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          update: {
            args: Prisma.ResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          deleteMany: {
            args: Prisma.ResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResumeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          upsert: {
            args: Prisma.ResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          aggregate: {
            args: Prisma.ResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResume>
          }
          groupBy: {
            args: Prisma.ResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeCountAggregateOutputType> | number
          }
        }
      }
      TailoredResume: {
        payload: Prisma.$TailoredResumePayload<ExtArgs>
        fields: Prisma.TailoredResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TailoredResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TailoredResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TailoredResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TailoredResumePayload>
          }
          findFirst: {
            args: Prisma.TailoredResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TailoredResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TailoredResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TailoredResumePayload>
          }
          findMany: {
            args: Prisma.TailoredResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TailoredResumePayload>[]
          }
          create: {
            args: Prisma.TailoredResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TailoredResumePayload>
          }
          createMany: {
            args: Prisma.TailoredResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TailoredResumeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TailoredResumePayload>[]
          }
          delete: {
            args: Prisma.TailoredResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TailoredResumePayload>
          }
          update: {
            args: Prisma.TailoredResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TailoredResumePayload>
          }
          deleteMany: {
            args: Prisma.TailoredResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TailoredResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TailoredResumeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TailoredResumePayload>[]
          }
          upsert: {
            args: Prisma.TailoredResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TailoredResumePayload>
          }
          aggregate: {
            args: Prisma.TailoredResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTailoredResume>
          }
          groupBy: {
            args: Prisma.TailoredResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TailoredResumeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TailoredResumeCountArgs<ExtArgs>
            result: $Utils.Optional<TailoredResumeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    resume?: ResumeOmit
    tailoredResume?: TailoredResumeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ResumeCountOutputType
   */

  export type ResumeCountOutputType = {
    tailoredResumes: number
  }

  export type ResumeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tailoredResumes?: boolean | ResumeCountOutputTypeCountTailoredResumesArgs
  }

  // Custom InputTypes
  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeCountOutputType
     */
    select?: ResumeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeCountTailoredResumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TailoredResumeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Resume
   */

  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    sourceType: string | null
    originalFilename: string | null
    filePath: string | null
    parseStatus: $Enums.ResumeParseStatus | null
    sourceText: string | null
    extractedText: string | null
    parseError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    sourceType: string | null
    originalFilename: string | null
    filePath: string | null
    parseStatus: $Enums.ResumeParseStatus | null
    sourceText: string | null
    extractedText: string | null
    parseError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    sourceType: number
    originalFilename: number
    filePath: number
    parseStatus: number
    sourceText: number
    extractedText: number
    parseError: number
    structuredData: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ResumeMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    sourceType?: true
    originalFilename?: true
    filePath?: true
    parseStatus?: true
    sourceText?: true
    extractedText?: true
    parseError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    sourceType?: true
    originalFilename?: true
    filePath?: true
    parseStatus?: true
    sourceText?: true
    extractedText?: true
    parseError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    sourceType?: true
    originalFilename?: true
    filePath?: true
    parseStatus?: true
    sourceText?: true
    extractedText?: true
    parseError?: true
    structuredData?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resume to aggregate.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithAggregationInput | ResumeOrderByWithAggregationInput[]
    by: ResumeScalarFieldEnum[] | ResumeScalarFieldEnum
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }

  export type ResumeGroupByOutputType = {
    id: string
    title: string
    slug: string
    sourceType: string
    originalFilename: string | null
    filePath: string | null
    parseStatus: $Enums.ResumeParseStatus
    sourceText: string | null
    extractedText: string | null
    parseError: string | null
    structuredData: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: ResumeCountAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    sourceType?: boolean
    originalFilename?: boolean
    filePath?: boolean
    parseStatus?: boolean
    sourceText?: boolean
    extractedText?: boolean
    parseError?: boolean
    structuredData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tailoredResumes?: boolean | Resume$tailoredResumesArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    sourceType?: boolean
    originalFilename?: boolean
    filePath?: boolean
    parseStatus?: boolean
    sourceText?: boolean
    extractedText?: boolean
    parseError?: boolean
    structuredData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    sourceType?: boolean
    originalFilename?: boolean
    filePath?: boolean
    parseStatus?: boolean
    sourceText?: boolean
    extractedText?: boolean
    parseError?: boolean
    structuredData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["resume"]>

  export type ResumeSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    sourceType?: boolean
    originalFilename?: boolean
    filePath?: boolean
    parseStatus?: boolean
    sourceText?: boolean
    extractedText?: boolean
    parseError?: boolean
    structuredData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ResumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "sourceType" | "originalFilename" | "filePath" | "parseStatus" | "sourceText" | "extractedText" | "parseError" | "structuredData" | "createdAt" | "updatedAt", ExtArgs["result"]["resume"]>
  export type ResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tailoredResumes?: boolean | Resume$tailoredResumesArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ResumeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resume"
    objects: {
      tailoredResumes: Prisma.$TailoredResumePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      sourceType: string
      originalFilename: string | null
      filePath: string | null
      parseStatus: $Enums.ResumeParseStatus
      sourceText: string | null
      extractedText: string | null
      parseError: string | null
      structuredData: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["resume"]>
    composites: {}
  }

  type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = $Result.GetResult<Prisma.$ResumePayload, S>

  type ResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeCountAggregateInputType | true
    }

  export interface ResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resume'], meta: { name: 'Resume' } }
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeFindUniqueArgs>(args: SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeFindFirstArgs>(args?: SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeFindManyArgs>(args?: SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
     */
    create<T extends ResumeCreateArgs>(args: SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resumes.
     * @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeCreateManyArgs>(args?: SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resumes and returns the data saved in the database.
     * @param {ResumeCreateManyAndReturnArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
     */
    delete<T extends ResumeDeleteArgs>(args: SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeUpdateArgs>(args: SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDeleteManyArgs>(args?: SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeUpdateManyArgs>(args: SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes and returns the data updated in the database.
     * @param {ResumeUpdateManyAndReturnArgs} args - Arguments to update many Resumes.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resumes and only return the `id`
     * const resumeWithIdOnly = await prisma.resume.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResumeUpdateManyAndReturnArgs>(args: SelectSubset<T, ResumeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
     */
    upsert<T extends ResumeUpsertArgs>(args: SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resume model
   */
  readonly fields: ResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tailoredResumes<T extends Resume$tailoredResumesArgs<ExtArgs> = {}>(args?: Subset<T, Resume$tailoredResumesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resume model
   */
  interface ResumeFieldRefs {
    readonly id: FieldRef<"Resume", 'String'>
    readonly title: FieldRef<"Resume", 'String'>
    readonly slug: FieldRef<"Resume", 'String'>
    readonly sourceType: FieldRef<"Resume", 'String'>
    readonly originalFilename: FieldRef<"Resume", 'String'>
    readonly filePath: FieldRef<"Resume", 'String'>
    readonly parseStatus: FieldRef<"Resume", 'ResumeParseStatus'>
    readonly sourceText: FieldRef<"Resume", 'String'>
    readonly extractedText: FieldRef<"Resume", 'String'>
    readonly parseError: FieldRef<"Resume", 'String'>
    readonly structuredData: FieldRef<"Resume", 'Json'>
    readonly createdAt: FieldRef<"Resume", 'DateTime'>
    readonly updatedAt: FieldRef<"Resume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Resume findUnique
   */
  export type ResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findFirst
   */
  export type ResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resumes to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume create
   */
  export type ResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a Resume.
     */
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }

  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resume createManyAndReturn
   */
  export type ResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resume update
   */
  export type ResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a Resume.
     */
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
  }

  /**
   * Resume updateManyAndReturn
   */
  export type ResumeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
  }

  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the Resume to update in case it exists.
     */
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     */
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }

  /**
   * Resume delete
   */
  export type ResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter which Resume to delete.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resumes to delete
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to delete.
     */
    limit?: number
  }

  /**
   * Resume.tailoredResumes
   */
  export type Resume$tailoredResumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeInclude<ExtArgs> | null
    where?: TailoredResumeWhereInput
    orderBy?: TailoredResumeOrderByWithRelationInput | TailoredResumeOrderByWithRelationInput[]
    cursor?: TailoredResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TailoredResumeScalarFieldEnum | TailoredResumeScalarFieldEnum[]
  }

  /**
   * Resume without action
   */
  export type ResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
  }


  /**
   * Model TailoredResume
   */

  export type AggregateTailoredResume = {
    _count: TailoredResumeCountAggregateOutputType | null
    _min: TailoredResumeMinAggregateOutputType | null
    _max: TailoredResumeMaxAggregateOutputType | null
  }

  export type TailoredResumeMinAggregateOutputType = {
    id: string | null
    resumeId: string | null
    jobDescription: string | null
    tailoredText: string | null
    provider: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TailoredResumeMaxAggregateOutputType = {
    id: string | null
    resumeId: string | null
    jobDescription: string | null
    tailoredText: string | null
    provider: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TailoredResumeCountAggregateOutputType = {
    id: number
    resumeId: number
    jobDescription: number
    tailoredText: number
    summaryOfChanges: number
    highlightedKeywords: number
    provider: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TailoredResumeMinAggregateInputType = {
    id?: true
    resumeId?: true
    jobDescription?: true
    tailoredText?: true
    provider?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TailoredResumeMaxAggregateInputType = {
    id?: true
    resumeId?: true
    jobDescription?: true
    tailoredText?: true
    provider?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TailoredResumeCountAggregateInputType = {
    id?: true
    resumeId?: true
    jobDescription?: true
    tailoredText?: true
    summaryOfChanges?: true
    highlightedKeywords?: true
    provider?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TailoredResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TailoredResume to aggregate.
     */
    where?: TailoredResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TailoredResumes to fetch.
     */
    orderBy?: TailoredResumeOrderByWithRelationInput | TailoredResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TailoredResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TailoredResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TailoredResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TailoredResumes
    **/
    _count?: true | TailoredResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TailoredResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TailoredResumeMaxAggregateInputType
  }

  export type GetTailoredResumeAggregateType<T extends TailoredResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateTailoredResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTailoredResume[P]>
      : GetScalarType<T[P], AggregateTailoredResume[P]>
  }




  export type TailoredResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TailoredResumeWhereInput
    orderBy?: TailoredResumeOrderByWithAggregationInput | TailoredResumeOrderByWithAggregationInput[]
    by: TailoredResumeScalarFieldEnum[] | TailoredResumeScalarFieldEnum
    having?: TailoredResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TailoredResumeCountAggregateInputType | true
    _min?: TailoredResumeMinAggregateInputType
    _max?: TailoredResumeMaxAggregateInputType
  }

  export type TailoredResumeGroupByOutputType = {
    id: string
    resumeId: string
    jobDescription: string
    tailoredText: string
    summaryOfChanges: JsonValue
    highlightedKeywords: JsonValue
    provider: string
    createdAt: Date
    updatedAt: Date
    _count: TailoredResumeCountAggregateOutputType | null
    _min: TailoredResumeMinAggregateOutputType | null
    _max: TailoredResumeMaxAggregateOutputType | null
  }

  type GetTailoredResumeGroupByPayload<T extends TailoredResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TailoredResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TailoredResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TailoredResumeGroupByOutputType[P]>
            : GetScalarType<T[P], TailoredResumeGroupByOutputType[P]>
        }
      >
    >


  export type TailoredResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resumeId?: boolean
    jobDescription?: boolean
    tailoredText?: boolean
    summaryOfChanges?: boolean
    highlightedKeywords?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tailoredResume"]>

  export type TailoredResumeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resumeId?: boolean
    jobDescription?: boolean
    tailoredText?: boolean
    summaryOfChanges?: boolean
    highlightedKeywords?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tailoredResume"]>

  export type TailoredResumeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resumeId?: boolean
    jobDescription?: boolean
    tailoredText?: boolean
    summaryOfChanges?: boolean
    highlightedKeywords?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tailoredResume"]>

  export type TailoredResumeSelectScalar = {
    id?: boolean
    resumeId?: boolean
    jobDescription?: boolean
    tailoredText?: boolean
    summaryOfChanges?: boolean
    highlightedKeywords?: boolean
    provider?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TailoredResumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "resumeId" | "jobDescription" | "tailoredText" | "summaryOfChanges" | "highlightedKeywords" | "provider" | "createdAt" | "updatedAt", ExtArgs["result"]["tailoredResume"]>
  export type TailoredResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }
  export type TailoredResumeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }
  export type TailoredResumeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resume?: boolean | ResumeDefaultArgs<ExtArgs>
  }

  export type $TailoredResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TailoredResume"
    objects: {
      resume: Prisma.$ResumePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      resumeId: string
      jobDescription: string
      tailoredText: string
      summaryOfChanges: Prisma.JsonValue
      highlightedKeywords: Prisma.JsonValue
      provider: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tailoredResume"]>
    composites: {}
  }

  type TailoredResumeGetPayload<S extends boolean | null | undefined | TailoredResumeDefaultArgs> = $Result.GetResult<Prisma.$TailoredResumePayload, S>

  type TailoredResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TailoredResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TailoredResumeCountAggregateInputType | true
    }

  export interface TailoredResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TailoredResume'], meta: { name: 'TailoredResume' } }
    /**
     * Find zero or one TailoredResume that matches the filter.
     * @param {TailoredResumeFindUniqueArgs} args - Arguments to find a TailoredResume
     * @example
     * // Get one TailoredResume
     * const tailoredResume = await prisma.tailoredResume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TailoredResumeFindUniqueArgs>(args: SelectSubset<T, TailoredResumeFindUniqueArgs<ExtArgs>>): Prisma__TailoredResumeClient<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TailoredResume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TailoredResumeFindUniqueOrThrowArgs} args - Arguments to find a TailoredResume
     * @example
     * // Get one TailoredResume
     * const tailoredResume = await prisma.tailoredResume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TailoredResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, TailoredResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TailoredResumeClient<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TailoredResume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TailoredResumeFindFirstArgs} args - Arguments to find a TailoredResume
     * @example
     * // Get one TailoredResume
     * const tailoredResume = await prisma.tailoredResume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TailoredResumeFindFirstArgs>(args?: SelectSubset<T, TailoredResumeFindFirstArgs<ExtArgs>>): Prisma__TailoredResumeClient<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TailoredResume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TailoredResumeFindFirstOrThrowArgs} args - Arguments to find a TailoredResume
     * @example
     * // Get one TailoredResume
     * const tailoredResume = await prisma.tailoredResume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TailoredResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, TailoredResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TailoredResumeClient<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TailoredResumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TailoredResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TailoredResumes
     * const tailoredResumes = await prisma.tailoredResume.findMany()
     * 
     * // Get first 10 TailoredResumes
     * const tailoredResumes = await prisma.tailoredResume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tailoredResumeWithIdOnly = await prisma.tailoredResume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TailoredResumeFindManyArgs>(args?: SelectSubset<T, TailoredResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TailoredResume.
     * @param {TailoredResumeCreateArgs} args - Arguments to create a TailoredResume.
     * @example
     * // Create one TailoredResume
     * const TailoredResume = await prisma.tailoredResume.create({
     *   data: {
     *     // ... data to create a TailoredResume
     *   }
     * })
     * 
     */
    create<T extends TailoredResumeCreateArgs>(args: SelectSubset<T, TailoredResumeCreateArgs<ExtArgs>>): Prisma__TailoredResumeClient<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TailoredResumes.
     * @param {TailoredResumeCreateManyArgs} args - Arguments to create many TailoredResumes.
     * @example
     * // Create many TailoredResumes
     * const tailoredResume = await prisma.tailoredResume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TailoredResumeCreateManyArgs>(args?: SelectSubset<T, TailoredResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TailoredResumes and returns the data saved in the database.
     * @param {TailoredResumeCreateManyAndReturnArgs} args - Arguments to create many TailoredResumes.
     * @example
     * // Create many TailoredResumes
     * const tailoredResume = await prisma.tailoredResume.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TailoredResumes and only return the `id`
     * const tailoredResumeWithIdOnly = await prisma.tailoredResume.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TailoredResumeCreateManyAndReturnArgs>(args?: SelectSubset<T, TailoredResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TailoredResume.
     * @param {TailoredResumeDeleteArgs} args - Arguments to delete one TailoredResume.
     * @example
     * // Delete one TailoredResume
     * const TailoredResume = await prisma.tailoredResume.delete({
     *   where: {
     *     // ... filter to delete one TailoredResume
     *   }
     * })
     * 
     */
    delete<T extends TailoredResumeDeleteArgs>(args: SelectSubset<T, TailoredResumeDeleteArgs<ExtArgs>>): Prisma__TailoredResumeClient<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TailoredResume.
     * @param {TailoredResumeUpdateArgs} args - Arguments to update one TailoredResume.
     * @example
     * // Update one TailoredResume
     * const tailoredResume = await prisma.tailoredResume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TailoredResumeUpdateArgs>(args: SelectSubset<T, TailoredResumeUpdateArgs<ExtArgs>>): Prisma__TailoredResumeClient<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TailoredResumes.
     * @param {TailoredResumeDeleteManyArgs} args - Arguments to filter TailoredResumes to delete.
     * @example
     * // Delete a few TailoredResumes
     * const { count } = await prisma.tailoredResume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TailoredResumeDeleteManyArgs>(args?: SelectSubset<T, TailoredResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TailoredResumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TailoredResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TailoredResumes
     * const tailoredResume = await prisma.tailoredResume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TailoredResumeUpdateManyArgs>(args: SelectSubset<T, TailoredResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TailoredResumes and returns the data updated in the database.
     * @param {TailoredResumeUpdateManyAndReturnArgs} args - Arguments to update many TailoredResumes.
     * @example
     * // Update many TailoredResumes
     * const tailoredResume = await prisma.tailoredResume.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TailoredResumes and only return the `id`
     * const tailoredResumeWithIdOnly = await prisma.tailoredResume.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TailoredResumeUpdateManyAndReturnArgs>(args: SelectSubset<T, TailoredResumeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TailoredResume.
     * @param {TailoredResumeUpsertArgs} args - Arguments to update or create a TailoredResume.
     * @example
     * // Update or create a TailoredResume
     * const tailoredResume = await prisma.tailoredResume.upsert({
     *   create: {
     *     // ... data to create a TailoredResume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TailoredResume we want to update
     *   }
     * })
     */
    upsert<T extends TailoredResumeUpsertArgs>(args: SelectSubset<T, TailoredResumeUpsertArgs<ExtArgs>>): Prisma__TailoredResumeClient<$Result.GetResult<Prisma.$TailoredResumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TailoredResumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TailoredResumeCountArgs} args - Arguments to filter TailoredResumes to count.
     * @example
     * // Count the number of TailoredResumes
     * const count = await prisma.tailoredResume.count({
     *   where: {
     *     // ... the filter for the TailoredResumes we want to count
     *   }
     * })
    **/
    count<T extends TailoredResumeCountArgs>(
      args?: Subset<T, TailoredResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TailoredResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TailoredResume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TailoredResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TailoredResumeAggregateArgs>(args: Subset<T, TailoredResumeAggregateArgs>): Prisma.PrismaPromise<GetTailoredResumeAggregateType<T>>

    /**
     * Group by TailoredResume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TailoredResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TailoredResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TailoredResumeGroupByArgs['orderBy'] }
        : { orderBy?: TailoredResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TailoredResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTailoredResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TailoredResume model
   */
  readonly fields: TailoredResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TailoredResume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TailoredResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resume<T extends ResumeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResumeDefaultArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TailoredResume model
   */
  interface TailoredResumeFieldRefs {
    readonly id: FieldRef<"TailoredResume", 'String'>
    readonly resumeId: FieldRef<"TailoredResume", 'String'>
    readonly jobDescription: FieldRef<"TailoredResume", 'String'>
    readonly tailoredText: FieldRef<"TailoredResume", 'String'>
    readonly summaryOfChanges: FieldRef<"TailoredResume", 'Json'>
    readonly highlightedKeywords: FieldRef<"TailoredResume", 'Json'>
    readonly provider: FieldRef<"TailoredResume", 'String'>
    readonly createdAt: FieldRef<"TailoredResume", 'DateTime'>
    readonly updatedAt: FieldRef<"TailoredResume", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TailoredResume findUnique
   */
  export type TailoredResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeInclude<ExtArgs> | null
    /**
     * Filter, which TailoredResume to fetch.
     */
    where: TailoredResumeWhereUniqueInput
  }

  /**
   * TailoredResume findUniqueOrThrow
   */
  export type TailoredResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeInclude<ExtArgs> | null
    /**
     * Filter, which TailoredResume to fetch.
     */
    where: TailoredResumeWhereUniqueInput
  }

  /**
   * TailoredResume findFirst
   */
  export type TailoredResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeInclude<ExtArgs> | null
    /**
     * Filter, which TailoredResume to fetch.
     */
    where?: TailoredResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TailoredResumes to fetch.
     */
    orderBy?: TailoredResumeOrderByWithRelationInput | TailoredResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TailoredResumes.
     */
    cursor?: TailoredResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TailoredResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TailoredResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TailoredResumes.
     */
    distinct?: TailoredResumeScalarFieldEnum | TailoredResumeScalarFieldEnum[]
  }

  /**
   * TailoredResume findFirstOrThrow
   */
  export type TailoredResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeInclude<ExtArgs> | null
    /**
     * Filter, which TailoredResume to fetch.
     */
    where?: TailoredResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TailoredResumes to fetch.
     */
    orderBy?: TailoredResumeOrderByWithRelationInput | TailoredResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TailoredResumes.
     */
    cursor?: TailoredResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TailoredResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TailoredResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TailoredResumes.
     */
    distinct?: TailoredResumeScalarFieldEnum | TailoredResumeScalarFieldEnum[]
  }

  /**
   * TailoredResume findMany
   */
  export type TailoredResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeInclude<ExtArgs> | null
    /**
     * Filter, which TailoredResumes to fetch.
     */
    where?: TailoredResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TailoredResumes to fetch.
     */
    orderBy?: TailoredResumeOrderByWithRelationInput | TailoredResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TailoredResumes.
     */
    cursor?: TailoredResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TailoredResumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TailoredResumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TailoredResumes.
     */
    distinct?: TailoredResumeScalarFieldEnum | TailoredResumeScalarFieldEnum[]
  }

  /**
   * TailoredResume create
   */
  export type TailoredResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a TailoredResume.
     */
    data: XOR<TailoredResumeCreateInput, TailoredResumeUncheckedCreateInput>
  }

  /**
   * TailoredResume createMany
   */
  export type TailoredResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TailoredResumes.
     */
    data: TailoredResumeCreateManyInput | TailoredResumeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TailoredResume createManyAndReturn
   */
  export type TailoredResumeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * The data used to create many TailoredResumes.
     */
    data: TailoredResumeCreateManyInput | TailoredResumeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TailoredResume update
   */
  export type TailoredResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a TailoredResume.
     */
    data: XOR<TailoredResumeUpdateInput, TailoredResumeUncheckedUpdateInput>
    /**
     * Choose, which TailoredResume to update.
     */
    where: TailoredResumeWhereUniqueInput
  }

  /**
   * TailoredResume updateMany
   */
  export type TailoredResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TailoredResumes.
     */
    data: XOR<TailoredResumeUpdateManyMutationInput, TailoredResumeUncheckedUpdateManyInput>
    /**
     * Filter which TailoredResumes to update
     */
    where?: TailoredResumeWhereInput
    /**
     * Limit how many TailoredResumes to update.
     */
    limit?: number
  }

  /**
   * TailoredResume updateManyAndReturn
   */
  export type TailoredResumeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * The data used to update TailoredResumes.
     */
    data: XOR<TailoredResumeUpdateManyMutationInput, TailoredResumeUncheckedUpdateManyInput>
    /**
     * Filter which TailoredResumes to update
     */
    where?: TailoredResumeWhereInput
    /**
     * Limit how many TailoredResumes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TailoredResume upsert
   */
  export type TailoredResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the TailoredResume to update in case it exists.
     */
    where: TailoredResumeWhereUniqueInput
    /**
     * In case the TailoredResume found by the `where` argument doesn't exist, create a new TailoredResume with this data.
     */
    create: XOR<TailoredResumeCreateInput, TailoredResumeUncheckedCreateInput>
    /**
     * In case the TailoredResume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TailoredResumeUpdateInput, TailoredResumeUncheckedUpdateInput>
  }

  /**
   * TailoredResume delete
   */
  export type TailoredResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeInclude<ExtArgs> | null
    /**
     * Filter which TailoredResume to delete.
     */
    where: TailoredResumeWhereUniqueInput
  }

  /**
   * TailoredResume deleteMany
   */
  export type TailoredResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TailoredResumes to delete
     */
    where?: TailoredResumeWhereInput
    /**
     * Limit how many TailoredResumes to delete.
     */
    limit?: number
  }

  /**
   * TailoredResume without action
   */
  export type TailoredResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TailoredResume
     */
    select?: TailoredResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TailoredResume
     */
    omit?: TailoredResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TailoredResumeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    sourceType: 'sourceType',
    originalFilename: 'originalFilename',
    filePath: 'filePath',
    parseStatus: 'parseStatus',
    sourceText: 'sourceText',
    extractedText: 'extractedText',
    parseError: 'parseError',
    structuredData: 'structuredData',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const TailoredResumeScalarFieldEnum: {
    id: 'id',
    resumeId: 'resumeId',
    jobDescription: 'jobDescription',
    tailoredText: 'tailoredText',
    summaryOfChanges: 'summaryOfChanges',
    highlightedKeywords: 'highlightedKeywords',
    provider: 'provider',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TailoredResumeScalarFieldEnum = (typeof TailoredResumeScalarFieldEnum)[keyof typeof TailoredResumeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'ResumeParseStatus'
   */
  export type EnumResumeParseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResumeParseStatus'>
    


  /**
   * Reference to a field of type 'ResumeParseStatus[]'
   */
  export type ListEnumResumeParseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResumeParseStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ResumeWhereInput = {
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    id?: StringFilter<"Resume"> | string
    title?: StringFilter<"Resume"> | string
    slug?: StringFilter<"Resume"> | string
    sourceType?: StringFilter<"Resume"> | string
    originalFilename?: StringNullableFilter<"Resume"> | string | null
    filePath?: StringNullableFilter<"Resume"> | string | null
    parseStatus?: EnumResumeParseStatusFilter<"Resume"> | $Enums.ResumeParseStatus
    sourceText?: StringNullableFilter<"Resume"> | string | null
    extractedText?: StringNullableFilter<"Resume"> | string | null
    parseError?: StringNullableFilter<"Resume"> | string | null
    structuredData?: JsonNullableFilter<"Resume">
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
    tailoredResumes?: TailoredResumeListRelationFilter
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    sourceType?: SortOrder
    originalFilename?: SortOrderInput | SortOrder
    filePath?: SortOrderInput | SortOrder
    parseStatus?: SortOrder
    sourceText?: SortOrderInput | SortOrder
    extractedText?: SortOrderInput | SortOrder
    parseError?: SortOrderInput | SortOrder
    structuredData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tailoredResumes?: TailoredResumeOrderByRelationAggregateInput
  }

  export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    title?: StringFilter<"Resume"> | string
    sourceType?: StringFilter<"Resume"> | string
    originalFilename?: StringNullableFilter<"Resume"> | string | null
    filePath?: StringNullableFilter<"Resume"> | string | null
    parseStatus?: EnumResumeParseStatusFilter<"Resume"> | $Enums.ResumeParseStatus
    sourceText?: StringNullableFilter<"Resume"> | string | null
    extractedText?: StringNullableFilter<"Resume"> | string | null
    parseError?: StringNullableFilter<"Resume"> | string | null
    structuredData?: JsonNullableFilter<"Resume">
    createdAt?: DateTimeFilter<"Resume"> | Date | string
    updatedAt?: DateTimeFilter<"Resume"> | Date | string
    tailoredResumes?: TailoredResumeListRelationFilter
  }, "id" | "slug">

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    sourceType?: SortOrder
    originalFilename?: SortOrderInput | SortOrder
    filePath?: SortOrderInput | SortOrder
    parseStatus?: SortOrder
    sourceText?: SortOrderInput | SortOrder
    extractedText?: SortOrderInput | SortOrder
    parseError?: SortOrderInput | SortOrder
    structuredData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    OR?: ResumeScalarWhereWithAggregatesInput[]
    NOT?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Resume"> | string
    title?: StringWithAggregatesFilter<"Resume"> | string
    slug?: StringWithAggregatesFilter<"Resume"> | string
    sourceType?: StringWithAggregatesFilter<"Resume"> | string
    originalFilename?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    filePath?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    parseStatus?: EnumResumeParseStatusWithAggregatesFilter<"Resume"> | $Enums.ResumeParseStatus
    sourceText?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    extractedText?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    parseError?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    structuredData?: JsonNullableWithAggregatesFilter<"Resume">
    createdAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
  }

  export type TailoredResumeWhereInput = {
    AND?: TailoredResumeWhereInput | TailoredResumeWhereInput[]
    OR?: TailoredResumeWhereInput[]
    NOT?: TailoredResumeWhereInput | TailoredResumeWhereInput[]
    id?: StringFilter<"TailoredResume"> | string
    resumeId?: StringFilter<"TailoredResume"> | string
    jobDescription?: StringFilter<"TailoredResume"> | string
    tailoredText?: StringFilter<"TailoredResume"> | string
    summaryOfChanges?: JsonFilter<"TailoredResume">
    highlightedKeywords?: JsonFilter<"TailoredResume">
    provider?: StringFilter<"TailoredResume"> | string
    createdAt?: DateTimeFilter<"TailoredResume"> | Date | string
    updatedAt?: DateTimeFilter<"TailoredResume"> | Date | string
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
  }

  export type TailoredResumeOrderByWithRelationInput = {
    id?: SortOrder
    resumeId?: SortOrder
    jobDescription?: SortOrder
    tailoredText?: SortOrder
    summaryOfChanges?: SortOrder
    highlightedKeywords?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resume?: ResumeOrderByWithRelationInput
  }

  export type TailoredResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TailoredResumeWhereInput | TailoredResumeWhereInput[]
    OR?: TailoredResumeWhereInput[]
    NOT?: TailoredResumeWhereInput | TailoredResumeWhereInput[]
    resumeId?: StringFilter<"TailoredResume"> | string
    jobDescription?: StringFilter<"TailoredResume"> | string
    tailoredText?: StringFilter<"TailoredResume"> | string
    summaryOfChanges?: JsonFilter<"TailoredResume">
    highlightedKeywords?: JsonFilter<"TailoredResume">
    provider?: StringFilter<"TailoredResume"> | string
    createdAt?: DateTimeFilter<"TailoredResume"> | Date | string
    updatedAt?: DateTimeFilter<"TailoredResume"> | Date | string
    resume?: XOR<ResumeScalarRelationFilter, ResumeWhereInput>
  }, "id">

  export type TailoredResumeOrderByWithAggregationInput = {
    id?: SortOrder
    resumeId?: SortOrder
    jobDescription?: SortOrder
    tailoredText?: SortOrder
    summaryOfChanges?: SortOrder
    highlightedKeywords?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TailoredResumeCountOrderByAggregateInput
    _max?: TailoredResumeMaxOrderByAggregateInput
    _min?: TailoredResumeMinOrderByAggregateInput
  }

  export type TailoredResumeScalarWhereWithAggregatesInput = {
    AND?: TailoredResumeScalarWhereWithAggregatesInput | TailoredResumeScalarWhereWithAggregatesInput[]
    OR?: TailoredResumeScalarWhereWithAggregatesInput[]
    NOT?: TailoredResumeScalarWhereWithAggregatesInput | TailoredResumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TailoredResume"> | string
    resumeId?: StringWithAggregatesFilter<"TailoredResume"> | string
    jobDescription?: StringWithAggregatesFilter<"TailoredResume"> | string
    tailoredText?: StringWithAggregatesFilter<"TailoredResume"> | string
    summaryOfChanges?: JsonWithAggregatesFilter<"TailoredResume">
    highlightedKeywords?: JsonWithAggregatesFilter<"TailoredResume">
    provider?: StringWithAggregatesFilter<"TailoredResume"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TailoredResume"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TailoredResume"> | Date | string
  }

  export type ResumeCreateInput = {
    id?: string
    title: string
    slug: string
    sourceType: string
    originalFilename?: string | null
    filePath?: string | null
    parseStatus?: $Enums.ResumeParseStatus
    sourceText?: string | null
    extractedText?: string | null
    parseError?: string | null
    structuredData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tailoredResumes?: TailoredResumeCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    sourceType: string
    originalFilename?: string | null
    filePath?: string | null
    parseStatus?: $Enums.ResumeParseStatus
    sourceText?: string | null
    extractedText?: string | null
    parseError?: string | null
    structuredData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tailoredResumes?: TailoredResumeUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    originalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    parseStatus?: EnumResumeParseStatusFieldUpdateOperationsInput | $Enums.ResumeParseStatus
    sourceText?: NullableStringFieldUpdateOperationsInput | string | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    parseError?: NullableStringFieldUpdateOperationsInput | string | null
    structuredData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tailoredResumes?: TailoredResumeUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    originalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    parseStatus?: EnumResumeParseStatusFieldUpdateOperationsInput | $Enums.ResumeParseStatus
    sourceText?: NullableStringFieldUpdateOperationsInput | string | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    parseError?: NullableStringFieldUpdateOperationsInput | string | null
    structuredData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tailoredResumes?: TailoredResumeUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type ResumeCreateManyInput = {
    id?: string
    title: string
    slug: string
    sourceType: string
    originalFilename?: string | null
    filePath?: string | null
    parseStatus?: $Enums.ResumeParseStatus
    sourceText?: string | null
    extractedText?: string | null
    parseError?: string | null
    structuredData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    originalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    parseStatus?: EnumResumeParseStatusFieldUpdateOperationsInput | $Enums.ResumeParseStatus
    sourceText?: NullableStringFieldUpdateOperationsInput | string | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    parseError?: NullableStringFieldUpdateOperationsInput | string | null
    structuredData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    originalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    parseStatus?: EnumResumeParseStatusFieldUpdateOperationsInput | $Enums.ResumeParseStatus
    sourceText?: NullableStringFieldUpdateOperationsInput | string | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    parseError?: NullableStringFieldUpdateOperationsInput | string | null
    structuredData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TailoredResumeCreateInput = {
    id?: string
    jobDescription: string
    tailoredText: string
    summaryOfChanges: JsonNullValueInput | InputJsonValue
    highlightedKeywords: JsonNullValueInput | InputJsonValue
    provider: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resume: ResumeCreateNestedOneWithoutTailoredResumesInput
  }

  export type TailoredResumeUncheckedCreateInput = {
    id?: string
    resumeId: string
    jobDescription: string
    tailoredText: string
    summaryOfChanges: JsonNullValueInput | InputJsonValue
    highlightedKeywords: JsonNullValueInput | InputJsonValue
    provider: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TailoredResumeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobDescription?: StringFieldUpdateOperationsInput | string
    tailoredText?: StringFieldUpdateOperationsInput | string
    summaryOfChanges?: JsonNullValueInput | InputJsonValue
    highlightedKeywords?: JsonNullValueInput | InputJsonValue
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resume?: ResumeUpdateOneRequiredWithoutTailoredResumesNestedInput
  }

  export type TailoredResumeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
    jobDescription?: StringFieldUpdateOperationsInput | string
    tailoredText?: StringFieldUpdateOperationsInput | string
    summaryOfChanges?: JsonNullValueInput | InputJsonValue
    highlightedKeywords?: JsonNullValueInput | InputJsonValue
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TailoredResumeCreateManyInput = {
    id?: string
    resumeId: string
    jobDescription: string
    tailoredText: string
    summaryOfChanges: JsonNullValueInput | InputJsonValue
    highlightedKeywords: JsonNullValueInput | InputJsonValue
    provider: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TailoredResumeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobDescription?: StringFieldUpdateOperationsInput | string
    tailoredText?: StringFieldUpdateOperationsInput | string
    summaryOfChanges?: JsonNullValueInput | InputJsonValue
    highlightedKeywords?: JsonNullValueInput | InputJsonValue
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TailoredResumeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    resumeId?: StringFieldUpdateOperationsInput | string
    jobDescription?: StringFieldUpdateOperationsInput | string
    tailoredText?: StringFieldUpdateOperationsInput | string
    summaryOfChanges?: JsonNullValueInput | InputJsonValue
    highlightedKeywords?: JsonNullValueInput | InputJsonValue
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumResumeParseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResumeParseStatus | EnumResumeParseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResumeParseStatus[] | ListEnumResumeParseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResumeParseStatus[] | ListEnumResumeParseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResumeParseStatusFilter<$PrismaModel> | $Enums.ResumeParseStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TailoredResumeListRelationFilter = {
    every?: TailoredResumeWhereInput
    some?: TailoredResumeWhereInput
    none?: TailoredResumeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TailoredResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    sourceType?: SortOrder
    originalFilename?: SortOrder
    filePath?: SortOrder
    parseStatus?: SortOrder
    sourceText?: SortOrder
    extractedText?: SortOrder
    parseError?: SortOrder
    structuredData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    sourceType?: SortOrder
    originalFilename?: SortOrder
    filePath?: SortOrder
    parseStatus?: SortOrder
    sourceText?: SortOrder
    extractedText?: SortOrder
    parseError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    sourceType?: SortOrder
    originalFilename?: SortOrder
    filePath?: SortOrder
    parseStatus?: SortOrder
    sourceText?: SortOrder
    extractedText?: SortOrder
    parseError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumResumeParseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResumeParseStatus | EnumResumeParseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResumeParseStatus[] | ListEnumResumeParseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResumeParseStatus[] | ListEnumResumeParseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResumeParseStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResumeParseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResumeParseStatusFilter<$PrismaModel>
    _max?: NestedEnumResumeParseStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ResumeScalarRelationFilter = {
    is?: ResumeWhereInput
    isNot?: ResumeWhereInput
  }

  export type TailoredResumeCountOrderByAggregateInput = {
    id?: SortOrder
    resumeId?: SortOrder
    jobDescription?: SortOrder
    tailoredText?: SortOrder
    summaryOfChanges?: SortOrder
    highlightedKeywords?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TailoredResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    resumeId?: SortOrder
    jobDescription?: SortOrder
    tailoredText?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TailoredResumeMinOrderByAggregateInput = {
    id?: SortOrder
    resumeId?: SortOrder
    jobDescription?: SortOrder
    tailoredText?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type TailoredResumeCreateNestedManyWithoutResumeInput = {
    create?: XOR<TailoredResumeCreateWithoutResumeInput, TailoredResumeUncheckedCreateWithoutResumeInput> | TailoredResumeCreateWithoutResumeInput[] | TailoredResumeUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: TailoredResumeCreateOrConnectWithoutResumeInput | TailoredResumeCreateOrConnectWithoutResumeInput[]
    createMany?: TailoredResumeCreateManyResumeInputEnvelope
    connect?: TailoredResumeWhereUniqueInput | TailoredResumeWhereUniqueInput[]
  }

  export type TailoredResumeUncheckedCreateNestedManyWithoutResumeInput = {
    create?: XOR<TailoredResumeCreateWithoutResumeInput, TailoredResumeUncheckedCreateWithoutResumeInput> | TailoredResumeCreateWithoutResumeInput[] | TailoredResumeUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: TailoredResumeCreateOrConnectWithoutResumeInput | TailoredResumeCreateOrConnectWithoutResumeInput[]
    createMany?: TailoredResumeCreateManyResumeInputEnvelope
    connect?: TailoredResumeWhereUniqueInput | TailoredResumeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumResumeParseStatusFieldUpdateOperationsInput = {
    set?: $Enums.ResumeParseStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TailoredResumeUpdateManyWithoutResumeNestedInput = {
    create?: XOR<TailoredResumeCreateWithoutResumeInput, TailoredResumeUncheckedCreateWithoutResumeInput> | TailoredResumeCreateWithoutResumeInput[] | TailoredResumeUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: TailoredResumeCreateOrConnectWithoutResumeInput | TailoredResumeCreateOrConnectWithoutResumeInput[]
    upsert?: TailoredResumeUpsertWithWhereUniqueWithoutResumeInput | TailoredResumeUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: TailoredResumeCreateManyResumeInputEnvelope
    set?: TailoredResumeWhereUniqueInput | TailoredResumeWhereUniqueInput[]
    disconnect?: TailoredResumeWhereUniqueInput | TailoredResumeWhereUniqueInput[]
    delete?: TailoredResumeWhereUniqueInput | TailoredResumeWhereUniqueInput[]
    connect?: TailoredResumeWhereUniqueInput | TailoredResumeWhereUniqueInput[]
    update?: TailoredResumeUpdateWithWhereUniqueWithoutResumeInput | TailoredResumeUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: TailoredResumeUpdateManyWithWhereWithoutResumeInput | TailoredResumeUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: TailoredResumeScalarWhereInput | TailoredResumeScalarWhereInput[]
  }

  export type TailoredResumeUncheckedUpdateManyWithoutResumeNestedInput = {
    create?: XOR<TailoredResumeCreateWithoutResumeInput, TailoredResumeUncheckedCreateWithoutResumeInput> | TailoredResumeCreateWithoutResumeInput[] | TailoredResumeUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: TailoredResumeCreateOrConnectWithoutResumeInput | TailoredResumeCreateOrConnectWithoutResumeInput[]
    upsert?: TailoredResumeUpsertWithWhereUniqueWithoutResumeInput | TailoredResumeUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: TailoredResumeCreateManyResumeInputEnvelope
    set?: TailoredResumeWhereUniqueInput | TailoredResumeWhereUniqueInput[]
    disconnect?: TailoredResumeWhereUniqueInput | TailoredResumeWhereUniqueInput[]
    delete?: TailoredResumeWhereUniqueInput | TailoredResumeWhereUniqueInput[]
    connect?: TailoredResumeWhereUniqueInput | TailoredResumeWhereUniqueInput[]
    update?: TailoredResumeUpdateWithWhereUniqueWithoutResumeInput | TailoredResumeUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: TailoredResumeUpdateManyWithWhereWithoutResumeInput | TailoredResumeUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: TailoredResumeScalarWhereInput | TailoredResumeScalarWhereInput[]
  }

  export type ResumeCreateNestedOneWithoutTailoredResumesInput = {
    create?: XOR<ResumeCreateWithoutTailoredResumesInput, ResumeUncheckedCreateWithoutTailoredResumesInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutTailoredResumesInput
    connect?: ResumeWhereUniqueInput
  }

  export type ResumeUpdateOneRequiredWithoutTailoredResumesNestedInput = {
    create?: XOR<ResumeCreateWithoutTailoredResumesInput, ResumeUncheckedCreateWithoutTailoredResumesInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutTailoredResumesInput
    upsert?: ResumeUpsertWithoutTailoredResumesInput
    connect?: ResumeWhereUniqueInput
    update?: XOR<XOR<ResumeUpdateToOneWithWhereWithoutTailoredResumesInput, ResumeUpdateWithoutTailoredResumesInput>, ResumeUncheckedUpdateWithoutTailoredResumesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumResumeParseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResumeParseStatus | EnumResumeParseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResumeParseStatus[] | ListEnumResumeParseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResumeParseStatus[] | ListEnumResumeParseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResumeParseStatusFilter<$PrismaModel> | $Enums.ResumeParseStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumResumeParseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResumeParseStatus | EnumResumeParseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResumeParseStatus[] | ListEnumResumeParseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResumeParseStatus[] | ListEnumResumeParseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResumeParseStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResumeParseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResumeParseStatusFilter<$PrismaModel>
    _max?: NestedEnumResumeParseStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TailoredResumeCreateWithoutResumeInput = {
    id?: string
    jobDescription: string
    tailoredText: string
    summaryOfChanges: JsonNullValueInput | InputJsonValue
    highlightedKeywords: JsonNullValueInput | InputJsonValue
    provider: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TailoredResumeUncheckedCreateWithoutResumeInput = {
    id?: string
    jobDescription: string
    tailoredText: string
    summaryOfChanges: JsonNullValueInput | InputJsonValue
    highlightedKeywords: JsonNullValueInput | InputJsonValue
    provider: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TailoredResumeCreateOrConnectWithoutResumeInput = {
    where: TailoredResumeWhereUniqueInput
    create: XOR<TailoredResumeCreateWithoutResumeInput, TailoredResumeUncheckedCreateWithoutResumeInput>
  }

  export type TailoredResumeCreateManyResumeInputEnvelope = {
    data: TailoredResumeCreateManyResumeInput | TailoredResumeCreateManyResumeInput[]
    skipDuplicates?: boolean
  }

  export type TailoredResumeUpsertWithWhereUniqueWithoutResumeInput = {
    where: TailoredResumeWhereUniqueInput
    update: XOR<TailoredResumeUpdateWithoutResumeInput, TailoredResumeUncheckedUpdateWithoutResumeInput>
    create: XOR<TailoredResumeCreateWithoutResumeInput, TailoredResumeUncheckedCreateWithoutResumeInput>
  }

  export type TailoredResumeUpdateWithWhereUniqueWithoutResumeInput = {
    where: TailoredResumeWhereUniqueInput
    data: XOR<TailoredResumeUpdateWithoutResumeInput, TailoredResumeUncheckedUpdateWithoutResumeInput>
  }

  export type TailoredResumeUpdateManyWithWhereWithoutResumeInput = {
    where: TailoredResumeScalarWhereInput
    data: XOR<TailoredResumeUpdateManyMutationInput, TailoredResumeUncheckedUpdateManyWithoutResumeInput>
  }

  export type TailoredResumeScalarWhereInput = {
    AND?: TailoredResumeScalarWhereInput | TailoredResumeScalarWhereInput[]
    OR?: TailoredResumeScalarWhereInput[]
    NOT?: TailoredResumeScalarWhereInput | TailoredResumeScalarWhereInput[]
    id?: StringFilter<"TailoredResume"> | string
    resumeId?: StringFilter<"TailoredResume"> | string
    jobDescription?: StringFilter<"TailoredResume"> | string
    tailoredText?: StringFilter<"TailoredResume"> | string
    summaryOfChanges?: JsonFilter<"TailoredResume">
    highlightedKeywords?: JsonFilter<"TailoredResume">
    provider?: StringFilter<"TailoredResume"> | string
    createdAt?: DateTimeFilter<"TailoredResume"> | Date | string
    updatedAt?: DateTimeFilter<"TailoredResume"> | Date | string
  }

  export type ResumeCreateWithoutTailoredResumesInput = {
    id?: string
    title: string
    slug: string
    sourceType: string
    originalFilename?: string | null
    filePath?: string | null
    parseStatus?: $Enums.ResumeParseStatus
    sourceText?: string | null
    extractedText?: string | null
    parseError?: string | null
    structuredData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeUncheckedCreateWithoutTailoredResumesInput = {
    id?: string
    title: string
    slug: string
    sourceType: string
    originalFilename?: string | null
    filePath?: string | null
    parseStatus?: $Enums.ResumeParseStatus
    sourceText?: string | null
    extractedText?: string | null
    parseError?: string | null
    structuredData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeCreateOrConnectWithoutTailoredResumesInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutTailoredResumesInput, ResumeUncheckedCreateWithoutTailoredResumesInput>
  }

  export type ResumeUpsertWithoutTailoredResumesInput = {
    update: XOR<ResumeUpdateWithoutTailoredResumesInput, ResumeUncheckedUpdateWithoutTailoredResumesInput>
    create: XOR<ResumeCreateWithoutTailoredResumesInput, ResumeUncheckedCreateWithoutTailoredResumesInput>
    where?: ResumeWhereInput
  }

  export type ResumeUpdateToOneWithWhereWithoutTailoredResumesInput = {
    where?: ResumeWhereInput
    data: XOR<ResumeUpdateWithoutTailoredResumesInput, ResumeUncheckedUpdateWithoutTailoredResumesInput>
  }

  export type ResumeUpdateWithoutTailoredResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    originalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    parseStatus?: EnumResumeParseStatusFieldUpdateOperationsInput | $Enums.ResumeParseStatus
    sourceText?: NullableStringFieldUpdateOperationsInput | string | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    parseError?: NullableStringFieldUpdateOperationsInput | string | null
    structuredData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateWithoutTailoredResumesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    originalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    parseStatus?: EnumResumeParseStatusFieldUpdateOperationsInput | $Enums.ResumeParseStatus
    sourceText?: NullableStringFieldUpdateOperationsInput | string | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    parseError?: NullableStringFieldUpdateOperationsInput | string | null
    structuredData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TailoredResumeCreateManyResumeInput = {
    id?: string
    jobDescription: string
    tailoredText: string
    summaryOfChanges: JsonNullValueInput | InputJsonValue
    highlightedKeywords: JsonNullValueInput | InputJsonValue
    provider: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TailoredResumeUpdateWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobDescription?: StringFieldUpdateOperationsInput | string
    tailoredText?: StringFieldUpdateOperationsInput | string
    summaryOfChanges?: JsonNullValueInput | InputJsonValue
    highlightedKeywords?: JsonNullValueInput | InputJsonValue
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TailoredResumeUncheckedUpdateWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobDescription?: StringFieldUpdateOperationsInput | string
    tailoredText?: StringFieldUpdateOperationsInput | string
    summaryOfChanges?: JsonNullValueInput | InputJsonValue
    highlightedKeywords?: JsonNullValueInput | InputJsonValue
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TailoredResumeUncheckedUpdateManyWithoutResumeInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobDescription?: StringFieldUpdateOperationsInput | string
    tailoredText?: StringFieldUpdateOperationsInput | string
    summaryOfChanges?: JsonNullValueInput | InputJsonValue
    highlightedKeywords?: JsonNullValueInput | InputJsonValue
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}