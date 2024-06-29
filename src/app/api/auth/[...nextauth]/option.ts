import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import myDbConnection from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "malik@gmail.com ",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          await myDbConnection();
          const getUser = await UserModel.findOne({
            email: credentials.email,
          });
          //console.log("credential: ", credentials.email);
          if (!getUser) {
            throw new Error("no user found");
          }
          if (!getUser.isVerified) {
            throw new Error(
              "Please verify your account before logging in, through email"
            );
          }
          // for password we have to use like this credentials.password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            getUser.password
          );
          if (!isPasswordCorrect) {
            throw new Error("password is incorrect");
          } else {
            return getUser;
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    // add another provide like git hub
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
};
