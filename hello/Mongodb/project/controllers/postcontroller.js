const Post = require("../models/post");
const File=require("../models/File")
//Rendering  post form
exports.getPostForm = (req, res) => {
  res.render("newpost", {
    title: "Create post",
    user: req.user,
    success:"",
    error:""
  });
};
exports.createpost = async (req, res) => {
  // console.log(req.body);
  const { title, content } = req.body;
if(!req.files||req.files.length===0){
  return res.render("newpost",{
    title:"Create Post"
   , user:req.user,
   error:"please select an image",
  success:""
  })
}
const images=await Promise.all(req.files.map(async(file)=>{

//save to our database
const newfile=new File({
  url:file.path,
  public_id:file.filename,
  uploaded_by:req.user._id,
});

await  newfile.save();
console.log("new file is::",newfile);
return{
  url:newfile.url,
  public_id:newfile.public_id
}
}))
const newpost=new Post({

  title,
  content,
  author:req.user._id,
  images,
});
await newpost.save();
res.render("newpost",{
  title:"Create post",
  user:req.user,
  error:"",
  success:"post created successfully",
})
console.log("images is :",images);
};

