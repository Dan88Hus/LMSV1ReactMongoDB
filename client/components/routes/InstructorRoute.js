import { useEffect, useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import InstructorNav from "../nav/InstructorNav"


const InstructorRoute = ({children}) => {
    const router = useRouter()

    const [ok, setOk] = useState(false)
        useEffect(()=>{
        const fetchInstructor = async() => {
            try {
                const {data} = await axios.get("/api/current-instructor")
                // console.log("data for fetch user",data)
                if(data.ok){
                    setOk(true)
                }
            } catch (error) {
                console.log(error)
                setOk(false)
                router.push("/")
            }
        } 
        fetchInstructor()     
    },[])

    return (
    
    <>
    {!ok ? (<h1 className="text-center">Must be Seller</h1>) : 
    
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <InstructorNav />
            </div>
            <div className="col-md-10">
                {children}
            </div>
        </div>
    </div>
    }
    </>
    ) 
}
export default InstructorRoute