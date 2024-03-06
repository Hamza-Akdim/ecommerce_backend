const express = require("express");
const router = express.Router();
const {signUp,signIn,signOut} =require("../controllers/authControllers");
const {userSignUpValidator} = require("../middlewares/userValidator");

router.post("/signUp",userSignUpValidator,signUp)

router.post("/signIn",signIn)

router.get("/signOut",signOut)

module.exports = router