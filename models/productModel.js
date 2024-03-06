const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        trim : true,
        maxlength : 60 
    },

    description : {
        type : String,
        require : true,
        maxlength : 3000
    },

    price : {
        type : Number,
        require : true
    },

    quantity : {
        type : Number
    },

    photo : {
        data : Buffer, // this type is for uploading photos
        contentType : String        
    },

    category : {
        type : mongoose.Schema.Types.ObjectId,  // This is the type of the identifiyer object which we want to refer to 
        ref : "Category" // This is the name of the module which you want to refer to 
    },

    shipping : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;