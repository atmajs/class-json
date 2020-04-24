<h1 align='center'>
    <b><code>{</code></b>
    <code>class:json</code>
    <b><code>}</code></b>
</h1>

<p align="center">
    <a href='https://travis-ci.org/atmajs/class-json' target='_blank'>
        <img src='https://travis-ci.org/atmajs/class-json.png?branch=master' />
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
        
2. Classes

    * `Serializable<T>`

```ts
interface Serializable<T> {
    constructor (partial: Partial<T>)
    static fromJson (json): T
    static validate (instance: T): IRuleError[]
    toJSON(): object
}
```

3. Namespaces

    * `JsonConvert`
        * `toJson(model, settings)`
        * `fromJson<T>(model, settings): T`


---

© 2020 atmajs
