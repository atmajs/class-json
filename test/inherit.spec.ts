import { Json } from '../src/Json'
import { JsonUtils, Rule } from '../src/export';


UTest({
    'add rename meta to property' () {
        class FooBase {

            @Json.name('bar')
            foo: string
        }

        let f = new FooBase();        
        let meta = JsonUtils.pickModelMeta(f);

        has_(meta, {
            Type: FooBase,
            properties: {
                foo: {
                    property: 'foo',
                    jsonName: 'bar'
                }
            }
        });

        class FooHttp extends FooBase {

            @Rule.required()
            foo: string
        }

        let fooHttp = new FooHttp();
        let fooHttpMeta = JsonUtils.pickModelMeta(fooHttp);

        notEq_(meta, fooHttpMeta);
        eq_(meta.properties.foo.rules, null);
        notEq_(fooHttpMeta.properties.foo.rules, null);
        eq_(fooHttpMeta.properties.foo.jsonName, 'bar');
        

        class FooPropRenamed extends FooHttp {
            @Json.name('qux')
            foo: string
        }
        let fooPropRenamed = new FooPropRenamed();
        let fooPropRenamedMeta = JsonUtils.pickModelMeta(fooPropRenamed);

        notEq_(meta, fooPropRenamedMeta);
        notEq_(fooPropRenamedMeta.properties.foo.rules, null);
        eq_(fooPropRenamedMeta.properties.foo.jsonName, 'qux');

    },
});