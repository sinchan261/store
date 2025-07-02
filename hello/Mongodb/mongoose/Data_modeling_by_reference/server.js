const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Instance of express
const app = express();
const port = process.env.PORT || 5000;

const url = "mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1";

// Connect to MongoDB
const connectdb = async () => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB successfully connected");
    } catch (error) {
        console.log(error);
    }
};

connectdb();

// Author schema
const authorSchema = new Schema({
    name: String,
    // Add any other fields you need here
});

// Compile the author schema to form model
const Author = mongoose.model('Author', authorSchema);

// Books schema
const bookSchema = new Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
}, { timestamps: true });

// Compile the book schema to form model
const Book = mongoose.model("Book", bookSchema);

// Create author
const createUser = async () => {
    try {
        // Create author
        const newAuthor = await Author.create({ 
            name: "Some Author Name",
        });
        console.log(newAuthor);
        console.log("Author successfully created");

        // Create book associated with the new author
        const newBook = await Book.create({
            title: "Some Book Title",
            author: newAuthor._id
        });
        console.log(newBook);
        console.log("Book successfully created");
    } catch (error) {
        console.log(error);
    }   
};

createUser();

// Start the server
app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
});
