const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const product = new Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    type: {
        type: mongoose.Types.ObjectId,
        ref: "productType",
        required: true,
    },
    imageUrl: {
        type: Array,
        required: true,
    },
    buyPrice: {
        type: Number,
        required: true,
    },
    promotionPrice: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
        required: true,
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

module.exports = mongoose.model("product", product)