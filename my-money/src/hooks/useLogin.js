import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";




export const useLogin = () =>{

    const [isComplete,SetIsComplete] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext();



    const login= async (email , password)=>{
        setIsPending(true)
        setError(null)

        try{
            const res = await projectAuth.signInWithEmailAndPassword(email,password)

            
            console.log(res)
            if(!res.user){
                throw Error("Please Check Your Email and Password")
            }
            dispatch({type:"LOGIN",payload:res.user})

            if(!isComplete){
                setIsPending(false)
                setError(null)
            }

        }catch(err){
            if(!isComplete){
                setIsPending(false)
                setError(err)
            }
        }


    }
    useEffect(()=>{
        return ()=>{SetIsComplete(true)}
    
},[])

    return {error,isPending,login}

}