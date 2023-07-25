const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:  String, 
    price:  Number, 
    description:  String, 
    category: mongoose.Types.ObjectId,
});

const ProductModel = mongoose.model('Product', schema);

module.exports = ProductModel;
