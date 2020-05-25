import { obj_map } from '../src/utils/obj';

UTest({
    'map object'() {
        let foo = { a: 1, b: 2, c: 3 };

        let fooX = obj_map(foo, { exclude: ['a'] })
        deepEq_(fooX, { b: 2, c: 3 });

        fooX = obj_map(foo, { include: ['c'] })
        deepEq_(fooX, { c: 3 });

        fooX = obj_map(foo, { props: { a: { ignore: true } } })
        deepEq_(fooX, { b: 2, c: 3 });

        fooX = obj_map(foo, {
            exclude: ['b', 'c'],
            props: { a: { map: (x) => x * 2 } }
        })
        deepEq_(fooX, { a: 2 });
    },
    'map nested'() {
        let foo = {
            id: 1,
            name: 'f',
            bar: {
                idB: 2,
                name: 'b'
            }
        };

        let fooX = obj_map(foo, {
            exclude: ['id'],
            props: {
                bar: {
                    exclude: ['idB']
                }
            }
        })

        deepEq_(fooX, {
            name: 'f',
            bar: {
                name: 'b'
            }
        });
    }
})
