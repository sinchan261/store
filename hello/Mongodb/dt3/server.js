
const express=require("express");
const { default: mongoose } = require("mongoose");
const app=express();
mongoose.connect("mongodb+srv://gsaikat719:EAKmdPcUE7dHqdoz@change.6c0qy.mongodb.net/?retryWrites=true&w=majority&appName=Change").then(()=>{
    console.log("mongodb is connected")
}).catch((error)=>{
    console.log("mongodb is not connected")
})



//!create comment under post
const courseschema=new mongoose.Schema({
  name:String,//embedded documents
    enrollco:[{
   type:mongoose.Schema.Types.ObjectId,
   ref:"student"
    }]
    
},
{timestamps:true}
)
//compile the comment schema to form model
const course=mongoose.model("course",courseschema)
//!create post
const studentschema=new mongoose.Schema({
    name:String,
   enrolledst:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"course"
   }]

},
{timestamps:true}
)
//compile the books schema
const student=mongoose.model("student",studentschema)
const createpost=async()=>{
    try{
         const newdoc=await course.create([{
      name:"math101",

         },
         {name:"history101"}
        ]);
    }catch(error){
        console.log(error)
    }

}

// createpost();
//!create comment
const createcomment=async()=>{
      try{
const students=await student.create([
    {name:'alice'},
    {name:'saikat'}
])
console.log(students)
      }catch(error){
      console.log(error)
      }

}
// ????????createcomment()

//!students applyto course
const applytocourse=async()=>{
    try{
  //1.find the student
  //2.find the course
  //3.apply to course(1.update the student enrolled courses
  //2. update the enrolledstudents on course)
  //4push the course found into the students enrolledcourse field
      const foundstudent=await student.findById('67667ce297ead4d0b3eb7c61');
      const foundcourse=await course.findById('67668b597f4fd6e06f58a877')
     foundstudent. enrolledst.push(foundcourse._id)
     foundcourse.enrollco.push(foundstudent._id)
     await foundstudent.save();
     await foundcourse.save();

    }
    catch(error){

    }
}
applytocourse()
app.listen(2000,()=>{
    console.log("server is running")
})