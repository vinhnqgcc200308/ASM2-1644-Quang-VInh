const mongoose = require('mongoose');
//const url = "mongodb://localhost:27017/EmployeeDB";
//const url = "mongodb+srv://tmtuan:**************@cluster0.zfovn.mongodb.net/test"
const url = "mongodb+srv://Vinhnq:331924100vV@cluster0.z6yzeoz.mongodb.net/?retryWrites=true&w=majority"
//const url = "mongodb+srv://Vinhnq:331924100vV@cluster0.z6yzeoz.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true},(err) => {
    if(!err){ console.log("MongoDB Connection Succeeded");}
    else{
        console.log("An Error Occured");
    } 
})

require('./toy.model');
