import type { NextFunction, Request, RequestHandler, Response } from "express";

const asyncHandler = <TRequest extends Request = Request>(
    controller: (req: TRequest, res: Response, next: NextFunction) => unknown,
): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(controller(req as TRequest, res, next)).catch(next);
    };
};

export default asyncHandler