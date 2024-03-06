const bcrypt = require("bcrypt"); 
const User = require("../models/userModels"); 
const jwt = require('jsonwebtoken');


exports.signUp = async (req,res)=>{    
    console.log(req.body);

    const user = new User(req.body)

    try {
        const savedUser = await user.save()
        res.status(200).send(savedUser)
    } catch (err) {
        res.status(404).send(err.message)
    }
}


exports.signIn = async (req,res)=>{
    //check if the user exist using the email
    const user = await User.findOne({email: req.body.email})
    if(!user)
        return res.status(404).send("This email doesn't exist")

    //compare the password
    const isPassCorrect = await bcrypt.compare(req.body.password,user.password)
    if(!isPassCorrect)
        return res.status(404).send("The password is invalid")

    //create and assign the token to the user
    //"token" is like a ticket that define you when you sign in and give you the authorization to access into your account 
    const token = jwt.sign({"_id":user._id, "role" : user.role}, process.env.JWT_SECRET)
    
    //cookie is a piece of data which is stored by a website on the client browser (means that the website sends the cookie to the cilent browser to be stored there). This cookie is used to identify you whenever you visit the website again. In other word, cookie is used for the authentification purpose, so whenever I visit the website that website can identify me by using the cookie 
    //The name of the following cookie is "token" and is set with a value of token
    res.cookie("token",token,{expire:new Date(Date.now()+8000000)}) //After this date the browser will automatically remove the cookie from its storage. "8000000" is in milliseconds
   
    const {_id, name, email, role} = user
    return res.json({
        "token": token, "user": {_id, name, email, role}
    })
}


exports.signOut = (req,res)=>{
    res.clearCookie("token") //it instructs the client's browser to delete the cookie with the name "token"   

    res.json({message : "user sign out"})

}