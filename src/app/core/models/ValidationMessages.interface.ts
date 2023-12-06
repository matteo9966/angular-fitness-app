export interface ValidationMessages {
    [name:string]:(...args:any[])=>string
}