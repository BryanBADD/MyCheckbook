// const db = require("../index");
// const account = require("../models/account-model");
// const mongoose = require("mongoose");
// const app = express();
// const bodyParser = require("body-parser");
// const db = require("../index");

// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));



// app.get("/", function(req, res) {
//     Item.find({}, function(err, foundItems) {
//       if (foundItems.length === 0) {
//         Item.insertMany(defaultItems, function(err) {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("Default items successfully added.");
//             res.redirect("/");
//           }
//         })
//       } else {
//         res.render("list", {
//           listTitle: "Today",
//           newListItems: foundItems
//         });
//       }
//     });
//   });