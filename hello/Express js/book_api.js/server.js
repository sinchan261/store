const express = require('express');
const port = 3002;
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Sample book data
const book = [
  { id: "1", title: 'The Great Gatsby', author: 'F. Scott' },
  { id: "2", title: 'Moby Dick', author: 'Herman Melville' },
  { id: "3", title: 'The MERN Stack', author: 'Masynatech' }
];

// Welcome route
app.get('/', (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to my first book API using Express",
    data: "masyntech",
    date:"15.07.2024"
  });
});

// Get all books
app.get('/book', (req, res) => {
  res.json({
    status: "success",
    message: "Books fetched successfully",
    data: book
  });
});

// Fetch a book by ID
app.get('/book/:id', (req, res) => {
  const id = req.params.id;
  const bookfind = book.find(book => book.id === id);
  
  if (!bookfind) {
    return res.json({
      status: 'failed',
      message: 'Book not found',
      data: `Book with id ${id} not found`
    });
  } else {
    res.json({
      status: "success",
      message: "Book fetched successfully",
      data: bookfind
    });
  }
});

// Create a book
app.post("/book", (req, res) => {
  const newBook = req.body;
  book.push(newBook);
  res.json({
    status: "success",
    message: "Book created successfully",
    data: book
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
/*const express=require(`express`)
const port=3002
const app=express()
//!receiving incoming from the client configuration
app.use(express.json)
//this is a use middleware
const book=[
    {id:"1",title:'the great Gatsby',author:'f.scott'},
    {id:"2",title:'the moby dic',author:'herman'},
    {id:"3",title:'The mern stack',author:'Masynatech'}

]
app.get('/',(req,res)=>{
    res.json({
        status:"success",
        message:"welcome to my first book api using express",
        data:"masyntech"
    })
 
})
app.get('/book',(req,res)=>{
    res.json({
        status:"success",
        message:"Books fetched successfuly",
        data:book
    })
})
//fetch a book
app.get('/book/:id',(req,res)=>{
    const id=req.params.id
    const bookfind=book.find((book)=> book.id===id)
    console.log(bookfind)
    console.log(req.params.id)
    if(!bookfind){
        return res.json({
            status:'failed',
            message:'book not found',
            message:`Book with id ${id} not find `
        })
    }
    else
{res.json({
        status:"success",
        message:"Books fetched successfuly",
        data:bookfind
    })}
    //* Create a book

   
})
app.post("/book",(req,res)=>{
    console.log(req.body)
    const newpost=req.body
    book.push(newpost)
    res.json({
        status:"success",
        message:"books created successfully",
        data:book
    })
})
app.listen(port,console.log(`Server is running on port ${port}`))*/