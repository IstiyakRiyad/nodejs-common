import { CustomError } from "./customError";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    message = "Error Connecting to Database";

    constructor() {
        super("Error Connecting to Database");
    }

    serializeErrors() {
        return [{message: this.message}];
    }
}