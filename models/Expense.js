const mongoose = require("mongoose")

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    type: { type: String, reuqired: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    tags: [
        {
            key: { type: String, required: true },
            value: { type: String, required: true }
        }
    ],
    deletedAt: { type: Date, default: null }
}, { timestamps: true })

module.exports = mongoose.model("expense", ExpenseSchema)