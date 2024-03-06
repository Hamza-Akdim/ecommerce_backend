const User = require("../models/userModels");

exports.userById = async (req, res, next, id)=> {
    const user = await User.findById(id)
    if(!user)
        return res.status(404).json({message : "The user is not found"})

    req.profile = user //create a new attribute called "profile" within the req Object
    next()  
}