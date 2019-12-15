export interface IRule <T = any> {
    validate (value: any, root: any): IRuleError<T>
}

export interface IRuleError <T = any> {
    name: string
    property: string
    value: T
    message: string
}