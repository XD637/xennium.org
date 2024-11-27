import clientPromise from '../../app/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db("items");
      const itemsCollection = db.collection('items');

      // Fetch the items from the database
      const items = await itemsCollection.find({}).toArray();

      // Respond with the items data
      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
