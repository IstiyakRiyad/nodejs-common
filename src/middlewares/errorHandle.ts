import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/customError";
import ErrorResponse from "../interfaces/ErrorResponse";

export function ErrorMessage(error: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);

    if (error instanceof CustomError) {
        return res.json({
            errors: error.serializeErrors()
        });
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    });
}