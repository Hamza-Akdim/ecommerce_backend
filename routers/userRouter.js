const express = require("express");
const router = express.Router();
const {getOneUser} = require("../controllers/userControllers");
const {userById} = require("../middlewares/user");
const {requireSignIn, isAuth} = require("../middlewares/auth");


router.get("/profile/:userId", requireSignIn, isAuth, getOneUser)
router.param("userId", userById) // it is executed whenever a URL parameter named "userId" is set in a route, the userById middleware function is called before moving on to the route handler. This middleware is responsible for getting the user from the database based on the provided userId parameter and attaching it to the request object for further processing by the route handler.


module.exports = router