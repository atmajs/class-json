import { Json, JsonConvert, JsonUtils } from '../../lib/esm/json.mjs';


const Foo = JsonUtils.decorate(class {

    constructor (foo) {
        this.foo = foo;
    }

    toString () { return this.foo; }
}, {
    foo: [
        Json.name('bar'),
    ]
})

let f = new Foo('lorem');

let json = JsonConvert.toJSON(f);
console.log(JSON.stringify(json)); // {"bar":"lorem"})
