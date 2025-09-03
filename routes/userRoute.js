const express = require("express");

const {signUp , signIn , logOut} = require("../controllers/userController");

const router = express.Router();

router.post("/signup" , signUp );

router.post("/signin" , signIn );

router.get("/logout" , logOut );

module.exports = router ;