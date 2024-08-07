import { Shell } from 'shellbee'

UTest({
    async 'should load esm' () {
        let { std } = await Shell.run({
            command: 'node esm.mjs',
            cwd: './test/lib/',
            silent: true
        });
        eq_(std.join('').trim(), '{"bar":"lorem"}');
    },
    async 'should load cjs' () {
        let { std } = await Shell.run({
            command: 'node cjs.js',
            cwd: './test/lib/',
            silent: true
        });
        eq_(std.join('').trim(), '{"qux":"lorem"}');
    }
})
