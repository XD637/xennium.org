import nodemailer from "nodemailer";
import crypto from "crypto";
import { getUserByEmail, updatePasswordResetToken } from "../../app/utils/db"; // Database functions to find user and store token

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      // Check if the user exists in the database
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Email not found." });
      }

      // Check if the user is a Google user
      if (user.isGoogleUser) {
        return res.status(400).json({ message: "Cannot change password for Google user." });
      }

      // Generate a password reset token and expiry (30 minutes)
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes

      // Store the token and expiry in the database
      await updatePasswordResetToken(email, resetToken, resetTokenExpiry);

      // Send password reset email using Mailgun
      const transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        secure: false,
        auth: {
          user: "postmaster@xennium.org", // SMTP username
          pass: process.env.MAILGUN_SMTP_PASS,
        },
      });

      const mailOptions = {
        from: '"Xennium Support" <postmaster@xennium.org>',
        to: email,
        subject: "Password Reset Link",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #5a4cb1;">Reset Your Password</h2>
            <p>Click the link below to reset your password. This link will expire in 30 minutes.</p>
            <a href="http://xennium.org/password-reset?token=${resetToken}" style="color: #7d5bee;">Reset Password</a>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Password reset link sent to your email." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
