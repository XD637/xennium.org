import clientPromise from '../../app/lib/mongodb'; // Import the MongoDB client promise

// Connect to the MongoDB database
const connectToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db('grants'); // Use your 'grants' database
  return db.collection('applications'); // Access the 'applications' collection
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB collection
      const collection = await connectToDatabase();

      // Extract form data from the request body
      const {
        projectName,
        projectDescription,
        website,
        projectCategory,
        requestedAmount,
        projectImpact,
      } = req.body;

      // Validate the required fields
      const missingFields = [];

      if (!projectName) missingFields.push('Project Name');
      if (!projectDescription) missingFields.push('Project Description');
      if (!requestedAmount) missingFields.push('Requested Amount');

      // If any required fields are missing, return an error
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `The following required fields are missing: ${missingFields.join(', ')}`,
        });
      }

      // Create a new application document
      const newApplication = {
        projectName,
        projectDescription,
        website,
        projectCategory,
        requestedAmount,
        projectImpact,
        createdAt: new Date(),
      };

      // Insert the application into the MongoDB collection
      const result = await collection.insertOne(newApplication);

      // Return a success response
      return res.status(201).json({
        message: 'Application submitted successfully!',
        result,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // If the method is not POST, return Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
