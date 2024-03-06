const Product = require("../models/productModel"); 
const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const _ = require("lodash");


exports.createProduct = (req,res) => {
    //create an instance of product
    let product = new Product(req.body)

    //Data validation
     const schema = Joi.object({
        name : Joi.string().alphanum().required().max(60),
        description : Joi.string().required().max(3000),
        price: Joi.number().required(),
        category : Joi.required()
    })

    const {value, error} = schema.validate(req.body)
     
    if(error)
        return res.status(404).json({error : error.details[0].message})


    if(req.file.size >= Math.pow(10,6))
        return res.status(404).json({error : 'Image must be less than 1Mb in size'})

    // save the image to the database
    product.photo.data = fs.readFileSync(path.join(__dirname, '../images', req.file.filename));
    product.photo.contentType = req.file.mimetype;
    
    product.save()
    .then(() => res.status(200).json({message : "Your product is uploaded successfully"}) )
    .catch((err) => res.status(404).json({error : err}))
}


exports.showProduct = (req,res)=>{
    const product = req.product
    product.photo = undefined
    return res.status(200).json({product})
}

exports.deleteProduct = async (req,res)=> {
    try {
        const result = await Product.deleteOne({"_id" : req.product._id}) // you can also use req.params.productId
        res.status(200).json({message : "The product is deleted successfully"})        
    } catch (err) {
        console.error("Error deleting product:", err)
        res.status(404).json({error : "The product could not be deleted !"})
    }
}

exports.updateProduct = (req,res)=>{
    let product = req.product
    console.log(req.body)
    product = _.extend(product,req.body)

    product.save()
    .then(() => res.status(200).json({message : "Your product is updated successfully"}) )
    .catch((err) => res.status(404).json({error : err}))

}

