const Task = require("../models/taskModel");

const addNewTask =async (req , res)=>{
    const {category , task} = req.body ; 

    if(!category || !task) return res.json({succeed:false , mess:"All fields are required"})

    if(category !== "work" && category !== "personal") return res.json({succeed:false , mess:"The category should be work or personal litterly"})

    const task1 = {  category , task , userId:req.user._id}
    try{
        const newTask = await Task.create(task1) ;
        res.json({succeed : true , mess:"The task add it correctly" , task:newTask});
    }
    catch(err){
        res.json({succeed : false , err});
    }
}

const deleteTask = async (req ,res)=>{
    const id = req.params.taskid ;
    try{
        const task = await Task.findByIdAndDelete({_id : id});
        res.json({succeed : true , mess:"The Task delete it correctly" , task});
    }
    catch(err){
        res.json({succeed : false , err});
    }
}

const updateTask = async(req , res)=>{
      const id = req.params.taskid ;
      const {task} = req.body;
    try{
        const task1 = await Task.findByIdAndUpdate({_id : id} ,{task} , {new:true});
        res.json({succeed : true , mess:"The Task delete it correctly" , task1});
    }
    catch(err){
        res.json({succeed : false , err});
    }
}
const makeTaskCompleted = async(req , res)=>{
      const id = req.params.taskid ;
      const {completed} = req.body;
    try{
        const task1 = await Task.findByIdAndUpdate({_id : id} ,{completed} , {new:true});
        res.json({succeed : true , mess:"The Task delete it correctly" , task1});
    }
    catch(err){
        res.json({succeed : false , err});
    }
}
const getTasks = async(req , res)=>{
    const {_id} = req.user ;
     try{
        const tasks = await Task.find({userId : _id});
        res.json({succeed : true , tasks})
     }
     catch(err){
         res.json({succeed : false , err});
     }
}
const getWorkTasks = async(req , res)=>{
    const {_id} = req.user ;
     try{
        const tasks = await Task.find({userId : _id , category : "work"});
        res.json({succeed : true , tasks})
     }
     catch(err){
         res.json({succeed : false , err});
     }
}
const getPersonalTasks = async(req , res)=>{
    const {_id} = req.user ;
     try{
        const tasks = await Task.find({userId : _id , category : "personal"});
        res.json({succeed : true , tasks})
     }
     catch(err){
         res.json({succeed : false , err});
     }
}
const getCompletedTasks = async(req , res)=>{
    const {_id} = req.user ;
     try{
        const tasks = await Task.find({userId : _id , completed:true});
        res.json({succeed : true , tasks})
     }
     catch(err){
         res.json({succeed : false , err});
     }
}

module.exports = {addNewTask , deleteTask , updateTask , getTasks , getWorkTasks , getPersonalTasks , getCompletedTasks ,  makeTaskCompleted} ;