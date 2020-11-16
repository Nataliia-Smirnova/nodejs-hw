const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const usersSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free"
    },
    token: { type: String, default: "" },
})

exports.UserModel = mongoose.model('User', usersSchema)
