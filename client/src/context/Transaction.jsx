import  { ethers } from "ethers"
import {contractABI, contractAddress} from "../utils/connect";
import {createContext, useEffect, useState} from "react";

export const TransactionContext = createContext(undefined);

// スマートコントラクトの取得
const getSmartContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // ethの送信には、署名が必要。
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log(provider, signer, transactionContract);
    return transactionContract
}




export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("")

    const [inputFormData, setInputFormData] = useState({
        addressTo: "",
        amount: "",
    })

    const handleChange = (e, name) => {
        setInputFormData((prevInputFormData) => ({
            ...
            prevInputFormData,
            [name]: e.target.value
        }))
    }

    // メタマスクウォレットと連携しているのかまず確認しよう
    const checkMetamaskConnect = async () => {
        if(!window.ethereum) return alert("メタマスクをインストールしてください")
        // メタマスクのアカウントIDを取得
        const accounts = await window.ethereum.request ({ method: "eth_accounts"})
        console.log(accounts)
    }

    const connectWallet= async () => {
        if(!window.ethereum) return alert("メタマスクをインストールしてください")
        const accounts = await window.ethereum.request ({ method: "eth_requestAccounts"})
        console.log(accounts[0]);
        setCurrentAccount(accounts[0]);
    }

    // 実際に通過のやりとりをする
    const sendTransaction = async () => {
        if(!window.ethereum) return alert("メタマスクをインストールしてください")
        const {addressTo, amount} = inputFormData
        if(!addressTo || !amount) return ;
        console.log("sendTransaction")
        const transactionContract = await getSmartContract()
        console.log(transactionContract)

        // ethに変換
        const parseAmount = ethers.utils.parseEther(amount)
        const transactionParameters = {
            gas: '0x2710', // 16進数
            to: addressTo, // Required except during contract publications.
            from: currentAccount, // must match user's active address.
            value: parseAmount._hex, // 16しんすう
        };

        // 送信する
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        console.log(txHash)

        const transactionHash = await transactionContract.addBlockChain(
            addressTo,
            parseAmount
        )
        console.log(`ロード中...${transactionHash.hash}`)
        await transactionHash.wait();
        console.log(`送金に成功...${transactionHash.hash}`)
    }

    // ページリロード時
    useEffect(() => {
        checkMetamaskConnect();
    }, [])

    return (
        <TransactionContext.Provider value={ { connectWallet, sendTransaction, handleChange, inputFormData }}>{ children }</TransactionContext.Provider>
    )
}
