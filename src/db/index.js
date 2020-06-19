const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://BryanButz:Password@cluster0-ag1c7.mongodb.net/checkbookDB?retryWrites=true&w=majority", { useNewUrlParser: true })
    .catch(e => {
        console.error("Connection error", e.message)
    });

const db = mongoose.connection;

module.exports = db;