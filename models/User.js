const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, unique: true },
    password: { type: String, },
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)