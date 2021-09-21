const mongoose = require("mongoose");
const { Schema } = mongoose;
const opendoorSchema = new Schema({
    testId: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    card1: {
        type: String,
    },
    card2: {
        type: String,
    },
    card3: {
        type: String,
    },
    card4: {
        type: String,
    },
    problem1: {
        type: String,
    },
    problem2: {
        type: String,
    },
    solution1: {
        type: String,
    },
    pw: {
        type: Number,
    },
});
module.exports = mongoose.model("opendoor", opendoorSchema);
