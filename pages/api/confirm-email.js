import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = "Users";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are required" });
    }

    const client = new MongoClient(MONGODB_URI);
    try {
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const unregisteredCollection = db.collection("unregistered-users");
      const usersCollection = db.collection("users");

      const user = await unregisteredCollection.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.verificationCode !== code) {
        return res.status(400).json({ message: "Invalid verification code" });
      }

      const now = new Date();
      if (user.verificationExpiry < now) {
        return res.status(400).json({ message: "Verification code expired" });
      }

      // Move user to the users collection
      await usersCollection.insertOne({
        email: user.email,
        password: user.password,
        publicKey: user.publicKey,
        privateKey: user.privateKey,
        createdAt: user.createdAt,
      });

      // Remove from unregistered-users collection
      await unregisteredCollection.deleteOne({ email });

      return res.status(200).json({ message: "Email verified successfully" });
    } catch (err) {
      console.error("Error during email verification:", err);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
