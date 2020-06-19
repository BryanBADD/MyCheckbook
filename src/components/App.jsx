import React, { useState } from 'react';
import express from "express";
// import mongoose from "mongoose";
// import _ from "lodash";
import Header from "./Header";
import Footer from "./Footer";
import Transaction from "./Transaction";
import Accounts from "./Accounts";
import NewTransaction from "./NewTransaction";
import TransactionHeading from "./TransactionHeadings";
import NewAccount from "./NewAccount";
import { LedgerItem, Account } from "../db";

const app = express();
// const db = require ("../db/index");



//Get and listen for server port
let port = process.env.PORT;
if (port === null || port === "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("The server is running on port " + port + ".");
});

//Create first account
let firstAccount = new Account({
  name: "",
  startingBalance: 0,
  currentBalance:  0
});

// app.get("/", function(req, res) {
  
//   });

// app.get("/work", function(req, res) {
//   res.render("list", {
//     listTitle: "Work List",
//     newListItems: workItems
//   });
// });

// app.get("/about", function(req, res) {
//   res.render("about");
// });

// app.post("/", function(req, res) {
//   const itemName = req.body.newItem;
//   const listName = req.body.list;

//   const item = new Item({
//     name: itemName
//   });

//   if (listName === "Today") {
//     item.save();
//     res.redirect("/");
//   } else {
//     List.findOne({
//       name: listName
//     }, function(err, foundList) {
//       foundList.items.push(item);
//       foundList.save();
//       res.redirect("/" + listName);
//     });
//   }

// });

// app.get("/:customListName", function(req, res) {
//   const customListName = _.capitalize(req.params.customListName);
//   List.findOne({
//     name: customListName
//   }, function(err, foundList) {
//     if (!err) {
//       if (!foundList) {
//         //Create a new list
//         const list = new List({
//           name: customListName,
//           items: defaultItems
//         });
//         list.save();
//         res.redirect("/" + customListName);
//       } else {
//         //Show an existing list
//         res.render("list", {
//           listTitle: foundList.name,
//           newListItems: foundList.items
//         });
//       }
//     } else {
//       console.log(err);
//     }
//   });

// });

// app.post("/delete", function(req, res) {
//       const checkedItemID = req.body.checkbox;
//       const listName = req.body.listName;

//       if (listName === "Today") {
//         Item.findByIdAndRemove(checkedItemID, function(err) {
//           if (err) {
//             console.log(err);
//           } else {
//             res.redirect("/");
//           }
//         });
//       } else {
//         List.findOneAndUpdate({
//           name: listName
//         }, {
//           $pull: {
//             items: 
//               _id: checkedItemID
//             }
//           }
//         }, function(err, foundList) {
//           if (!err) {
//             res.redirect("/" + listName);
//           };
//         });
//       }
//     });

function App() {
  
  //Get collections from the database
  const existingAccounts = Account.find({}, (err, foundAccounts) => {
    if (foundAccounts.length === 0) {
      firstAccount.name = alert("Give your first account a nickname.");
      firstAccount.startingBalance = alert("What is the current balance of " + firstAccount.name + "?");
      Account.insertOne(firstAccount, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("First account successfully added.");
        }
      })
    } else {
      console.log("There was already at least one account set up");
    }});

  const existingTransactions = LedgerItem.find({}, (err, foundTransactions) => {
    if (err) {console.log(err);
    }
  })

  //Set useStates
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [Transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([existingAccounts]);
  const [accountName, setAccountName] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([existingTransactions]);
  
  //Set running balance for transaction lines
  let runningBalance = 0;
  
  function addingAccount() {
     setIsAddingAccount(!isAddingAccount);
   }

   function resetIsAddingAccount() {
     setIsAddingAccount(false);
   }

   function addAccount(newAccount) {
    //Create new account
    const addedAccount = new Account({
      name: newAccount.name,
      startingBalance: newAccount.startingBalance,
      currentBalance: newAccount.currentBalance
    })
    addedAccount.save();
    //  accounts.push(newAccount);
    //  setAccounts(prevAccounts => {
    //    return [...prevAccounts];});
     setAccountName(newAccount.name);
     changeAccount(newAccount.name);
     }

   function addingTransaction() {
     setIsAddingTransaction(!isAddingTransaction);
   }

   function resetIsAddingTransaction() {
     setIsAddingTransaction(false);
   }

   function addTransaction(newTransaction) {
     Transactions.push(newTransaction);
     setTransactions(prevTransactions => {
       return [...prevTransactions];
     });
     const currentAccount = accounts.filter(account => account.name === newTransaction.account);
     currentAccount[0].currentBalance =  parseFloat(currentAccount[0].currentBalance) + parseFloat(newTransaction.amount);
     changeAccount(newTransaction.account);
   }

   function deleteTransaction(id) {
     setTransactions(prevTransactions => {
       return prevTransactions.filter((indTransaction, index) => {
         return index !== id;
       });
     });
   }

   function deleteAccount(id) {
     setAccounts(prevAccounts => {
       return prevAccounts.filter((indAccount, index) => {
         return index !== id;
       })
     })
   }
  

   function changeAccount(clickedAccountName) {
     setAccountName(clickedAccountName);
     const currentAccount = accounts.filter(account => account.name === clickedAccountName);
     runningBalance = parseFloat(currentAccount[0].currentBalance);
     const newFilteredTransactions = Transactions.filter(transaction => transaction.account === clickedAccountName);
     setFilteredTransactions(newFilteredTransactions);
     console.log(newFilteredTransactions, runningBalance);
    
   }

return (
     <div>
       <Header onAdd={addingTransaction}/>
       <div className="container">
         <div className="row">
           {accounts.length > 0 && 
           <div className="col-lg-8 transaction-column">
             <div className="row accountName">
               <div className="col-lg-6 ">{accountName} Account</div>
               <div className="col-lg-6 vertical-center"><p className="navigation vertical-center" onClick={addingTransaction}>Add Transaction</p></div>
             </div> 
               <TransactionHeading />
               {isAddingTransaction && <NewTransaction
                 account={accountName} 
                 onAdd={addTransaction}
                 onSubmit={resetIsAddingTransaction}
               />}
               {filteredTransactions.map((transaction, index) => {
                 return (
                 <Transaction
                     key={index}
                     id={index}
                     date={transaction.date}
                     description={transaction.description}
                     account={accountName}
                     amount={transaction.amount}
                     category={transaction.category}
                     subcategory={transaction.subcategory}
                     balance={runningBalance}
                     onAdd={addTransaction}
                     onDelete={deleteTransaction}
                 />)})}
             </div>
            }
            
             <div className="col-lg-4 accounts-column">
               <div className="row accountName">
                 <div className="col-lg-6 ">Accounts</div>
                 <div className="col-lg-6 vertical-center"><p onClick={addingAccount} className="navigation vertical-center" >Add Account</p></div>
               </div> 
               <div className="row heading-row">
                 <div className="col-lg-8 column-heading">Account</div>
                 <div className="col-lg-4 column-heading right-align">Balance</div>
                 </div>
                 {isAddingAccount && <NewAccount 
                 onAdd={addAccount}
                 onSubmit={resetIsAddingAccount}
                 />}
                 {accounts.map((account, index) => {
                 return (
                   <Accounts 
                     key={index}
                     id={index}
                     name={account.name}
                     startingBalance={account.startingBalance}
                     currentBalance={account.currentBalance}
                     onAdd={addTransaction}
                     onClick={changeAccount}
                     onDelete={deleteAccount}
                   />)})}
              
             </div>
           </div>
         </div>
       <Footer />
     </div>
   );
}

export default App;
