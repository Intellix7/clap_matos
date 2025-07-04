import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import saltAndHashPassword from "./utils/password";
import { getUserFromDb } from "./utils/db";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const pwHash = saltAndHashPassword(password);

          const user = await getUserFromDb(email, pwHash);

          if (!user) {
            throw new Error("Invalid email or password");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            throw new Error("Invalid input format");
          }

          // You can add more error types and specific messages if needed
          throw new Error("Internal server error");
        }
      },
    }),
  ],
};
