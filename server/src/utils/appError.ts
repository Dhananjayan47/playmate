class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    details?: unknown;

    constructor(message: string, statusCode = 500, cause?: unknown) {
        super(message, { cause });

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;