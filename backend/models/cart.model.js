const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user:mongoose.Types.ObjectId,
    product:mongoose.Types.ObjectId,
    quantity:Number
});

const CartModel = mongoose.model('Cart', schema);

module.exports = CartModel;
