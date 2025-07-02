const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 5000;

// MongoDB connection details
const uri = "mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Function to connect to MongoDB
const connectDB = async () => {
    
    try {
        await client.connect()
        const database=client.db('masyntech')
    const employ=database.collection('employees')
    const books=database.collection('books')
    // const bookdocs=[
    //                 {name:"alice",age:25,department:"hr"},
    //                 {name:"bob",age:30,department:"finance"},
    //                 {name:"charlie",age:35,department:"it"},
    //                 {name:"david",age:40,department:"operation"},
    //                          {name:"eva",age:45,department:"it"}
    //     ]
        // await books.insertMany(bookdocs)
//         const employessDocs=[
//             {name:"alice",age:25,department:"hr"},
//             {name:"bob",age:30,department:"finance"},
//             {name:"charlie",age:35,department:"it"},
//             {name:"david",age:40,department:"operation"},
//             {name:"eva",age:45,department:"it"}
//         ]
// const result=await employ.insertMany(employessDocs)
// console.log(result)

//!-==qeurying operation
//!--$gt
// const emplo=employ.find({age:{$gt:30}})
// const result=emplo.forEach(element => {
//     console.log(element)
    
// });
//!$gte
// const emplo2=employ.find({age:{$gte:30}})
// const result2=emplo2.forEach(element => {
//     console.log(element)
    
// });
//!lt
// const emplo3=employ.find({age:{$lt:30}})
// const result3=emplo3.forEach(element => {
//     console.log(element)
    
// });
// const emplo4=employ.find({age:{$lte:30}})
// const result4=emplo4.forEach(element => {
//     console.log(element)
    
// });
//!$ne
// const emplo5=employ.find({age:{$ne:40}})
// const result5=emplo5.forEach(element => {
//     console.log(element)
    
// });
// const results=await emplo.toArray()
// console.log(emplo)
// const emplo5=employ.find({age:{$nin:[25,30,45]}})
// const result5=emplo5.forEach(element => {
//     console.log(element)
    
// });
const book1=books.find({
    $nor:[{name:"bob"},{age:{$lt:30}}]
})


const result=await book1.toArray()
console.log(result)

const book2=books.find({
    $and:[{name:"bob"},{age:{$lt:30}}]
})


const result2=await book2.toArray()
console.log(result2)
    } 

    
    catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

// Connect to MongoDB
connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

