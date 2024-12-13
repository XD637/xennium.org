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
            throw new Error("Sign up before Sign in"); // No user found
          }

          // Check if the user is a Google user
          if (user.isGoogleUser) {
            // If the user is a Google user, return a special message or handle differently
            throw new Error("Sign in via Google"); // Skip password check if signed in via Google
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
          // If user doesn't exist, create new user and set isGoogleUser flag
          const { publicKey, privateKey } = await generateKeyPair();
          const newUser = {
            email: normalizedEmail, // Store email as lowercase
            publicKey,
            privateKey,
            isGoogleUser: true, // Explicitly set to true for Google users
            createdAt: new Date(),
          };

          console.log('Creating new user:', newUser); // Debugging log
          await usersCollection.insertOne(newUser);
        } else {
          // If user exists and is not a Google user, update the isGoogleUser flag
          if (!existingUser.isGoogleUser && user.provider === 'google') {
            await usersCollection.updateOne(
              { email: normalizedEmail },
              { $set: { isGoogleUser: true } }
            );
            console.log('Updated existing user to be a Google user:', existingUser); // Debugging log
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
      session.user.isGoogleUser = token.isGoogleUser; // Ensure this is set in the session
      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.email = user?.email?.toLowerCase(); // Normalize email here if needed
        token.isGoogleUser = user?.provider === 'google'; // Add isGoogleUser flag to token
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
