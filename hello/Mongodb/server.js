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
        await client.connect();
        console.log("MongoDB connected successfully");

        //!1.Database name(school)
        const database = client.db("first_document");

        //!2.collection(books)
        const students = database.collection('student');

        //!3 creation a documents using insert one
        // const result = await students.insertOne({
        //     name: "saikat",
        //     age: 20,
        //     subjects: ['math', 'physics']
        // });
        // console.log(result);

        //!create a document using insertMany
        // const result = await students.insertMany([
        //     {
        //         name: 'john',
        //         age: 26,
        //         grade: 'B',
        //         pass: false,
        //         subject: ['chemistry', 'physics']
        //     },
        //     {
        //         name: 'Doe',
        //         age: 30,
        //         grade: 'a',
        //         pass: true,
        //         subject: ['chemistry', 'physics', 'Math']
        //     }
        // ]);
        // console.log(result);

        //!Read operation
        //!find ()
        // const resultCursor = students.find();
        // const convert = await resultCursor.toArray();
        // console.log(convert);

        // const result2 = await students.findOne({
        //     age: 30
        // });

        //!update one
        // const update = await students.updateOne(
        //     { name: 'john', age: 65 },
        //     { $set: { age: 40, pass: true } }
        // );
        // console.log(update);

        //!updateMany
        // const update2 = await students.updateMany(
        //     { grade: 'B' },
        //     {
        //         $set: {
        //             age: 65,
        //             message: "you are so lucky"
        //         }
        //     }
        // );

        //! findOne and update
        // const find = await students.findOneAndUpdate(
        //     { name: 'Doe' },
        //     { $set: { age: 20 } }
        // );
        // console.log(find);

        // const update4 = await students.updateOne(
        //     { name: 'john' },
        //     { $unset: { pass: "" } }
        // );

        //! $currentDate and $set combined update
        const update5 = await students.updateOne(
            { name: "saikat" },
            {
                $currentDate: {
                    lastModified: true,
                    "cancelation.date": { $type: "timestamp" }
                },
                $set: { "cancelation.reason": "user request" }
            }
        );
       
      await students.updateOne(
        {name:"john",age:65},
       [
        {$set:{lastModified:"$$NOW",cancellation:{
            date:"$$CLUSTER_TIME",
            reason:"user defined"

        }}},

       ])


const delet=await students.deleteOne({name:"saikat"})
console.log(delet)


const insert=await students.insertMany([{
    name:"sinchan",
    pass:true,
    grade:"a",
    age:20
},{
    name:"Doe",
    age:20,
    pass:true,
    grade:"a"
}])
console.log(insert)
const deleteMany=await students.deleteMany({
    grade:"a"
})

console.log(deleteMany)

//!findone and deleted (returns only deleted document )
const findOne=await students.findOneAndDelete({
    name:"john"
})
console.log(findOne)
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

// Connect to MongoDB
connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
