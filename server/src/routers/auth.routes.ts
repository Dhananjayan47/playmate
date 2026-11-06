import { Router } from "express";
import {
    otpVerification,
    userLogin,
    userRegister,
} from "../controllers/auth.controllers.js";
import validate from "../middlewares/validate.middleware.js";
import {
    loginRequestSchema,
    otpRequestSchema,
    registerRequestSchema,
} from "../validator schema/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", validate(registerRequestSchema), userRegister);
authRouter.post("/login", validate(loginRequestSchema), userLogin);
authRouter.post("/verify-otp", validate(otpRequestSchema), otpVerification);

export default authRouter;
