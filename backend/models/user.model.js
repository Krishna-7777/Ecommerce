const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email:  String, 
  password:  String,
  name:  String
});

const UserModel = mongoose.model('User', schema);

module.exports = UserModel;
