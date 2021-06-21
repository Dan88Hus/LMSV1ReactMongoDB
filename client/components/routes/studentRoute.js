import { useEffect, useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'


const StudentRoute = ({children, showNav = true}) => {
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
    {!ok ? (<h1 className="text-center">Museet be LOGIN</h1>) : 
    
    <div className="container-fluid">
        {children}
    </div>
    }
    </>
    ) 
}
export default StudentRoute