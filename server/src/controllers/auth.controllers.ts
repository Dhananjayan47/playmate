import type { Request } from "express";
import { createHash, randomBytes, randomInt } from "node:crypto";
import bcrypt, { hash } from "bcryptjs";
import userSchema from "../modules/user.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import type {
    LoginRequest,
    OtpRequest,
    RegisterRequest,
} from "../validator schema/auth.validator.js";

type ValidatedRegisterRequest = Request & {
    body: RegisterRequest["body"];
};

type ValidatedLoginRequest = Request & {
    body: LoginRequest["body"];
};

type ValidatedOtpRequest = Request & {
    body: OtpRequest["body"];
};

const hashTempToken = (tempToken: string): string =>
    createHash("sha256").update(tempToken).digest("hex");

export const userRegister = asyncHandler<ValidatedRegisterRequest>(
    async (req, res) => {
        const { name, email, password, role } = req.body;
        // log("success")
        const isExist = await userSchema.findOne({ email });
        if (isExist) {
            throw new AppError("User already registered", 409);
        }

        const saltRounds = Number.parseInt(process.env.SALT ?? "10", 10);
        const hashedPassword = await hash(password, saltRounds);
        const newUser = new userSchema({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.status(201).json({ message: "User register successfully !" });
    },
);

export const userLogin = asyncHandler<ValidatedLoginRequest>(
    async (req, res) => {
        const { email, password } = req.body;
        const existUser = await userSchema.findOne({ email }).select("+password");

        if (!existUser || !(await bcrypt.compare(password, existUser.password))) {
            throw new AppError("Invalid email or password", 401);
        }

        const otp = randomInt(0, 1_000_000).toString().padStart(6, "0");
        const tempToken = randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        const saltRounds = Number.parseInt(process.env.SALT ?? "10", 10);

        existUser.tempOtp = await bcrypt.hash(otp, saltRounds);
        existUser.otpExpiresAt = expiresAt;
        existUser.tempTokenHash = hashTempToken(tempToken);
        existUser.tempTokenExpiresAt = expiresAt;
        await existUser.save();

        console.log("otp is :",otp);

        res.status(200).json({
            success: true,
            requiresOtp: true,
            tempToken,
        });
    },
);

export const otpVerification = asyncHandler<ValidatedOtpRequest>(
    async (req, res) => {
        const { tempToken, otp } = req.body;
        const user = await userSchema
            .findOne({
                tempTokenHash: hashTempToken(tempToken),
                tempTokenExpiresAt: { $gt: new Date() },
            })
            .select("+tempOtp +otpExpiresAt +tempTokenHash +tempTokenExpiresAt");

        if (!user || !user.tempOtp || !user.otpExpiresAt || user.otpExpiresAt <= new Date()) {
            throw new AppError("Invalid or expired OTP", 401);
        }

        if (!(await bcrypt.compare(otp, user.tempOtp))) {
            throw new AppError("Invalid or expired OTP", 401);
        }

        user.tempOtp = undefined;
        user.otpExpiresAt = undefined;
        user.tempTokenHash = undefined;
        user.tempTokenExpiresAt = undefined;
        // user.isVerified=true;
        await user.save();

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    },
);

