import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = "Users";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = new MongoClient(MONGODB_URI);
        const normalizedEmail = credentials.email.toLowerCase();

        try {
          await client.connect();
          const db = client.db(DATABASE_NAME);
          const usersCollection = db.collection("users");

          const user = await usersCollection.findOne({ email: normalizedEmail });

          if (!user) {
            throw new Error("User not found. Please sign up first.");
          }

          // Prevent users who signed up with Google from using credentials login
          if (user.isGoogleUser) {
            throw new Error("You signed up with Google. Please sign in using Google.");
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid email or password.");
          }

          return { email: normalizedEmail };
        } catch (err) {
          console.error("Error during sign-in:", err.message);
          throw new Error(err.message || "An unexpected error occurred.");
        } finally {
          await client.close();
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const client = new MongoClient(MONGODB_URI);
      const normalizedEmail = user.email.toLowerCase();

      try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ email: normalizedEmail });

        if (!existingUser) {
          // New user, register them based on provider
          const newUser = {
            email: normalizedEmail,
            isGoogleUser: account.provider === "google",
            createdAt: new Date(),
          };

          await usersCollection.insertOne(newUser);
        } else {
          // Prevent a credentials user from switching to Google login
          if (!existingUser.isGoogleUser && account.provider === "google") {
            throw new Error("You signed up with email/password. Please sign in using your password.");
          }

          // If user signed up with Google, ensure they always use Google
          if (existingUser.isGoogleUser && account.provider !== "google") {
            throw new Error("Please sign in using Google.");
          }
        }
      } catch (err) {
        console.error("Error during sign-in:", err.message);
        throw new Error(err.message || "Could not complete sign-in. Please try again.");
      } finally {
        await client.close();
      }

      return true;
    },
    async session({ session, token }) {
      if (token?.email) {
        session.user.email = token.email;
        session.user.isGoogleUser = token.isGoogleUser || false;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.email = user?.email?.toLowerCase();
        token.isGoogleUser = account.provider === "google";
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
    newUser: "/",
  },
};

export default NextAuth(authOptions);
