import { Request, Response, NextFunction } from "express"
import { NotAuthorizedError } from "../errors";
import {verifyAccessToken} from '../utils/jwtUtils';

interface UserPayload {
    id: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}



export const checkAuth = (roles: Array<string> | undefined) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { authorization } = req.headers;

            if (!authorization) throw new NotAuthorizedError('Authorization code required');

            const token = authorization.split(' ');

            // Cut the bearer token and find the token portion
            if (token[0] !== 'Bearer') throw new NotAuthorizedError('Bearer Token is required');

            // Verify and find the user id
            const { id, role, exp } = await verifyAccessToken(token[1]);

            // check if the token is expired
            const expiredTime = exp ? exp * 1000 : 0;
            if (expiredTime * 1000 < Date.now()) throw new NotAuthorizedError('Token is expried');

            req.user = { id, role };

            if (!roles || !roles.length) return next();

            let i;
            for (i = 0; i < roles.length; i++)
                if (roles[i] === role) break;

            if (i === roles.length) throw new NotAuthorizedError('You are not authorized');

            return next();
        }
        catch (error) {
            next(error);
        }
    }
}