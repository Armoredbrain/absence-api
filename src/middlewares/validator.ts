import { validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validator(req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    res.status(406).json({ code: 406, message: errors.array() });
}
