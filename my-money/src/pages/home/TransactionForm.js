import { useEffect, useState } from "react"
import {useFirestore} from "../../hooks/useFirestore"
import styles from "./Home.module.css"



export default function TransactionForm({uid}) {

    
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const {response,addDocument }=useFirestore("transactions")

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(name,amount)

        addDocument({name,amount,uid})  
        console.log(response)
    }

    useEffect(()=>{
       if(response.sucess){
        setAmount("")
        setName("")  
       } 
    },[response.sucess])

    return (
    <div className={styles.form}>
    <form onSubmit={handleSubmit}>
        <label>
            <span>Transaction thing</span>
            <input 
            required 
            type="string"
            value={name}
            onChange={(e)=>setName(e.target.value)
            }/>
    
        </label>
        <label>
            <span>Amount </span>
            <input 
            required
            type="number"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            />
        </label>
        <button className="btn">
            Add
        </button>
    </form>
    </div>
    
    )
}


