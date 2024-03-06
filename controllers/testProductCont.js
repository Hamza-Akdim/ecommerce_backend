const formidable = require("formidable");   
const Product = require("../models/productModel");
const fs = require("fs");

exports.createProductTest = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err, fields, files)=>{
        if(err) res.status(400).json({error : "Image could not ploaded"})

        let product = new Product(req.body)

        console.log(req.body)

        if(fields.photo) {
            product.photo.data = fs.readFileSync(files.photo.filepath)
            product.photo.contentType = files.photo.mimetype
        }

        // save the image to the database
        console.log(product)
        product.save()
        .then(() => res.status(200).json({message : "Your product is uploaded successfully"}) )
        .catch((err) => res.status(404).json({error : "Your product could not be saved"}))
        })
}