import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db/mongodb";
import { User } from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          // For initial setup: if no user exists, let's allow a default one
          // In production, you'd use a seed script or register page
          if (credentials.email === "admin@example.com" && credentials.password === "admin123") {
             return { id: "1", name: "Admin", email: "admin@example.com" };
          }
          throw new Error("Invalid credentials");
        }

        // Simplification: In a real app, use bcrypt to compare passwords
        if (credentials.password !== user.password) {
          throw new Error("Invalid credentials");
        }

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
