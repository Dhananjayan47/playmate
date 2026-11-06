import type { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (err: unknown, _req, res, _next) => {
    const error = err instanceof Error ? err : new Error("Internal Server Error");
    const errorMetadata = err as Error & {
        statusCode?: number;
        code?: number;
        status?: number;
        details?: unknown;
    };

    let statusCode = errorMetadata.statusCode ?? 500;
    let message = error.message || "Internal Server Error";

    if (error.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }
    if (errorMetadata.code === 11000) {
        statusCode = 400;
        message = "Duplicate value. This record already exists";
    }

    if (error instanceof SyntaxError && errorMetadata.status === 400 && "body" in errorMetadata) {
        statusCode = 400;
        message = "Invalid JSON in request body";
    }

    if (statusCode >= 500) {
        console.error(error);
    }

    res.status(statusCode).json({
        success: "fail",
        status: statusCode >= 500 ? "error" : "fail",
        message: statusCode >= 500 ? "Internal Server Error" : message,
        ...(Array.isArray(errorMetadata.details) && { errors: errorMetadata.details }),
    });
};

export default errorMiddleware;