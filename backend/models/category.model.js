const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:String
});

const CategoryModel = mongoose.model('Category', schema);

module.exports = CategoryModel;
