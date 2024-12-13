import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = "Users";
const VERIFICATION_EXPIRY = 30 * 60 * 1000; // 30 minutes

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

async function sendVerificationEmail(email, code) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587, // Port 587 for TLS
      secure: false, // Set to true if using port 465 (SSL)
      auth: {
        user: "postmaster@xennium.org", // SMTP username (Mailgun domain)
        pass: process.env.MAILGUN_SMTP_PASS, // SMTP password from Mailgun
      },
    });

    const mailOptions = {
      from: '"Xennium Support" <postmaster@xennium.org>',
      to: email,
      subject: "Email Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #5a4cb1;">Verify Your Email</h2>
          <p>Your verification code is:</p>
          <div style="display: inline-block; background: #f3f3f3; padding: 10px 20px; margin: 10px 0; font-size: 20px; border-radius: 5px; border: 1px solid #ccc;">
            ${code}
          </div>
          <p><strong>Note:</strong> This code will expire in 30 minutes.</p>
          <p style="font-size: 12px; color: #999;">This is an automated email. Please do not reply to this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email. Please try again later.");
  }
}

async function cleanupExpiredEntries(db) {
  try {
    const unregisteredCollection = db.collection("unregistered-users");
    const result = await unregisteredCollection.deleteMany({
      verificationExpiry: { $lte: new Date() },
    });
    console.log(`${result.deletedCount} expired entries removed from unregistered-users collection.`);
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize email to lowercase
    email = email.toLowerCase();

    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const usersCollection = db.collection("users");
      const unregisteredCollection = db.collection("unregistered-users");

      // Cleanup expired entries before proceeding
      await cleanupExpiredEntries(db);

      // Check if the user exists in either collection
      const [existingUser, unregisteredUser] = await Promise.all([
        usersCollection.findOne({ email }),
        unregisteredCollection.findOne({ email }),
      ]);

      if (existingUser || unregisteredUser) {
        return res
          .status(409)
          .json({ message: "User already exists or email is pending verification." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Generate ECC key pair
      const { publicKey, privateKey } = await generateKeyPair();

      // Generate 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = new Date(Date.now() + VERIFICATION_EXPIRY);

      // Prepare new user object
      const newUser = {
        email,
        password: hashedPassword,
        publicKey,
        privateKey,
        verificationCode,
        verificationExpiry: expiry,
        createdAt: new Date(),
      };

      // Store the user in the unregistered-users collection
      await unregisteredCollection.insertOne(newUser);

      // Send verification email
      await sendVerificationEmail(email, verificationCode);

      return res
        .status(201)
        .json({ message: "User created successfully. Please check your email to verify." });
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close();
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
