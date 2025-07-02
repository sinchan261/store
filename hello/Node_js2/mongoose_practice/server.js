const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const url="mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1";
mongoose.connect(url).then((e)=>{
    console.log(e);
}).catch((e)=>{
    console.log(e)
})
const courseSchema=new Schema ({
    Course:String,
    Student_name:[String],
    Fees:Number,
    enrolled_student:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student1',
    }]

})
const course=mongoose.model('course1',courseSchema)
const studentSchema=new Schema({
    name:String,
    
    enrolled_cour:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course',
    }]
})
const student=mongoose.model('student1',studentSchema)

//create courses
// const create=async()=>{
//     const store=await course.create({
//         Course:'bengali',
//         Student_name:['saikat','mainak'],
//         Fees:500,
//     })
//     console.log(store)

// const store1=await student.create({
//     name:'sinchan',
    
// })
// console.log(store1)
// }
// create();
const apply = async () => {
    try {
        const found_stu = await student.findById('66c00860fa88dd12616444e1');
        const found_course = await course.findById('66c00746afa4b2ab1855057f');

        if (found_stu && found_course) {
            found_stu.enrolled_cour.push(found_course._id);
            found_course.enrolled_student.push(found_stu._id);

            await found_stu.save();
            await found_course.save();

            console.log('Enrollment updated successfully.');
        } else {
            console.log('Student or Course not found.');
        }
    } catch (e) {
        console.error("Error during enrollment update:", e);
    }
}

apply();