import { CustomError } from "./customError";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;
    message = "You are not authorized";

    constructor() {
        super("You are not authorized");
    }

    serializeErrors() {
        return [{message: this.message}]
    }
}