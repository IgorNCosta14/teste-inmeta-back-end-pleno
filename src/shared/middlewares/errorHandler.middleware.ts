import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../errors/ErrorHandler';

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({ status: err.statusCode, message: err.message, errors: err.details ? err.details : undefined });
    }

    return res.status(500).json({
        status: 500,
        message: `Internal server error - ${err.message}`,
        stack: err.stack,
    });
}