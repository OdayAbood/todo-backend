const mongoose =require("mongoose");

const taskSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true ,
    },
    category : {
        type : String ,
        required : true  
    },
    task : {
        type : String , 
        required : true ,
    },
    completed : {
        type : Boolean ,
        required : true,
        default : false
    }
})

const Task = mongoose.model("Task" , taskSchema);

module.exports = Task ;