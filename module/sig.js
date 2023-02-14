const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const student = new Schema({
  name:String,
  email: String,
  password: String
});
const sign = mongoose.model('signup',  student);
module.exports = sign;