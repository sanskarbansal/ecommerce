import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    return res.status(404).json({
        error: err.message,
    });
}
