const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaction = new Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    account: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: false },
},
    { timestamps: true },
);

module.exports = mongoose.model("Transaction", Transaction);
