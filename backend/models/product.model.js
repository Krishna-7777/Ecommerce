const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:  String, 
    price:  Number, 
    description:  String, 
    category: String,
    image: String,
    approved: {type:Boolean, default:false}
});

const ProductModel = mongoose.model('Product', schema);

module.exports = ProductModel;
