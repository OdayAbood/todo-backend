const express = require("express");

const app = express();

const userRoute = require("./routes/userRoute");

const taskRoute = require("./routes/taskRoute");

const cors = require("cors");

require("dotenv").config();

const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const checkIfuser = require("./middleware/checkIfUser");

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}))

mongoose.connect(process.env.MONGODB_URI )
.then(()=>{
    console.log("connected db on" , process.env.MONGODB_URI);
    app.listen(process.env.PORT,()=>{
        console.log("we are listening on port" , process.env.PORT);
    })
})

app.get("/api" , checkIfuser);

app.use("/api/user" , userRoute);

app.use("/api/task",taskRoute);