import { JsonConvert } from '../src/JsonConvert';
import { Json } from '../src/Json'
import { Serializable } from '../src/Serializable';

UTest({
    'add rename meta to property' () {
                
        class Foo {

            @Json.name('bar')
            foo: string

            toString () { return this.foo; }
        }

        let f = new Foo();        
        let meta = (f as any).__json__;

        deepEq_(meta, {
            Type: Foo,
            properties: {
                foo: {
                    property: 'foo',
                    jsonName: 'bar'
                }
            }
        });

        f.foo = 'lorem';

        let json = JsonConvert.toJson(f);
        deepEq_(json, { bar: 'lorem' });

        let f2 = JsonConvert.fromJson <Foo> (json, { Type: Foo });
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

        let json = f.toJson({ propertyResolver: 'underScore' });
        deepEq_(json, { created_at: f.createdAt.toISOString() });

        let f2 = Foo.fromJson(json);

        is_(f2.createdAt, Date);
        eq_(f2.createdAt.toString(), f.createdAt.toString());
    },    

    'support raw objects' () {
        let model = { number: Math.random() };
        let json = JsonConvert.toJson(model);
        deepEq_(model, json);
    }
})