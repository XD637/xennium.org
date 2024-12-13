// Import the shared clientPromise from lib/mongodb.js
import clientPromise from '../lib/mongodb';
import bcrypt from 'bcrypt';

// MongoDB client setup
const dbName = 'Users'; // Database name

// 1. Get User by Email
export async function getUserByEmail(email) {
  try {
    const client = await clientPromise;  // Use the shared clientPromise
    const db = client.db(dbName);  // Get the database instance
    const collection = db.collection('users');
    const normalizedEmail = email.trim().toLowerCase(); // Normalize and trim the email



    // Use regex for case-insensitive email search
    const user = await collection.findOne({ email: { $regex: `^${normalizedEmail}$`, $options: 'i' } });

    if (!user) {
      console.log('No user found for email:', normalizedEmail);  // Log if no user was found
    }

    return user;
  } catch (error) {
    console.error('Error in getUserByEmail: ', error);
    throw new Error('Database error');
  }
}



// 2. Update Password Reset Token in the Reset Collection
export async function updatePasswordResetToken(email, resetToken, resetTokenExpiry) {
  try {
    const client = await clientPromise;  // Use the shared clientPromise
    const db = client.db(dbName);  // Get the database instance
    const collection = db.collection('reset');

    // Check if the token already exists for the given email
    const existingReset = await collection.findOne({ email: email });
    if (existingReset) {
      await collection.updateOne(
        { email: email },
        {
          $set: {
            resetToken: resetToken,
            resetTokenExpiry: resetTokenExpiry,
          },
        }
      );
    } else {
      await collection.insertOne({
        email: email,
        resetToken: resetToken,
        resetTokenExpiry: resetTokenExpiry,
      });
    }
  } catch (error) {
    console.error('Error in updatePasswordResetToken: ', error);
    throw new Error('Database error');
  }
}

// 3. Get User by Reset Token
export async function getUserByResetToken(resetToken) {
  try {
    const client = await clientPromise;  // Use the shared clientPromise
    const db = client.db(dbName);  // Get the database instance
    const collection = db.collection('reset');
    const resetRecord = await collection.findOne({ resetToken: resetToken });

    if (!resetRecord) return null;

    const user = await getUserByEmail(resetRecord.email); // Retrieve user details from the users collection
    return user;
  } catch (error) {
    console.error('Error in getUserByResetToken: ', error);
    throw new Error('Database error');
  }
}

// 4. Update User Password
export async function updateUserPassword(email, newPassword) {
  try {
    const client = await clientPromise;  // Use the shared clientPromise
    const db = client.db(dbName);  // Get the database instance
    const collection = db.collection('users');

    // Hash the new password before storing it
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const result = await collection.updateOne(
      { email: email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return result.modifiedCount > 0; // Return true if password was updated
  } catch (error) {
    console.error('Error in updateUserPassword: ', error);
    throw new Error('Database error');
  }
}
