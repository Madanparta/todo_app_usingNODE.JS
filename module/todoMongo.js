const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema({
    name:String,
    status:Boolean
})

const Todo = mongoose.model("Todo",mongoSchema);

module.exports = Todo;