import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = "Users";

async function generateKeyPair() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      "ec",
      {
        namedCurve: "secp256k1",
        publicKeyEncoding: { type: "spki", format: "pem" },
        privateKeyEncoding: { type: "pkcs8", format: "pem" },
      },
      (err, publicKey, privateKey) => {
        if (err) reject(err);
        else resolve({ publicKey, privateKey });
      }
    );
  });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const client = new MongoClient(MONGODB_URI);
    try {
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const usersCollection = db.collection("users");

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const { publicKey, privateKey } = await generateKeyPair();

      const newUser = {
        email,
        password: hashedPassword,
        publicKey,
        privateKey,
        createdAt: new Date(),
      };

      await usersCollection.insertOne(newUser);

      return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
