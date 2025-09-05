const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const bcrypt = require("bcrypt");

const createToken = (id)=>{
    return jwt.sign({id} , process.env.SECRET_TOKEN_JWT , {expiresIn : "7d"})
}

const signUp = async (req , res)=>{

    const {firstname , lastname , password , email} = req.body;
    try{
         if(!firstname || !lastname || !email) res.json({succeed : false , mess:"All fields are required"});

    if(!password || password.length < 6) res.json({succeed: false , mess:"The password must be at least 6 charecters"});

    const isUserExist = await User.findOne({email}) ;

    if(isUserExist) res.json({succeed : false , mess:"This email is already in use go and sign in"});

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password , salt) ;

    
    const newUser = await User.create({firstname , lastname , email , password:hash});

    res.json({succeed : true , mess:"The user is signed up" , user : newUser});

    }

    catch(err){
        res.status(401).json({succeed : false , err})
    }

}

const signIn = async (req , res )=>{
    const {email , password} = req.body ;
    try{

        const isUserExist = await User.findOne({email}) ;
        
        if(!isUserExist) res.json({succeed : false , mess:"This email is not exist go and sign up"});
        
        if(isUserExist.email === email){
            const match = bcrypt.compare(password , isUserExist.password);
            
            if(match) {
                const token = createToken(isUserExist._id);
                
                res.cookie("jwt" , token , {httpOnly : true , maxAge: 1000 * 60 * 60 * 24 * 7});
                
                res.json({succeed : true , mess:"The user is logged in"});
            }
            
            else res.json({succeed : false , mess:"Enter a valid password"});
        }
    }
    catch(err){
        res.json({succeed : false , err});
    }
}

const logOut = (req , res)=>{
    res.cookie("jwt" , "" ,{ maxAge : 0});
    res.json({succeed : true , mess:"The user log out"})
}

module.exports = {signIn , signUp , logOut} ;