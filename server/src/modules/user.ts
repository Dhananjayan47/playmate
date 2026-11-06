import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [60, " Name cannot exceed 60 characters"],
    },
    email: {
      type: String,
      required: [true, " Email address is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Never exposed in queries by default
    },
    role: {
      type: String,
      enum: ["player", "venue_manager", "admin"],
      default: "player",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    avatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    },
    sports: [
      {
        type: String,
        enum: [
          "Badminton",
          "Football",
          "Cricket",
          "Tennis",
          "Basketball",
          "Table Tennis",
        ],
        default: ["Badminton"],
      },
    ],
    reliabilityScore: {
      type: Number,
      default: 100, // Reduced on no-shows, increased on completed games
      min: 0,
      max: 100,
    },
    tempOtp: {
      type: String, // Hashed 6-digit OTP
      select: false,
    },
    otpExpiresAt: {
      type: Date,
      select: false,
    },
    tempTokenHash: {
      type: String,
      select: false,
    },
    tempTokenExpiresAt: {
      type: Date,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default model("user", userSchema);