const express = require("express");
const OrderModel = require("../models/order.model");
const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");
const { default: mongoose } = require("mongoose");

const orderRouter = express.Router()

orderRouter.post("/", async (ask, give) => {
    try {
        let user = ask.user
        let items = await CartModel.aggregate([{ $match: { user: new mongoose.Types.ObjectId(ask.user) } }, {
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'productDetails'
            }
        }, {
            $unwind: "$productDetails"
        }, {
            $project: {
                quantity: 1,
                price: { $multiply: ['$quantity', '$productDetails.price'] },
                product: 1
            }
        }])
        if (items.length) {
            let total = items.reduce((ac, i) => {
                ac += i.price
                return ac
            }, 0)
            let payload = {
                user, items, total
            }
            let order = new OrderModel(payload)
            await order.save()
            await CartModel.deleteMany({ user })
            give.send({ msg: `Your Order of ${total} has been placed.` })
        } else {
            give.send({ msg: "Your cart is empty." })
        }
    } catch (error) {
        console.log(error);
        give.send({ msg: "Error occured while placing your order !", error: "Internal Server Error" })
    }
})

module.exports = {
    orderRouter
}
