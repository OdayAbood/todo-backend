const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req , res , next)=>{
    const token = req.cookies.jwt; 

    try{
        
        if(!token) return res.status(401).json({succeed : false , mess:"Authrized token is required"})
            
            const {id} = jwt.verify(token,"SecretJson12345#$%webtokensnalgnljajsfiormfvnchajga2435@$@%awqrafa");
            
            const user = await User.findOne({_id : id});
            
            if(!user) return res.status(401).json({seucceed : false , mess:"You should be signed in"});
            
            req.user = user ;
            
            // res.status(200).json({succeed : true , mess : "The token is valid"});
            
            next();
        }
        catch(err){
            res.status(401).json({succeed : false , err});
        }
}

module.exports = requireAuth ;