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
username:{
    type:String,
    required:[true,'please username is required'],
    unique:true,
    minLength:3,
    maxLength:10,

},
email:{
    type:String,
    required:[true,'please email is required'],
    // unique:true,
    // minLength:3,
    // maxLength:10,
    match:/@/,
},
age:{
    type:Number,
    required:[true,'please age is required'],
   min:18,
   max:68,
},
gender:{
    type:String,
   enum:['male','female','other'],//value must be match with this value if the user give other option it throw a error,
   default:"other"//if the user do not select anything then this is a default value for user
}
},{
    //Additional configuration
    timestamps:true,//by default it is false
});

// compile the schema to form the model
const user = mongoose.model("First_users", userprofile);
const user_Doc=async()=>{
    try{
        const userCreated=await user.insertMany({
            gender:"male",
            username:"masyn",
            email:"gsaikt@gh",
            age:18
        })
        console.log('user created')
    }
    catch(error){
        console.log(error)
    }

}
user_Doc()


app.listen(port, () => {
    console.log("server started running on port " + port);
});




