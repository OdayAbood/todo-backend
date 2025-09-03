const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const checkIfuser = async (req , res)=>{
    const token = req.cookies.jwt;

    if(!token) return res.json({succeed : false , mess:"There is no user"});

    const {id} = jwt.verify(token , process.env.SECRET_TOKEN_JWT);
    const user =await User.findById({_id : id}).select("-password");

    if(user) return res.json({succeed : true , user});

    return res.json({succeed : false , mess:"There is no user"})

}

module.exports = checkIfuser ;