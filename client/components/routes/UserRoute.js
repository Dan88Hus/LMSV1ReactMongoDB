import { useEffect, useState, useContext} from 'react'
// import {Context} from '../../context/index'
import axios from 'axios'
import {useRouter} from 'next/router'


const UserRoute = ({children}) => {
    const router = useRouter()

    const [ok, setOk] = useState(false)
        useEffect(()=>{
        const fetchUser = async() => {
            try {
                const {data} = await axios.get("/api/current-user")
                // console.log("data for fetch user",data)
                if(data.ok){
                setOk(true)
                }
            } catch (error) {
                console.log(error)
                setOk(false)
                router.push("/login")
            }
        } 
        fetchUser()     
    },[])

    return (
    <>
    {!ok ? (<h1 className="text-center">Must be LOGIN</h1>) : <>{children}</>}
    </>
    ) 
}
export default UserRoute