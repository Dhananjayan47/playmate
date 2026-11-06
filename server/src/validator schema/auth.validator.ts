import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, "Username must contain at least 4 characters")
    .max(30, "Username cannot exceed 30 characters"),
  email: z
    .email("Please provide a valid email address")
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(72, "Password cannot exceed 72 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
  role: z.enum(["player", "venue_manager"]),
});

const loginSchema = z.object({
  email: z
    .email("Please provide a valid email address")
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(72, "Password cannot exceed 72 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
});



const otpBodySchema = z.object({
  tempToken: z
    .string()
    .regex(/^[a-f0-9]{64}$/, "Temporary token is invalid"),
  otp: z
  .string()
  .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export const registerRequestSchema = z.object({
  body: registerSchema,
  params: z.object({}),
  query: z.object({}),
});
export const loginRequestSchema = z.object({
  body: loginSchema,
  params: z.object({}),
  query: z.object({}),
});
export const otpRequestSchema = z.object({
  body: otpBodySchema,
  params: z.object({}),
  query: z.object({}),
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type OtpRequest = z.infer<typeof otpRequestSchema>;