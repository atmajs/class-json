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
        eq_(back.bar, 5n);
    },
});
