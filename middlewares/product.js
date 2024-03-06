const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Product = require("../models/productModel");

exports.uploadPhoto = (req,res,next)=>{
    const storage = multer.diskStorage({
        destination : (req,file,cb)=>{
            cb(null,path.join(__dirname,"../images"))
        },
        filename : (req,file,cb)=>{
            cb(null, Date.now() + path.extname(file.originalname)) // Using path.extname() to retain the original file extension (.jpg, .png ...)
        }
    })
    
    const upload = multer({storage}).single("image") //{storage} is equale to {"storage" : storage} in JavaScript. //"image" is the file's input. // single() is a middleware that get only a single file       
    
    upload(req, res, err => {
        if (err){
            console.log(err)
            return res.status(404).json({error : "Your photo won't be uploaded"})
        }
        next()  
    })
}


exports.productById = async(req,res,next,id)=>{ // always "id" comes after "next"
    const product = await Product.findById(id) 
    if (!product)
        return res.status(404).json({error : "product not found!"})

    req.product = product
    next()
}