import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';

function NewAccount(props) {
    const [newAccount, setNewAccount] = useState({
        name: "",
        startingBalance: 0,
        currentBalance: 0
    });

function handleChange(event) {
    const {name, value} = event.target;

    setNewAccount(prevAccount => {
        return {...prevAccount, [name]: value};
    })
}

function addNewAccount() {
    newAccount.startingBalance = parseFloat(newAccount.startingBalance);
    newAccount.currentBalance = parseFloat(newAccount.startingBalance);
    
    props.onAdd(newAccount);
    setNewAccount({
        name: "",
        startingBalance: 0,
        currentBalance: 0
    })
    props.onSubmit();
}

    return (
        <div className="row accountRows new-account-row">
            <div className="col-lg-5 accounts-column"><input onChange={handleChange} className="new-account-input" name="name" type="text" placeholder="Account Name"></input></div>
            <div className="col-lg-5 accounts-column right-align"><input onChange={handleChange} className="new-account-input" name="startingBalance" type="text" placeholder="Starting Balance"></input></div>
            <div className="col-lg-2 accounts-column"><button className="btn btn-xs btn-mini add-account-btn" title="Add Account" onClick={addNewAccount}><AddIcon /></button></div>
        </div>
    )
}

export default NewAccount;