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
const courseSchema = new Schema({
   name: String,
   enrollStudents:[{type:mongoose.Schema.Types.ObjectId,ref:'student'}]
    // Add any other fields you need here
}, { timestamps: true });

//? Compile the course schema to form model
const course = mongoose.model('course', courseSchema);

//! student schema
const studentsSchema= new Schema({
    name: String,
   enrolledCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'course'}]
}, { timestamps: true });

//? Compile the students schema to form model
const student= mongoose.model("students", studentsSchema);




//!create course

// const createCourses = async () => {
//     try
//    {const new_doc=await course.create([
//     {name:"Math 101"},
//     {name:"History 101"}
//    ]);
//    console.log('successfully executed')
//         console.log(new_doc)
        
//     }
//    catch(error){
//     console.log(error)
//    }
// };

// createCourses ();
//!create students
// const createstudents = async () => {
//     try{
//         const students=await student.create([
//             {name:"alice"},
//             {name:'bob'}
//         ])
//         console.log(students)

//     }

//    catch(error){
//     console.log(error)
//    }
// };

// createstudents ();
//!students applying to the course
const applytocourse=async ()=>{
    try
    {//?1.we are going to find the students that want to apply to the course
    const found_student=await student.findById("66b192daa8fbc20e519fb442")
    //?2.after that we are going to find the course that is user want to apply to
    const found_course=await course.findById("66b1906e3834f288ddb5ed8f")
    //?3.Apply to the course(1.update the students enrolled courses 2.update the enrolledstudents on course)
    //?4.push the course found into the students enrolledcourses field
found_student.enrolledCourses.push(found_course._id)
//?5 push the students found into the courses enrolledstudents field
found_course.enrollStudents.push(found_student._id)
//resave the students and course docs
await found_student.save();
await found_course.save();
console.log(found_student)
console.log(found_course)}
catch(error){
    console.log(error)
}

}
applytocourse()
// Start the server
app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
});
