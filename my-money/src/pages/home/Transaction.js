import { useFirestore } from "../../hooks/useFirestore";


export default function Transaction({documents}) {
    
    console.log(documents)
    const {deleteDocument} = useFirestore("transactions");
    return (

        <div>
            <ul>
            {documents.map(doc=>(
                <li key={doc.id}>
                <p>{doc.name}  {doc.amount}</p>
                <button onClick={()=>deleteDocument(doc.id)}>X</button>
                </li>
            ))}
            </ul>
        </div>
    )
}
