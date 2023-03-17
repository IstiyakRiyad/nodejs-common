import { Request, Response, NextFunction} from "express"
import ErrorResponse  from "../interfaces/ErrorResponse";

export function ErrorMessage(error: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction){
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);

    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack 
    });
}