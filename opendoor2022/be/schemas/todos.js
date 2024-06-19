const mongoose = require("mongoose")
const { Schema } = mongoose
const autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/nodejjang");
autoIncrement.initialize(connection);


const todoSchema = new Schema({

    todoId: Number,
    userId: String,
    content: String,
    checked: { type: Boolean, default: false },
    createdAt: {
        type: String,
        default: Date.now()
    }

})

todoSchema.plugin(autoIncrement.plugin, {

    model: 'todoId',
    field: 'id',
    startAt: 0,
    increment: 1
})
module.exports = mongoose.model('todoSchema', todoSchema);