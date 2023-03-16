export abstract class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }

    abstract serializeErrors(): {message: string, field?: string}[]
}