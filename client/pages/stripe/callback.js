import {useContext, useEffect, useState} from 'react'
import {Context} from '../../context/index'
import axios from 'axios'

const StripeCallback = ()=>{
    const {state:{user}, dispatch} = useContext(Context)

    useEffect(()=>{
        if(user){
            axios.post("/api/get-account-status")
            .then((res)=>{
                // console.log("RESPONSE",res.data)
                dispatch({
                    type:"LOGIN",
                    payload: res.data
                })
                window.localStorage.setItem("user", JSON.stringify(res.data))
                window.location.href = "/instructor"
            })
        }
    },[user])

    return (
        <>

        </>
    )
}
export default StripeCallback