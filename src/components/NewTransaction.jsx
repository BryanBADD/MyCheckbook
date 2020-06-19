/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

function newTransaction(props) {
  const [transaction, setTransaction] = useState({
    date: "",
    description: "",
    account: "",
    amount: "",
    category: "",
    subcategory: "",
  })
  
  function handleChange(event) {
    const {name, value} = event.target;

    setTransaction(prevTransaction => {
      return {...prevTransaction, [name]: value}
    });
  }

  function handleSpend(event) {
    const amount= 0 - transaction.amount;
    transaction.amount = amount;
    sendTransaction();
  }

  function sendTransaction() {
    if (!transaction.category) {transaction.category = "Uncategorized"};
    transaction.amount = parseFloat(transaction.amount);
    transaction.account = props.account;
    props.onAdd(transaction);
    setTransaction({
      date: "",
      description: "",
      account: "",
      amount: "",
      category: "",
      subcategory: ""
    })
    props.onSubmit();
  }

  return (
  <div className="container transaction-container">
    <div className="row">
      <div className="col-lg-10 input-column">
        <div className="row new-transaction-row">
        <div className="col-lg-2 input-column"><input className="newTransactionInput" name="date" onChange={handleChange} value={transaction.date} type="text" placeholder="Date"/></div>
        <div className="col-lg-8 input-column"><input className="newTransactionInput" name="description" onChange={handleChange} value={transaction.description}type="text" placeholder="Description"/></div>
        <div className="col-lg-2 input-column right-align"><input className="newTransactionInput" name="amount" onChange={handleChange} value={transaction.amount}type="text" placeholder="Amount"/></div>
        </div>

        <div className="row new-transaction-row">
        <div className="col-lg-2 input-column"></div>
        <div className="col-lg-5 input-column"><input name="category" onChange={handleChange} className="newTransactionInput" value={transaction.category} type="text" placeholder="Category"/></div>
        <div className="col-lg-5 input-column"><input name="subcategory" onChange={handleChange} className="newTransactionInput" value={transaction.subcategory} type="text" placeholder="SubCategory"/></div>
        </div>
    </div>

    <div className="col-lg-2 input-column transaction-icons">
        <div className="row">
          <div className="col-lg-6 input-column right-align"><button title="Deposit Money" className="btn btn-xs btn-mini btn-outline-success" onClick={sendTransaction} id="deposit"><AttachMoneyIcon /></button></div>
          <div className="col-lg-6 input-column right-align"><button title="Spend Money" className="btn btn-xs btn-mini btn-outline-danger" onClick={handleSpend} id="spend"><AttachMoneyIcon /></button></div>
        </div>
      </div>
    </div>
  </div> 
    )
}

export default newTransaction;
