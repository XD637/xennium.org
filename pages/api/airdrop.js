import { MongoClient } from "mongodb";
import fetch from "node-fetch";

const client = new MongoClient(process.env.MONGODB_URI); // Removed deprecated options
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { verificationName, walletAddress, captchaToken } = req.body;

    if (!captchaToken) {
      return res.status(400).json({ message: "Captcha verification failed. Missing captcha token." });
    }

    // Verify hCaptcha token
    const captchaVerifyUrl = `https://hcaptcha.com/siteverify`;
    const captchaVerifyParams = new URLSearchParams({
      secret: HCAPTCHA_SECRET,
      response: captchaToken,
    });

    try {
      // Step 1: Verify the captcha response with hCaptcha API
      const captchaResponse = await fetch(captchaVerifyUrl, {
        method: "POST",
        body: captchaVerifyParams,
      });

      // Handle potential fetch errors
      if (!captchaResponse.ok) {
        throw new Error(`hCaptcha verification failed with status: ${captchaResponse.status}`);
      }

      const captchaResult = await captchaResponse.json();

      if (!captchaResult.success) {
        return res.status(400).json({ message: "Captcha verification failed." });
      }

      // Step 2: Proceed with database insertion if captcha is valid
      await client.connect();
      const db = client.db("Airdrop");
      const collection = db.collection("Addresses");

      // Insert the form data into the Addresses collection
      const result = await collection.insertOne({
        verificationName,
        walletAddress,
        captchaToken,
        createdAt: new Date(),
      });

      return res.status(200).json({ message: "Form submitted successfully", data: result });
    } catch (error) {
      console.error("Error processing request:", error.message);

      if (error.message.includes("hCaptcha verification failed")) {
        return res.status(500).json({ message: "Error verifying captcha. Please try again later." });
      }

      return res.status(500).json({ message: "Error saving data to database. Please try again later." });
    } finally {
      // Close the MongoDB client connection
      await client.close();
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
