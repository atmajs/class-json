import { JsonSchema } from '../src/JsonSchema'
import { Json } from '../src/Json';
import { Rule } from '../src/validation/Rule';

UTest({
    'should extract simple schema' () {
        class Foo {
            @Json.type(String)
            @Rule.required()
            @Rule.minLength(3)
            name: string

            @Json.type(Date)
            created: Date

            @Json.array(Number)
            numbers: number[]
        }

        const schema = JsonSchema.getSchema(Foo);
        deepEq_(schema, {
            type: 'object',
            required: [
                'name'
            ],
            properties: {
                name: {
                    type: 'string',
                    minLength: 3
                },
                created: {
                    type: 'string',
                    format: 'date-time'
                },
                numbers: {
                    type: 'array',
                    items: {
                        type: 'number'
                    }
                }
            }
        })
    }
});