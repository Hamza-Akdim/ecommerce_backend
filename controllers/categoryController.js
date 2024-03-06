const Category = require("../models/categoryModel");
const _ = require("lodash");

exports.createCategory = async (req,res) => {
    const category = new Category(req.body)
    try {
        const savedCategory = await category.save()
        res.status(200).json(savedCategory)
    } catch (err) {
        res.status(404).json({error : err})
    }   
}

exports.showCategory = async (req,res)=>{
    const category = await Category.findById(req.params.categoryId)

    if (!category)
        return res.status(404).json({error : "This category doesn't exist"})

    return res.status(200).json({category})
}   

exports.updateCategory = async (req,res)=>{
    let category = await Category.findById(req.params.categoryId)
    category = _.extend(category,req.body)
    console.log(req.body)
    try {
        category.save()
        return res.status(200).json(category)
    } catch (err) {
        console.log("The category won't be updated")
        return res.status(404).json({error : err})
    }   
}


exports.deleteCategory = async (req,res)=>{
    try {
        let result = await Category.deleteOne({"_id" : req.params.categoryId})
        if(result.deletedCount == 0)
            return res.status(404).json({error : "This category is not found !"})
        
        return res.status(200).json({message : "The category is deleted successfully"})
    } catch (error) {
        return res.status(404).json({message : "There is a  problem. The category won't be deleted !"})
    }
}

