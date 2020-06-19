const React =  require("react");
const express = require("express");
const app = express();
const db = require("../db");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})


let port = process.env.PORT;
    if (port == null || port == "") {
    port = 3000;
  }

  app.listen(port, function() {
    console.log("The server is running on port " + port + ".");
  });