var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { JsonConvert } from '../src/JsonConvert';
import { Json } from '../src/Json';
import { Serializable } from '../src/Serializable';
UTest({
    'add rename meta to property'() {
        class Foo {
            toString() { return this.foo; }
        }
        __decorate([
            Json.name('bar')
        ], Foo.prototype, "foo", void 0);
        let f = new Foo();
        let meta = f.__json__;
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
        let f2 = JsonConvert.fromJson(json, Foo);
        deepEq_(f2, { foo: 'lorem' });
        eq_(f2.toString(), 'lorem');
    },
    'support DateTime properties and under score renamings'() {
        class Foo extends Serializable {
        }
        __decorate([
            Json.type(Date)
        ], Foo.prototype, "createdAt", void 0);
        let f = new Foo({
            createdAt: new Date
        });
        let json = f.toJson({ propertyResolver: 'underScore' });
        deepEq_(json, { created_at: f.createdAt.toISOString() });
        let f2 = Foo.fromJson(json);
        is_(f2.createdAt, Date);
        eq_(f2.createdAt.toString(), f.createdAt.toString());
    },
    'support raw objects'() {
        let model = { number: Math.random() };
        let json = JsonConvert.toJson(model);
        deepEq_(model, json);
    }
});
