import React, { useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Transaction from "./Transaction";
import Accounts from "./Accounts";
import NewTransaction from "./NewTransaction";
import TransactionHeading from "./TransactionHeadings";
import NewAccount from "./NewAccount";
let runningBalance = 0;

function App() {
  
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [Transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  

  function addingAccount() {
    setIsAddingAccount(!isAddingAccount);
  }

  function resetIsAddingAccount() {
    setIsAddingAccount(false);
  }

  function addAccount(newAccount) {
    accounts.push(newAccount);
    setAccounts(prevAccounts => {
      return [...prevAccounts];});
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
