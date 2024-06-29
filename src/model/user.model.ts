import mongoose, { Schema } from "mongoose";
import { User } from "@/lib/types";

interface UserDocument extends User, Document {}

const UserSchema: Schema<UserDocument> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    verifyCode: {
      type: String,
      required: [true, "Verify Code is required"],
    },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "Verify Code Expiry is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
