import type { RequestHandler } from "express";
import { z } from "zod";
import AppError from "../utils/appError.js";

type RequestSchema = z.ZodType<{
    body: unknown;
    params: unknown;
    query: unknown;
}>;

const validate = <T extends RequestSchema>(
    schema: T
): RequestHandler => (req, _res, next) => {
    const result = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
    });

    if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        const error = new AppError("Validation failed", 400);
        error.details = errors;

        return next(error);
    }

    req.body = result.data.body;

    next();
};

export default validate;