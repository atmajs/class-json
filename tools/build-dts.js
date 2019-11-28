var dts = require('dts-bundle');

dts.bundle({
	name: 'class-json',
	main: './ts-temp/export.d.ts',
	out: './typings/index.d.ts'
});

io.File.copyTo('./ts-temp/typings/index.d.ts', './lib/class-json.d.ts');