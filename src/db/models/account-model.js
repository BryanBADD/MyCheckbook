const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema ({
    name: { type: String },
    startingBalance: { type: Number, default: 0 },
    currentBalance: { type: Number, default: 0 },
},
    { timestamps: true},
)

module.exports = mongoose.model("Account", Account);