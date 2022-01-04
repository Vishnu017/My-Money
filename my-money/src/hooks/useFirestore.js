import { useEffect, useReducer, useState } from "react"
import { projectFireStore, timestamp } from "../firebase/config"


let initialState={
    document:null,
    isPending:false,
    success:false,
    error:null
}
const firestoreReducer = (state,action) => {

    switch(action.type){
        case "PENDING":{
            return {...state,isPending:true}
        }
        case "ADDED_DOCUMENT":{
            return { doc:action.payload,error:null,isPending:false,success:true}
        }
        case "DELETED_DOCUMENT":{
            return  { ...state,error:null,isPending:false,success:true}
        }
        case "ERROR":{
            return {...state,error:null,isPending:false,success:false}
        }
        default:
            return {...state}
    }
}

export  const useFirestore=(collection) =>{

    
    const [isCancelled, setIsCancelled] = useState(false)   
    const [response,dispatch]=useReducer(firestoreReducer,initialState)

    const ref = projectFireStore.collection(collection)

    const dispatchIfNotCancelled = (action)=>{
        if(!isCancelled){
            dispatch(action)
            console.log(action)
        }
    }

    const addDocument = async (doc)=>{
        dispatch({type:"PENDING"})

        try{
            const createdAt  = timestamp.fromDate(new Date());
           const addedDocumentId= await ref.add({...doc,createdAt})
           
           dispatchIfNotCancelled({type:"ADDED_DOCUMENT",payload:addedDocumentId})
        }catch(err){
            dispatchIfNotCancelled({type:"ERROR"})
        }

    }

    const deleteDocument = async(id) =>{

        dispatch({type:"PENDING"})

        try{

            await ref.doc(id).delete()
            dispatchIfNotCancelled({type:"DELETED_DOCUMENT"})

        }catch(err){
            dispatchIfNotCancelled({type:"ERROR"})
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
      }, [])

    return {response , addDocument , deleteDocument }
}
