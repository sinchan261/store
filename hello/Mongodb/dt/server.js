
const express=require("express");
const { default: mongoose } = require("mongoose");
const app=express();
mongoose.connect("mongodb+srv://gsaikat719:EAKmdPcUE7dHqdoz@change.6c0qy.mongodb.net/?retryWrites=true&w=majority&appName=Change").then(()=>{
    console.log("mongodb is connected")
}).catch((error)=>{
    console.log("mongodb is not connected")
})



//!author schema
const authorSchema=new mongoose.Schema({
  name:String,//embedded documents
    
    
},
{timestamps:true}
)
const author=mongoose.model("author",authorSchema)
//!Books schema
const booksschema=new mongoose.Schema({
    title:String,
   author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"author"
   }

},
{timestamps:true}
)
//compile the books schema
const books=mongoose.model("book",booksschema)
const createAuthor=async()=>{
    try{
         const newdoc=await author.create({
              name:"masyntech"
         })
    }catch(error){
        console.log(error)
    }
}
// createAuthor();
const createbook=async()=>{
      try{
      const newbooks=await books.create({
          title:"the light night",
          author:{
            
          }
      })
      }catch(error){

      }

}
app.listen(2000,()=>{
    console.log("server is running")
})