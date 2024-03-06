const { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

exports.requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"  //create a new attribute called "auth" within the req Object, this attribute contains information (that were assigned to the token in the playload parameter) about the user who is signed in 
});


//ensure that the one who is signed in is the same one who wants to access to his profile and not another profile, means he is the owner of the profile
exports.isAuth = (req,res,next) => {
    const trueUsre = req.profile && req.auth && req.profile._id==req.auth._id
    if(!trueUsre)
        return res.status(404).json({error : "Access Denied !!"})

    next()
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0)
        return res.status(404).json({error : "Admin Ressource, Access Denied !!"})

    next()
}
