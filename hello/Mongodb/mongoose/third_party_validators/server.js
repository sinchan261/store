const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const { Schema } = mongoose;
const validato=require('validator')
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

const userprofile = new Schema({
    age: {
        type: String,
        required: [true, 'Please provide your age'],
        validate: {
            validator: function (value) {
               return  validato.isInt(value,{min:0,max:120})
            },
            message: 'invalid age'
        }
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        validate: {
            validator: function (value) {
                return validato.isEmail(value)
            },
            message: 'invalid email'
        }
    }
}, {
    // Additional configuration
    timestamps: true // by default it is false
});

// compile the schema to form the model
const User = mongoose.model("First_users", userprofile);

const createUserDoc = async () => {
    try {
        const userCreated = await User.create({
            age:"14",
            email:"gsaikat@gmail.com"
        });
        console.log('User created:', userCreated);
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

createUserDoc();

app.listen(port, () => {
    console.log("Server started running on port " + port);
});
