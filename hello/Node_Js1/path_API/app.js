const path= require("path")
console.log(path)
//! path.basename()
//returns the last part of a path

const filename=path.basename("/user/test/file.txt")
//last path is file.txt0q/
console.log(filename)
//!path.dirname()
//give the directory name of path
const dirname=path.dirname("/user/test/file.txt")
console.log(dirname)
//!path.extname()
const extname=path.extname("/user/test/file.js")
console.log(extname)
//!path.join()
//this methods join multiple path segments together

const joinedpath=path.join("/user","test","file.txt")
console.log(joinedpath)
//!path.resolve()
//this methods resolves sequnce of path into an absolute path
const resolve=path.resolve("/user","file.txt","test",)
console.log(resolve)
//!isAbsolute()
//This method determines if a path is an absolute path
const absolute=path.isAbsolute("/user/test")
console.log(absolute)

//!path.parse()
//this one is going to return an object from a path string
const parsed=path.parse("/user/test/file.js");
console.log(parsed)
console.log(parsed.ext)