const mongoose = require("mongoose")
const { Schema } = mongoose
const autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/opendoor");
autoIncrement.initialize(connection);


const userSchema = new Schema({

    userId: String,
    email: String,
    password: String

})

userSchema.plugin(autoIncrement.plugin, {

    model: 'userId',
    field: 'id',
    startAt: 0,
    increment: 1
})
module.exports = mongoose.model('user', userSchema);