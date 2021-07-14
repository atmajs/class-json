import { JsonConvert } from '../src/JsonConvert';
import { Json } from '../src/Json'
import { Serializable } from '../src/Serializable';
import { JsonUtils } from '../src/export';

UTest({
    'add rename meta to property' () {
        class Foo {
            @Json.type(Date)
            bar: Date

            @Json.meta({
                properties: {
                    a: { Type: String },
                    b: { Type: Number },
                    c: { Type: Date },
                }
            })
            foo: { a: string, b: number, c?: Date }
        }

        let f = new Foo();
        let meta = JsonUtils.pickModelMeta(f);
        let fooMeta = meta.properties.foo.Meta.properties
        deepEq_(Object.keys(fooMeta), ['a', 'b', 'c']);

        f.foo = { a: 'a', b: 1 };

        let json = JsonConvert.toJSON(f);
        deepEq_(json, { foo: { a: 'a', b: 1} });

        json = {
            bar: new Date().toISOString(),
            foo: {
                a: 'a', b: 1, c: new Date().toISOString()
            }
        };

        let f2 = JsonConvert.fromJSON <Foo> (json, { Type: Foo });
        eq_(f2.foo.c instanceof Date, true);
        eq_(f2.bar instanceof Date, true);
    },

    'add meta to array' () {
        class Foo {
            @Json.type(Date)
            date: Date


            @Json.meta({
                properties: {
                    date: { Type: Date },
                }
            })
            foo: { date: Date }[]
        }
        let date = new Date();

        // let f = new Foo();
        // f.foo = [ { date }  ]
        // f.date = date;

        let json = JsonConvert.fromJSON({
            foo: [ { date: date.toISOString() }]
        }, { Type: Foo });

        is_(json.foo.push, Function);
        is_(json.foo[0].date, Date);
        deepEq_(json.foo, [ { date: date  }]);

    }
})
