import { useAuthContext } from "../../hooks/useAuthContext"
import useCollection from "../../hooks/useCollection"
import styles from "./Home.module.css"
import Transaction from "./Transaction"
import TransactionForm from "./TransactionForm"


export default function Home() {
    
    const {user}=useAuthContext()
    const {documents,error}= useCollection("transactions",
        ["uid","==",user.uid],
        ["createdAt","desc"]
    )

    return (
        <div className={styles.home}>
            <div className={styles["main-body"]}>
                {error&&<p>{error}</p>}
                {documents&&<Transaction documents = {documents}/>}
            </div>
            <div className="form-body">
                <TransactionForm uid={user.uid}/>
            </div>

        </div>
    )
}
