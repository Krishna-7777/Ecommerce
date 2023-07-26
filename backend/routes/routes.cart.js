const express = require("express");
const CartModel = require("../models/cart.model");

const cartRouter = express.Router()

cartRouter.get("/",async(ask, give)=>{
    try {
        let data = await CartModel.find({user:ask.user},{product:1,quantity:1})
        give.send(data)
    } catch (error) {
        give.send({ msg: "Error occured while lisitng your cart !", error: "Internal Server Error" })
    }
})


module.exports = {
    cartRouter
}
