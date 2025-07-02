//!single Function export
//!Object export
//!Named Function export
//!using export shorthand

//? single function expor   
 /*const firstname="alice";
    module.exports=firstname;
    const greet=()=>{
    return 'saikat sinchan ghosh'
    }
    const store=greet
    module.exports=store
    
    function add(a,b){
        return a+b;
    
    }
  function sub(a,b){
        return a-b
    }
    module.exports={
        /*add:add,
        sub:sub*/
        //if the key and function name are same
  //      add,sub
  //  }*/
  //!Named Function export
 /* module.exports.sayhi=(name)=>{
    return`hi ${name}`
  };
  module.exports.saybye=function(name){
    return `Goodbye ${name}`
  }*/
 //!using export shorthand
 exports.sayhi=(name)=>{
    return`hi ${name}`
  };
exports.saybye=function(name){
    return `Goodbye ${name}`
  }