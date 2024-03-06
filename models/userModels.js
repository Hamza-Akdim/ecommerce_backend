const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true, // it removes spacing if there is in the beginning or in the end 
        maxlength : 50,
        required : true
    },

    email : {
        type : String,
        trim : true,
        maxlength : 50,
        required :true,
        lowercase : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    //the role of a salt in password hashing is to add randomness and uniqueness to hashed passwords, making them more secure against various types of attacks.
    salt : {
        type : String
    },

    about : {
        type : String,
        trim : true
    },

    role : {
        type : Number,
        default : 0 // 1 for the admin and 0 for the user
    },

    history : {
        type : Array,
        default : []
    }
},{timestamps:true}) // "timestamps" allows you to know the time when the document is created or updated


userSchema.pre("save", async function (next) {      //userSchema.pre("save", ...): This line specifies that the middleware function should be executed before saving a document of the schema userSchema. The "save" argument indicates that the middleware should run before the save() method is called on a document.
    if (!this.isModified("password")) return next();
    // Generate a salt
    const salt = await bcrypt.genSalt(12);
    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

const User = mongoose.model('User', userSchema)

module.exports = User
