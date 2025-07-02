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

// !comment schema
const commentSchema = new Schema({
    text: String,
    // Add any other fields you need here
}, { timestamps: true });

//? Compile the comments schema to form model
const comments = mongoose.model('comments', commentSchema);

//! blog  schema
const blog_Schema = new Schema({
    title: String,
   comments:[{type:mongoose.Schema.Types.ObjectId,ref:'comments'}]
}, { timestamps: true });

//? Compile the blog schema to form model
const post= mongoose.model("blogs", blog_Schema);

//first we create a post then we create comments
// Create author
// const createpost = async () => {
//     try {
//         // Create author
//         const newAuthor = await post.create({ 
//             title: "Some Author Name",
//         });
     
//     } catch (error) {
//         console.log(error);
//     }   
// };

// createpost();


//!create comment after creating the post

const createComment = async () => {
    try {
    //? step1. Find the post you want to comment
     const postFound=await post.findById('66b069d027b05a1460a9e218')//!put the id of post
     console.log(postFound)
    //? step2 Create the Comment
    const newComment=await comments.create({
        text:'Awosome post'
    })
    console.log(newComment)
    //? step3 push the comment into then post 
    //? resave the post
     postFound.comments.push(newComment._id)
     await postFound.save()
     console.log(postFound.comments)
    } catch (error) {
        console.log(error);
    }   
};

createComment();

// Start the server
app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
});
