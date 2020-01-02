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
        * `@Rule.required()`
        * `@Rule.minLength(count: number)`
        * `@Rule.maxLength(count: number)`
        * `@Rule.pattern(rgx: RegExp)`
        * `@Rule.validate(validator: IValueValidator)`
        
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
