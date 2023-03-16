import { CustomError } from "./customError";

export class NotFoundError extends CustomError {
    statusCode = 404;
    message = "Not Found";
    
    constructor() {
        super("Not Found");
    }

    serializeErrors() {
        return [{message: this.message}];
    }
}