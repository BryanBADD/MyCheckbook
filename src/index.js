import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(
    <App />,
  document.getElementById("root")
);

//TODO: Set up DB connection and convert from data arrays to database useage
//TODO: Add the ability to reconcile accounts
//TODO: Add the ability to view transactions from all accounts at one time
//TODO: Add he ability for a transfer transaction to be added to both involved accounts at the same time
//TODO: Deploy app to Heroku
//TODO: Add ability to delete a transaction
//TODO: Add abiility to edit transactions
//Create a variable to hold running balance
//Before filtering list of transactions, set the running balance to equal the account's starting balance
//When mapping through the filtered list of transactions, add the transaction amount to the running balance
//  set the balance column for the transaction to the running balance
//  set the account's current balance to the last transactions balance
//  set the account's current balance to the last transactions balance
