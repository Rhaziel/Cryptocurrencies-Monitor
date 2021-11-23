import mongoose from "mongoose";
const Schema = mongoose.Schema;


const cryptocurrencySchema = new Schema({

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
        type: Object,
        required: [true, "image is required!"]
    },
    last_updated: {
        type: Date,
        required: [true, "last_updated preference is required!"]
    }
})

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required!"],
    },
    lastName: {
        type: String,
        required: [true, "lastname is required!"],
    },
    userName: {
        type: String,
        required: [true, "userName is required!"]
    },
    password: {
        type: String,
        required: [true, "password is required!"]
    },
    currencyPreference: {
        type: String,
        required: [true, "currency preference is required!"]
    },
    cryptocurrencies: {
        type: [cryptocurrencySchema],
        default: []
    }
});

const user = mongoose.model("user", userSchema);

module.exports = user;