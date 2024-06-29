import { Document } from "mongoose";

export interface IImage {
  url: string;
}

export interface User extends Document {
  email: string;
  password: string;
  verifyCode: string;
  image: string;
  name: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAdmin: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}
