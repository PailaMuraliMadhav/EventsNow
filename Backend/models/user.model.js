import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "organizer", "admin"],
      default: "student",
    },
    userId: {
      type: String,
      unique: true,
    },
    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    otp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

// ✅ Generate custom userId before saving
userSchema.pre("save", function (next) {
  if (!this.userId) {
    const prefix =
      this.role === "student"
        ? "STU"
        : this.role === "organizer"
        ? "ORG"
        : "ADM";

    // Example: STU-58342 or ORG-91467
    const uniquePart =
      Date.now().toString().slice(-5) + Math.floor(Math.random() * 90 + 10);
    this.userId = `${prefix}-${uniquePart}`;
  }
  next();
});

export const User = mongoose.model("User", userSchema);
