/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

let acctBalance = 0;

function newTransaction(props) {
  const [transaction, setTransaction] = useState({
    date: "",
    description: "",
    amount: "",
    category: "",
    subcategory: "",
    balance: acctBalance
  })
  
  function handleChange(event, ) {
    const {name, value} = event.target;

    setTransaction(prevTransaction => {
      return {...prevTransaction, [name]: value}
    });
  }

  function handleSpend() {
    const amount= 0 - transaction.amount;
    acctBalance = (parseFloat(acctBalance) + parseFloat(amount));
    transaction.balance = acctBalance;
    transaction.amount = amount;
    props.onAdd(transaction);
    setTransaction({
      date: "",
      description: "",
      amount: "",
      category: "",
      subcategory: ""
    })
    props.onSubmit();
  }

  function handleDeposit() {
    if (!transaction.category) {transaction.category = "Uncategorized"};
    props.onAdd(transaction);
    setTransaction({
      date: "",
      description: "",
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
        <div className="col-lg-8 input-column"><input name="category" onChange={handleChange} className="newTransactionInput" value={transaction.category} type="text" placeholder="Category"/></div>
        </div>
    </div>

    <div className="col-lg-2 input-column transaction-icons">
        <div className="row">
          <div className="col-lg-6 input-column right-align"><button title="Deposit Money" className="btn btn-xs btn-mini btn-outline-success" onClick={handleDeposit} id="spend"><AttachMoneyIcon /></button></div>
          <div className="col-lg-6 input-column right-align"><button title="Spend Money" className="btn btn-xs btn-mini btn-outline-danger" onClick={handleSpend} id="deposit"><AttachMoneyIcon /></button></div>
        </div>
      </div>
    </div>
  </div> 
    )
}

export default newTransaction;
