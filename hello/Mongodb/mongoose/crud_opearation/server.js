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
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("mongodb successfully connected");
    } catch (error) {
        console.log(error);
    }
};
connectdb();

const userprofile = new Schema({
    username: String,
    age: Number,
    birthday: Date,
    isActive: Boolean,
    school: String,
    hobbies: [String],
    address: {
        street: String,
        city: String,
        postcode: Number,
    },
    customdata: mongoose.Schema.Types.Mixed,
});

// compile the schema to form the model
const user = mongoose.model("First_users", userprofile);

//!======crud operations

// create document
//!save()
// const new_user = new user({
//     username: "saikat",
//     age: 19,
//     birthday: new Date('2006-07-02'),
//     isActive: true,
//     hobbies: ['soccer', 'reading', 'coding'],
//     address: {
//         street: "ghatal, beltola",
//         city: "ghatal",
//         postcode: 721211,
//     },
//     customdata: "ghatal"
// });
// Remember this operation is asynchronous, meaning
// that we have to handle the promise for this one to
// new_user.save().then((e) => {
//     console.log(e);
// }).catch((e) => {
//     console.log(e);
// });

//!create()
// user.create({
//     username: "saikat sinchan ghosh",
//     age: 19,
//     birthday: new Date('2006-07-02'),
//     isActive: true,
//     hobbies: ['soccer', 'reading', 'coding'],
//     address: {
//         street: "ghatal, beltola",
//         city: "ghatal",
//         postcode: 721211,
//     },
//     customdata: "ghatal"
// }).then((e) => {
//     console.log(e);
// }).catch((e) => {
//     console.log(e);
// });

// //!insertmany
// // start the server
// //for insert it stores array of object
// user.insertMany([{
//     username: "mainak",
//     age: 19,
//     birthday: new Date('2006-07-02'),
//     isActive: true,
//     hobbies: ['soccer', 'reading', 'coding'],
//     address: {
//         street: "ghatal, beltola",
//         city: "ghatal",
//         postcode: 721211,
//     },
//     customdata: "ghatal"
// },{
//     username: " ghosh",
//     age: 19,
//     birthday: new Date('2006-07-02'),
//     isActive: true,
//     hobbies: ['soccer', 'reading', 'coding'],
//     address: {
//         street: "ghatal, beltola",
//         city: "ghatal",
//         postcode: 721211,
//     },
//     customdata: "ghatal"
// }]).then((e) => {
//     console.log(e);
// }).catch((e) => {
//     console.log(e);
// });

//!find method
// user.find().then((e)=>{
//     console.log(e)
// }).catch((e)=>{
//     console.log(e)
// })

// user._id = 1;
// user.save().then((e) => {
//     console.log(e);
// }).catch((e) => {
//     console.log(e);
// });

// user.findOne({
//     username: 'mainak',
//     age: 19,
// }).then((e) => {
//     console.log(e);
// }).catch((e) => {
//     console.log(e);
// });

// user.findById('66a9e6e00ae79cdfc25cd182').then((e) => {
//     console.log(e);
// }).catch((e) => {
//     console.log(e);
// });

// const find_user = async () => {
//     try {
//         const store = await user.findOneAndUpdate(
//             { username: "the thor" },
//             {
//                 // $addToSet: { hobbies: 'football' },
//                 $push:{hobbies:'football'},
//                 $set: { address: { street: "saikat" } }
//             },
//             {
//                 new: true
//             }
//         );
//         console.log(store);
//     } catch (error) {
//         console.log(error);
//     }
// };
// const find_user = async () => {
//     try {
//         const store = await user.findOneAndUpdate(
//             { username: "the thor" },
//             {
//                 // $addToSet: { hobbies: 'football' },
//                 // $push:{hobbies:'football'},
//                 // $inc: { age:1 },
//                 $mul: {age:3},
//             },
//             {
//                 new: true
//             }
//         );
//         console.log(store);
//     } catch (error) {
//         console.log(error);
//     }
// };
// find_user();
// const find_user = async () => {
//     try {
//         const store = await user.findOneAndUpdate(
//             { username: "the thor" },
//             {
//                 // $addToSet: { hobbies: 'football' },
//                 // $push:{hobbies:'football'},
//                 // $inc: { age:1 },
//                 // $mul: {age:3},
//                 // $pop:{hobbies:1}
//                 $pull:{hobbies:'coding'}
//             },
//             {
//                 new: true
//             }
//         );
//         console.log(store);
//     } catch (error) {
//         console.log(error);
//     }
// };
// find_user();
const delete_doc = async () => {
    try {
        const store = await user.findByIdAndDelete(
            '66a9d9389d810f1071e84a7b'
        );   
        console.log(store);
        const delet = await user.findOneAndDelete(
            {username:"the spiderman"}
        );   
        console.log(delet);
        const delet_Many = await user.deleteMany(
            {age:{$gt:30}}
        );   
        console.log(delet_Many);
    } catch (error) {
        console.log(error);
    }
};
delete_doc();
//!findOne method
//!findById method

app.listen(port, () => {
    console.log("server started running on port " + port);
});
