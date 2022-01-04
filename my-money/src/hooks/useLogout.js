import {  useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"



export const useLogout = ()=>{
    const [isComplete,SetIsComplete] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext();
    

    const logout = async ()=>{
        setError(null)
        setIsPending(true)

        try{
            const res = await projectAuth.signOut();
            console.log(res)
          
            dispatch({type:"LOGOUT"})


            if(!isComplete){
                setIsPending(false)
            }
        }catch(err){
            if(!isComplete){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
  
    }
    useEffect(()=>{
        return ()=>{SetIsComplete(true)}
    
},[])

    return {error,isPending,logout}
}


