const express = require("express");
const router = express.Router();
const {createProduct, showProduct, updateProduct, deleteProduct} = require("../controllers/productController");
const {requireSignIn,isAuth, isAdmin} = require("../middlewares/auth");
const {uploadPhoto,productById} = require("../middlewares/product");
const {userById} = require("../middlewares/user")

router.post("/create/:userId",[requireSignIn,isAuth, isAdmin],uploadPhoto,createProduct); //"[ ]" are optional
router.param("userId",userById);

router.get("/show/:productId",requireSignIn,showProduct);
router.param("productId",productById);

router.put("/update/:userId/:productId",[requireSignIn,isAuth, isAdmin], uploadPhoto, updateProduct);

router.delete("/delete/:userId/:productId",[requireSignIn,isAuth, isAdmin],deleteProduct);


module.exports = router;