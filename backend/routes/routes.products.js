const express = require("express");
const ProductModel = require("../models/product.model");

const productRouter = express.Router()

productRouter.get("/list/products",async(ask, give)=>{
    try {
        let category=ask.query.categoryId || "64bfe5814b7689bd9269238f";
        let data = await ProductModel.find({category},{title:1,price:1})
        give.send(data)
    } catch (error) {
        give.send({ msg: "Error occured while lisitng the products of a particular category !", error: "Internal Server Error" })
    }
})

module.exports = {
    productRouter
}
