<h1 align='center'>
    <b><code>{</code></b>
    <code>class:json</code>
    <b><code>}</code></b>
</h1>

<p align="center">
    <a href='https://travis-ci.com/atmajs/class-json' target='_blank'>
        <img src='https://travis-ci.com/atmajs/class-json.png?branch=master' />
    </a>
    <a href='http://badge.fury.io/js/class-json' target='_blank'>
        <img src='https://badge.fury.io/js/class-json.svg' />
    </a>
</p>


Comprehensive JSON library for a class.

> with TypeScript support


1. Decorators
    1.1 Converting

        * `@Json.type(Ctor: Function, options?)`
        * `@Json.array(Ctor: Function, options?)`
        * `@Json.name(jsonName: string)`
        * `@Json.ignore()`
        * `@Json.converter(converter: IJsonConverter)`

    1.2 Validation

        * `@Rule.required(message?)`
        * `@Rule.minLength(count: number, message?)`
        * `@Rule.maxLength(count: number, message?)`
        * `@Rule.minimum(val: number, message?)`
        * `@Rule.maximum(val: number, message?)`
        * `@Rule.pattern(rgx: RegExp, message?)`
        * `@Rule.validate(validator: IValueValidator)`

        Message Type:

        * string
        * string templates: `Interpolations: ~[value] ~[property] ~[model.foo]`
        * Custom Function: `(value, model) => string`

```ts
import { Json, Rule } from 'class-json'

class Transaction {

    @Json.type(BigInt)
    @Rule.minimum(100n)
    value: bigint

    @Json.type(Date)
    @Ruke.required()
    executeAt: Date
}
```

2. Classes

    * `Serializable<T>`

```ts
interface Serializable<T> {

    constructor (partial: Partial<T>)

    /** Create an instance from json, all Types from decorators will be restored. */
    static fromJSON (json): T

    /** Use Rules from decorators to validate the instance */
    static validate (instance: T): IRuleError[]

    /** Serialize instance to JSON object. All Types from decorators will be properly converted to JSON supported types */
    toJSON(): object
}
```

> Constructor: accepts partial object, example:

```ts
// instead of:
let foo = new Foo();
foo.lorem = 'lorem';
foo.ipsum = 'ipsum';

// more convinient way would be:
let foo = new Foo({
    lorem: 'lorem',
    ipsum: 'ipsum'
});
```


3. Namespaces

    * `JsonConvert`
        * `toJSON(model, settings)`
        * `fromJSON<T>(model, settings): T`


---

© 2021 Atmajs
