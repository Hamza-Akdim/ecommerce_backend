exports.userSignUpValidator = (req,res,next) => {
    req.check("name","Name is required !").notEmpty() // the function check() just select the field and return the message if the feld is Empty

    req.check("email","Email is required !").notEmpty().isEmail()

    req.check("password","Password is required !")
       .notEmpty()
       .isLength({min:6,max:15})
       .withMessage("Password must be between 6 and 10 characters")
       
    const errors = req.validationErrors()

    if (errors) {
        let err = []
        errors.forEach(element =>{
            err.push(element.msg)
        })

        return res.status(404).send(err)
    }

    next()
}


