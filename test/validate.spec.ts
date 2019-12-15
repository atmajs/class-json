import { Json } from '../src/Json'
import { Serializable } from '../src/Serializable';
import { Rule } from '../src/validation/Rule';
import { JsonValidate } from '../src/JsonValidate';

UTest({
    'required, min and max length' () {
        class Foo {

            @Rule.required()
            foo: string = null

            @Rule.minLength(4)
            bar: string = '12'

            @Rule.maxLength(3)
            qux: string = '1234'

            @Rule.pattern(/^\d+$/)
            dex: string = '1a1'
        }

        let foo = new Foo();
        let errors = JsonValidate.validate(foo);
        eq_(errors.length, 4);

        let props = errors.map(x => x.property);
        deepEq_(props, ['foo', 'bar', 'qux', 'dex']);
    },
    'nested' () {
        class Bar {
            @Rule.required()
            name = null
        }
        class Foo {

            @Json.type(Bar)
            bar1 = new Bar()

            bar2 = new Bar();

            @Json.type(Bar)
            bar3 = { name: null }
        }

        let foo = new Foo();
        let errors = JsonValidate.validate(foo);
        
        eq_(errors.length, 3);
        let props = errors.map(x => x.property);
        deepEq_(props, ['bar1.name','bar2.name','bar3.name']);
    },
    'correct order' () {
        class Foo {
            
            @Rule.required()
            @Rule.pattern(/^\d+$/)
            foo: string = null
        }

        let foo = new Foo();
        let errors = JsonValidate.validate(foo);
        eq_(errors.length, 1);
        eq_(errors[0].name, 'Required');
    }
})