const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const student = new Schema({
  name:String,
  bgimage: String,
  icon: String
});
const final = mongoose.model('category',  student);
module.exports = final;
