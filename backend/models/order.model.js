const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    product: mongoose.Types.ObjectId,
    quantity: Number
})

const schema = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    total: Number,
    items: [itemSchema],
    date: { type: Date, default: Date.now() }
});

const OrderModel = mongoose.model('Order', schema);

module.exports = OrderModel;
