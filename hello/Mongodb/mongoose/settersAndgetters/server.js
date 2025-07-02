const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const { Schema } = mongoose;

// instance of express
const app = express();
const url = "mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1";

// connect to mongodb
const connectdb = async () => {
    try {
        await mongoose.connect(url);
        console.log("mongodb successfully connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connectdb();

const books = new Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensures uniqueness of username
    },
    name: {
        type: String,
        required: true,
        set: (value) => {
            return value.toLowerCase();
        }
    },
    price: {
        type: Number,
        required: true,
        set: value => parseFloat(value)
    },
    tags: {
        type: [String],
        required: true,
        set: (value) => {
            return value.map((v) => v.toLowerCase().trim());
        }
    },
    url: {
        type: String,
        required: true,
        set: (value) => {
            return `https://masyntech.com/books/${value}`;
        }
    }
}, {
    timestamps: true,
});

// compile the schema to form the model
const books_data = mongoose.model("book", books);

const createUserDoc = async () => {
    try {
        const store = await books_data.create({
            username: "saikat1", // Ensure this is unique
            name: "saikat",
            price: 20.00,
            url: "hello",
            tags: ["Hi"]
        });
        console.log(store);
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

createUserDoc();

app.listen(port, () => {
    console.log("Server started running on port " + port);
});
