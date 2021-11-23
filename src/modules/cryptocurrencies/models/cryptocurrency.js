import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const cryptocurrencySchema = new Schema({

    id_crypto: {
        type: String,
        required: [true, "id is required!"],
    },
    symbol: {
        type: String,
        required: [true, "symbol is required!"],
    },
    name: {
        type: String,
        required: [true, "name is required!"]
    },
    image: {
        type: String,
        required: [true, "image is required!"]
    },
    last_updated: {
        type: Date,
        required: [true, "last_updated preference is required!"]
    }
})

export const cryptocurrency = mongoose.model("cryptocurrency", cryptocurrencySchema);

module.exports = cryptocurrency;