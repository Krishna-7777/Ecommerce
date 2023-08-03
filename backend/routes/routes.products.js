const express = require("express");
const ProductModel = require("../models/product.model");
const { upload } = require("../middlewares/multer.mw");

const productRouter = express.Router()

productRouter.get("/list/products", async (ask, give) => {
    try {
        let category = ask.query.categoryId || "64bfe5814b7689bd9269238f";
        let data = await ProductModel.find({ category, approved: true }, { title: 1, price: 1 })
        give.send(data)
    } catch (error) {
        give.send({ msg: "Error occured while lisitng the products of a particular category !", error: "Internal Server Error" })
    }
})

productRouter.get("/detail/product/:productId", async (ask, give) => {
    try {
        let data = await ProductModel.findOne({ "_id": ask.params.productId, approved: true }, { category: 0 })
        if (data) {
            give.send(data)
        } else {
            give.send({ msg: "Product Not Found!" })
        }
    } catch (error) {
        give.send({ msg: "Please Check the Product id !", error: "Internal Server Error" })
    }
})

productRouter.post('/create/product', upload.single("file"), async (ask, give) => {
    try {
        let { title, price, description, category } = ask.body
        let image = ask.file.path.split('\\')[2]
        let payload={ title, price, description, category, image }
        let product = new ProductModel(payload)
        await product.save()
        give.send({ msg: "Product has been Created" })
    } catch (error) {
        console.log(error)
        give.send({ msg: "Error while creating the product !", error: "Internal Server Error" })
    }
})

productRouter.get("/image/:filename", (ask, give) => {
    try {
        give.sendFile(__dirname + "/image/" + ask.params.filename)
    } catch (error) {
        give.send({ msg: "File Not Found!" })
    }
})

module.exports = {
    productRouter
}
