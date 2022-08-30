import React from "react"
import {useContext} from "react";
import {TransactionContext} from "../context/Transaction";

const Main = () => {
    const {connectWallet, sendTransaction, handleChange} = useContext(TransactionContext)
    return (
        <div className="mainContainer">
            <div className="cryptContainer">
                <h1 className="title">Crypto Card</h1>
                <button type="button">
                    <p className="buttonText" onClick={connectWallet}>ウォレット連携</p>
                </button>
            </div>
            <div className="inputContainer">
                <input type="text" onChange={e => handleChange(e, "addressTo")} placeholder={"アドレス"}/>
                <input type="number" onChange={e => handleChange(e, "amount")} placeholder={"通貨（ETH)"} name={"amount"} step={0.0001}/>
                <button type={"button"} onClick={sendTransaction}>送信</button>
            </div>
        </div>
    )

}
export default Main

