const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productType = new Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("productType", productType)