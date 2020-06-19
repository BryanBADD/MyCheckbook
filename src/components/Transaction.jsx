import React from "react";
let subCategoryLabel = "";

function Transaction(props) {

  const amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.amount);
  const balance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.balance);
  
  
  if (props.subcategory !== "") {subCategoryLabel = ":" + props.subcategory};

  if (props.amount < 0) {
    if (props.balance < 0) {
      return (<div>

        <div className="container transaction-container">
          <div className="row">
            <div className="col-lg-2 transaction-detail ">{props.date}</div>
            <div className="col-lg-6 transaction-detail "> {props.description} </div>
            <div className="col-lg-2 transaction-detail right-align negative-transaction">{amount}</div>
            <div className="col-lg-2 transaction-detail right-align negative-transaction">{balance} </div>
          </div>
    
          <div className="row">
            <div className="col-lg-2 transaction-detail"></div>
            <div className="col-lg-10 transaction-detail"> {props.category}{subCategoryLabel}</div>
          </div>
        </div>
        
        </div>)
    } else {
    return (<div>

      <div className="container transaction-container">
        <div className="row">
          <div className="col-lg-2 transaction-detail">{props.date}</div>
          <div className="col-lg-6 transaction-detail"> {props.description} </div>
          <div className="col-lg-2 transaction-detail right-align negative-transaction">{amount}</div>
          <div className="col-lg-2 transaction-detail right-align">{balance} </div>
        </div>
  
        <div className="row">
          <div className="col-lg-2 transaction-detail"></div>
          <div className="col-lg-10 transaction-detail"> {props.category}{subCategoryLabel}</div>
        </div>
      </div>
      
      </div>)}
  } else { 
    if (props.balance < 0) {
  return ( 
    <div>

    <div className="container transaction-container">
      <div className="row">
        <div className="col-lg-2 transaction-detail">{props.date}</div>
        <div className="col-lg-6 transaction-detail"> {props.description} </div>
        <div className="col-lg-2 transaction-detail right-align">{amount}</div>
        <div className="col-lg-2 transaction-detail right-align negative-transaction">{balance} </div>
      </div>

      <div className="row">
        <div className="col-lg-2 transaction-detail"></div>
        <div className="col-lg-10 transaction-detail"> {props.category}{subCategoryLabel}</div>
      </div>
    </div>
    
    </div>)} else {
      return (<div>

        <div className="container transaction-container">
          <div className="row">
            <div className="col-lg-2 transaction-detail">{props.date}</div>
            <div className="col-lg-6 transaction-detail"> {props.description} </div>
            <div className="col-lg-2 transaction-detail right-align">{amount}</div>
            <div className="col-lg-2 transaction-detail right-align">{balance} </div>
          </div>
    
          <div className="row">
            <div className="col-lg-2 transaction-detail"></div>
            <div className="col-lg-10 transaction-detail"> {props.category}{subCategoryLabel}</div>
          </div>
        </div>
        
        </div>)}
    }
  }
  

  export default Transaction;
