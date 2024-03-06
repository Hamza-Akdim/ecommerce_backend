const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressValidator = require("express-validator"); // the version that is installed is 5
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const categRouter = require("./routers/categRouter");
const prodRouter = require("./routers/prodRouter");
const cookieParser = require("cookie-parser");

require("dotenv").config(); //Access to the environment variables in the "env" file
mongoose.connect(process.env.DB_URL)
        .then(()=>console.log("Database is connected ..."))
        .catch(()=>console.error("Database could not connect"))
//Middleware 
app.use(express.json());
app.use(expressValidator());
app.use(cookieParser());


//Routes
app.use("/api/auth",authRouter);
app.use("/api/category", categRouter);
app.use("/api/user",userRouter);
app.use("/api/product",prodRouter);



const port = process.env.PORT || 3000
app.listen(port,()=>console.log("The app is running on port "+port))    