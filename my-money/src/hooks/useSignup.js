import { useState,useEffect } from "react";
import { projectAuth } from "../firebase/config";


const useSignup =()=>{

    const [isComplete,SetIsComplete] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const signup = async (email,password,displayName)=>{
        setError(null)
        setIsLoading(true)

        try{
            const res = await projectAuth.createUserWithEmailAndPassword(email,password);

            if(!res){
                throw new Error("User was not created")
            }

            console.log(res.user)

            await res.user.updateProfile({displayName:displayName})
            if(!isComplete){
                setIsLoading(false)
            }
        }catch(err){
            if(!isComplete){
                console.log(err.message)
                setError(err.message)
                setIsLoading(false)
            }
        }
  
    }
    useEffect(()=>{
        return ()=>{SetIsComplete(true)}
    
},[])

    return {error,isLoading,signup}
}

export default useSignup;