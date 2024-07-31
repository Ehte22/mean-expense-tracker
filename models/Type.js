const mongoose = require("mongoose")

const typeSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    type: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model("type", typeSchema)