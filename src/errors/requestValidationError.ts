import { CustomError } from "./customError";
import {ZodError} from 'zod';

export class RequestValidationError extends CustomError {
    constructor(public errors: ZodError) {
        super("Invalid Request Parameters");
    }

    serializeErrors() {
        return this.errors.errors.map(error => ({
            message: error.message,
            field: error.path[0] as string
        }));
    }
}