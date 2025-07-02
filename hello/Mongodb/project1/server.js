const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 5000;
app.use(express.json());

// MongoDB connection details
const uri = "mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Function to connect to MongoDB and return the collection
const connectDB = async () => {
    try {
        await client.connect();
        const database = client.db('First_Project');
        const collection = database.collection('first_collection');
        return collection;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error('Failed to connect to MongoDB');
    }
};

// Route to add data to the MongoDB collection
app.post('/store_data', async (req, res) => {
    const store = req.body;
    try {
        const collection = await connectDB();
        await collection.insertOne(store);
        res.send("Insert operation successfully done");
    } catch (error) {
        res.status(500).send("Error inserting data: " + error.message);
    }
});

// Route to retrieve data from the MongoDB collection
app.get('/retrieve', async (req, res) => {
    try {
        const collection = await connectDB();
        const data = await collection.find({}).toArray();
        if (data.length === 0) {
            res.status(404).send("No data found");
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).send("Error retrieving data: " + error.message);
    }
});

// Route to update data in the MongoDB collection
app.put('/update_data', async (req, res) => {
    const { id, method } = req.body;
    console.log(id)
    try {
        const collection = await connectDB();
        const result = await collection.updateOne({id:id}, { $set: {method:method} });
        if (result.matchedCount === 0) {
            res.status(404).send("No matching document found");
        } else {
            res.send("Update operation successfully done");
        }
    } catch (error) {
        res.status(500).send("Error updating data: " + error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
