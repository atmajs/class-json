const { Json, JsonConvert, JsonUtils } = require('../../lib/umd/json.js');


const Foo = JsonUtils.decorate(class {

    constructor (foo) {
        this.foo = foo;
    }

    toString () { return this.foo; }
}, {
    foo: [
        Json.name('qux'),
    ]
})

let f = new Foo('lorem');

let json = JsonConvert.toJSON(f);
console.log(JSON.stringify(json)); // {"bar":"lorem"})
