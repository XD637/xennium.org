// /pages/api/signin.js
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = "Users";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase(); // Normalize email to lowercase

    const client = new MongoClient(MONGODB_URI);
    try {
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const usersCollection = db.collection("users");

      const user = await usersCollection.findOne({ email: normalizedEmail });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user is a Google user
      if (user.isGoogleUser) {
        return res.status(403).json({
          message: "This email is associated with Google sign-in. Please log in using Google.",
        });
      }

      // Compare provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Successful login
      return res.status(200).json({
        message: "Sign-in successful",
        email: user.email,
        publicKey: user.publicKey, // Include only public data
      });
    } catch (err) {
      console.error("Sign-in error:", err);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
