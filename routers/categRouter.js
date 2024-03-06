const express = require("express");
const router = express.Router();
const {createCategory, showCategory, updateCategory, deleteCategory} = require("../controllers/categoryController");
const {requireSignIn,isAuth, isAdmin} = require("../middlewares/auth");
const {userById} = require("../middlewares/user")

router.post("/create/:userId",[requireSignIn,isAuth, isAdmin],createCategory); //"[ ]" are optional
router.param("userId",userById)

router.get("/show/:userId/:categoryId",[requireSignIn,isAuth,isAdmin],showCategory)

router.put("/update/:userId/:categoryId",[requireSignIn,isAuth, isAdmin],updateCategory)

router.delete("/delete/:userId/:categoryId",[requireSignIn,isAuth, isAdmin],deleteCategory)

module.exports = router;