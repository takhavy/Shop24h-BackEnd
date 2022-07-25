const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const order = new Schema({
    _id: mongoose.Types.ObjectId,
    orderDate: {
        type: Date,
        default: Date.now()
    },
    shippedDate: Date,
    note: String,
    orderDetail: Array,
    cost: {
        type: Number,
        default: 0
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("order", order)