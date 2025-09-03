const express = require("express");

const requireAuth = require("../middleware/requireAuth");

const {addNewTask , deleteTask , updateTask , getTasks , getWorkTasks , getPersonalTasks , getCompletedTasks , makeTaskCompleted} = require("../controllers/taskController");

const router = express.Router();

router.use(requireAuth);

router.post("/newtask" , addNewTask);

router.patch("/update/:taskid" , updateTask);

router.patch("/update/complete/:taskid" , makeTaskCompleted);

router.delete("/delete/:taskid" ,deleteTask);

router.get("/tasks" , getTasks);

router.get("/worktasks" , getWorkTasks);

router.get("/personaltasks" , getPersonalTasks);

router.get("/completedtasks" , getCompletedTasks);

module.exports = router ;