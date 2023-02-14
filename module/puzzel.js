const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const student = new Schema({
    queimage: String,
    level: String,
    ans: String,
    categeryname: { type: mongoose.Schema.Types.ObjectId, ref: "category" }
});
const puzzle = mongoose.model('puzzel', student);

module.exports = puzzle;
