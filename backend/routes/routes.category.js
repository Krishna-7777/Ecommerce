const express = require("express");
const CategoryModel = require("../models/category.model");

const categoryRouter = express.Router()

categoryRouter.get("/category",async(ask, give)=>{
    try {
        let data = await CategoryModel.find()
        give.send(data)
    } catch (error) {
        give.send({ msg: "Error occured while lisitng the categories !", error: "Internal Server Error" })
    }
})


module.exports = {
    categoryRouter
}
