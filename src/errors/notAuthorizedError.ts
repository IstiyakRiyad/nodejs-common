import { CustomError } from "./customError";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor(public message: string) {
        super(message);
    }

    serializeErrors() {
        return [{message: this.message}]
    }
}