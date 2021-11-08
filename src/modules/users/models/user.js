import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required!"],
    },
    lastName: {
        type: String,
        required: [true, "lastname is required!"],
    }
});

const user = mongoose.model("user", userSchema);

module.exports = user;