import React from "react";


function Accounts(props) {
  const balance = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.currentBalance);

  return (
      <div className="row accountRows">
          <div name={props.name} value={props.name} className="col-lg-8 accountsDetail account-link">{props.name}</div>
          <div className="col-lg-4 accountsDetail right-align">{balance}</div>
        </div>
    )
};

export default Accounts;
