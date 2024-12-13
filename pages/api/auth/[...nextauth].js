import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import crypto from "crypto";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = "Users";

// Function to generate key pair (for users)
async function generateKeyPair() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      "ec", // Use elliptic curve keys
      {
        namedCurve: "secp256k1", // Commonly used curve
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      },
      (err, publicKey, privateKey) => {
        if (err) reject(err);
        else resolve({ publicKey, privateKey });
      }
    );
  });
}

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
        const normalizedEmail = credentials.email.toLowerCase(); // Normalize email to lowercase

        try {
          await client.connect();
          const db = client.db(DATABASE_NAME);
          const usersCollection = db.collection("users");

          // Find the user by email
          const user = await usersCollection.findOne({ email: normalizedEmail });
          if (!user) {
            throw new Error("Invalid credentials"); // No user found
          }

          // Compare the hashed password stored in the database with the input password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid credentials"); // Passwords don't match
          }

          // If the password matches, return the user object (can be extended with other fields)
          return { email: normalizedEmail };
        } catch (err) {
          console.error("Error during custom sign-in:", err);
          return null; // Return null if there's an error
        } finally {
          await client.close();
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const client = new MongoClient(MONGODB_URI);
      const normalizedEmail = user.email.toLowerCase(); // Normalize email to lowercase
      try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ email: normalizedEmail });
        if (!existingUser) {
          const { publicKey, privateKey } = await generateKeyPair();
          const newUser = {
            email: normalizedEmail, // Store email as lowercase
            publicKey,
            privateKey,
            isGoogleUser: user.isGoogleUser || false,
            createdAt: new Date(),
          };

          await usersCollection.insertOne(newUser);
        } else {
          // Update user if needed
          if (!existingUser.isGoogleUser) {
            await usersCollection.updateOne(
              { email: normalizedEmail },
              { $set: { isGoogleUser: true } }
            );
          }
        }
      } catch (err) {
        console.error("Error during Google signup:", err);
        return false;
      } finally {
        await client.close();
      }

      return true;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.email = user?.email?.toLowerCase(); // Normalize email here if needed
      }
      return token;
    },
  },

  pages: {
    signIn: "/signin", // Custom sign-in page (optional)
    newUser: "/", // Redirect after signup/signin
  },
};

export default NextAuth(authOptions);
