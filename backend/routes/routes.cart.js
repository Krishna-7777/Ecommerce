const express = require("express");
const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");

const cartRouter = express.Router()

cartRouter.get("/", async (ask, give) => {
    try {
        let data = await CartModel.find({ user: ask.user }, { product: 1, quantity: 1 })
        give.send(data)
    } catch (error) {
        give.send({ msg: "Error occured while lisitng your cart !", error: "Internal Server Error" })
    }
})

cartRouter.post("/:productId", async (ask, give) => {

    let product = ask.params.productId
    try {
        let checkProduct = await ProductModel.findById(product, { _id: 1 })
        try {
            let cartItem = new CartModel({
                user: ask.user,
                quantity: 1,
                product
            })
            await cartItem.save()
            give.send({ msg: "Product added to your cart." })
        } catch (error) {
            give.send({ msg: "Error occured while adding a product to your cart !", error: "Internal Server Error" })
        }
    } catch (error) {
        give.send({ msg: "The given Product ID is invalid" })
    }
})


module.exports = {
    cartRouter
}
