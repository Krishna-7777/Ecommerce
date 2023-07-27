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

orderRouter.get('/list', async (ask, give) => {
    try {
        let data = await OrderModel.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(ask.user) } },
            {
                $project: {
                    date: 1,
                    total: 1,
                    totalQuantity: { $sum: '$items.quantity' }
                }
            }
        ]);
        give.send(data)
    } catch (error) {
        give.send({ msg: "Error occured while listing your orders !", error: "Internal Server Error" })
    }
})

orderRouter.get('/detail/:id', async (ask, give) => {
    try {
        let data = await OrderModel.aggregate([
            {
              $match: {
                user: new mongoose.Types.ObjectId(ask.user),
                _id: new mongoose.Types.ObjectId(ask.params.id)
              }
            },
            {
              $unwind: '$items'
            },
            {
              $lookup: {
                from: 'products',
                localField: 'items.product',
                foreignField: '_id',
                as: 'productDetails'
              }
            },
            {
              $unwind: '$productDetails'
            },
            {
              $group: {
                _id:"$_id",
                total: { $first: '$total' },
                date: { $first: '$date' },
                products: {
                  $push: {
                    _id:'$productDetails._id',
                    product: '$productDetails.title',
                    price: '$productDetails.price',
                    quantity: '$items.quantity'
                  }
                }
              }
            }
          ]);
        give.send(data[0])
    } catch (error) {
        console.log(error)
        give.send({ msg: "Error occured while listing your orders !", error: "Internal Server Error" })
    }
})

module.exports = {
    orderRouter
}
