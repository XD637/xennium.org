import { getUserByResetToken, updateUserPassword, updatePasswordResetToken } from "../../app/utils/db"; // Functions to get user and update password


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { resetToken, password } = req.body;

    try {
      // Get user by reset token
      const user = await getUserByResetToken(resetToken);

      // Check if user exists and token is valid
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired reset token." });
      }

      // Check if the reset token has expired
      if (user.resetTokenExpiry < Date.now()) {
        return res.status(400).json({ message: "Reset token has expired." });
      }


      // Update the password in the database
      await updateUserPassword(user.email, password);

      // Clear the reset token after successful password reset
      await updatePasswordResetToken(user.email, null, null);

      // Respond with success message
      res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
      // Handle any errors during the process
      console.error(error);
      res.status(500).json({ message: "Something went wrong." });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
