import { Request, Response, NextFunction } from 'express';

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const status = err.status || 500;
    const message = err.message || 'Internal server error';

    return res.status(status).json({
        status,
        message,
        stack: err.stack,
    });
}