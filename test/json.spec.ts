import { JsonConvert } from '../src/JsonConvert';
import { Json } from '../src/Json'
import { Serializable } from '../src/Serializable';
import { JsonUtils } from '../src/export';

UTest({
    'add rename meta to property' () {
        class Foo {

            @Json.name('bar')
            foo: string

            toString () { return this.foo; }
        }

        let f = new Foo();        
        let meta = JsonUtils.pickModelMeta(f);

        has_(meta, {
            Type: Foo,
            properties: {
                foo: {
                    property: 'foo',
                    jsonName: 'bar'
                }
            }
        });

        f.foo = 'lorem';

        let json = JsonConvert.toJSON(f);
        deepEq_(json, { bar: 'lorem' });

        let f2 = JsonConvert.fromJSON <Foo> (json, { Type: Foo });
        deepEq_(f2, { foo: 'lorem' });
        eq_(f2.toString(), 'lorem');
    },
    'support DateTime properties and under score renamings' () {
                
        class Foo extends Serializable<Foo> {
            @Json.type(Date)
            createdAt: Date
        }

        let f = new Foo({
            createdAt: new Date
        });

        let json = f.toJSON({ propertyResolver: 'underScore' });
        deepEq_(json, { created_at: f.createdAt.toISOString() });

        let f2 = Foo.fromJSON(json, { propertyResolver: 'camelCase' });
        is_(f2.createdAt, Date);
        eq_(f2.createdAt.toString(), f.createdAt.toString());
    },    

    'support raw objects' () {
        let model = { number: Math.random() };
        let json = JsonConvert.toJSON(model);
        deepEq_(model, json);
    },

    'should deserialize default values' () {
        class Foo extends Serializable<Foo> {
            
            @Json.value('foo')
            name: string
        }
        eq_(new Foo().name, 'foo');

        eq_(new Foo({}).name, 'foo');
        eq_(new Foo({ name: 'bar' }).name, 'bar');
    },

    'should support JSON serialization of a property' () {
        class Product {
            id: number
        }
        
        class Order {
            user: string

            @Json.stringify()
            products: Product[]
        }
        let json = {
            user: 'foo',
            products: JSON.stringify([{id: 5}])
        };

        let order = JsonConvert.fromJSON(json, { Type: Order });
        eq_(order.products[0].id, 5);
    }
})