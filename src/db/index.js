const mongoose = require("mongoose");


// Create database connection
mongoose.connect("mongodb+srv://BryanButz:Password@cluster0-ag1c7.mongodb.net/checkbookDB?retryWrites=true&w=majority", 
    { useNewUrlParser: true,
      useUnifiedTopology: true
     })

//Create Schema
const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  account: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [ 
      "Uncategorized", 
      "Income", 
      "Charity", 
      "Housing", 
      "Utilities", 
      "Food", 
      "Transportation", 
      "Clothing", 
      "Medical/Health", 
      "Personal", 
      "Recreation", 
      "Debts" ],
      default: "Uncategorized"
  },
  subcategory: { type: String, required: false },
},
  { timestamps: true },
);

const accountSchema = new mongoose.Schema ({
  name: { type: String },
  startingBalance: { type: Number, default: 0 },
  currentBalance: { type: Number, default: 0 },
},
  { timestamps: true},
)

//Create mongoose data models
const LedgerItem = mongoose.model("Transaction", transactionSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { LedgerItem, Account}