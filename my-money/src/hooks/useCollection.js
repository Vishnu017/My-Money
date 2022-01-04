

import  { useEffect, useRef, useState } from 'react'
import { projectFireStore } from '../firebase/config'

const useCollection=(collection,_query , _listingOrder) =>{

    const [documents, setDocuments] = useState("")
    const [error, setError] = useState(null)

    let query = useRef(_query).current

    let listingOrder = useRef(_listingOrder).current

    useEffect(()=>{
        let ref =  projectFireStore.collection(collection)


        if(query){
            ref= ref.where(...query)
        }

        if(listingOrder){
            ref = ref.orderBy(...listingOrder)
        }
        const unsubscribe = ref.onSnapshot((snapshot)=>{
            const results=[]
            console.log(snapshot)
            snapshot.docs.forEach(doc=>{
                results.push({...doc.data(),id:doc.id})
            })
            setDocuments(results)
            
        },(err)=>{
            console.log(err)
            setError("Could Not Fetch")
        })

        return ()=>unsubscribe();

    },[collection,query,listingOrder])
    
    return {documents,error}
}

export default useCollection

