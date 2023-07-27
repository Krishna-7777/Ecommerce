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
    let user = ask.user
    let product = ask.params.productId
    try {
        let checkProduct = await ProductModel.find({_id:product}, { _id: 1 })
        if (checkProduct.length) {
            let checkProductInCart = await CartModel.find({ user, product }, { _id: 1 })
            console.log(checkProductInCart)
            if (checkProductInCart.length) {
                give.send({msg:"Product is already added to your cart."})
            } else {
                let cartItem = new CartModel({
                    user,
                    quantity: 1,
                    product
                })
                await cartItem.save()
                give.send({ msg: "Product added to your cart." })
            }
        } else {
            give.send({ msg: "The given Product ID is invalid" })
        }
    } catch (error) {
        console.log(error)
        give.send({ msg: "Error occured while adding a product to your cart !", error: "Internal Server Error" })
    }
})

cartRouter.put("/:cartItemId", async (ask, give) => {
    try {
        let quantity = ask.query.quantity
        if (!quantity || quantity < 1) {
            give.send({ "msg": "`quantity` Query is Required with a value more than 0." })
        } else {
            await CartModel.findByIdAndUpdate(ask.params.cartItemId, { quantity })
            give.send({ msg: "Quantity of the product has been updated " })
        }
    } catch (error) {
        give.send({ "msg": "Cart Id passed is invalid !" })
    }
})

cartRouter.delete("/:cartItemId", async (ask, give) => {
    try {
        await CartModel.findByIdAndDelete(ask.params.cartItemId)
        give.send({ msg: "Product has been deleted from the cart" })
    } catch (error) {
        give.send({ "msg": "Cart Id passed is invalid !" })
    }
})

module.exports = {
    cartRouter
}
