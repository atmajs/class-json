import { Json } from '../src/Json'
import { JsonConvert, JsonUtils, Rule } from '../src/export';


UTest({
    'bigint' () {
        class Foo {
            @Json.type(BigInt)
            bar: bigint
        }

        let foo = new Foo();
        foo.bar = 5n;

        let json = JsonConvert.toJSON(foo);
        eq_(json.bar, '0x5');

        let back = JsonConvert.fromJSON <Foo> (json, { Type: Foo });
        eq_(typeof back.bar, 'bigint');
        eq_(back.bar, foo.bar);


        let bson = JsonConvert.toJSON(foo, {
            types: {
                'bigint': {
                    toJSON: x => x,
                }
            }
        });
        eq_(typeof bson.bar, 'bigint');
        eq_(bson.bar, foo.bar);

        let backBson = JsonConvert.fromJSON <Foo> (bson, {
            Type: Foo,
            types: {
                'bigint': {
                    fromJSON: x => x * 2n,
                }
            }
        });
        eq_(typeof backBson.bar, 'bigint');
        eq_(backBson.bar, foo.bar * 2n);
    },
});
