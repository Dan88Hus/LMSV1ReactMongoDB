import { useEffect, useState, useContext} from 'react'
import {Context} from '../../context/index'
import axios from 'axios'


const UserIndex = () => {
    const {state: {user}, dispatch} = useContext(Context)
    // state
    const [hidden, setHidden] = useState(true)
        useEffect(()=>{
        const fetchUser = async() => {
            try {
                const {data} = await axios.get("/api/current-user")
                console,log("data for fetch user",data)
                setHidden(false)
            } catch (error) {
                console.log(error)
                setHidden(true)
            }
        } 
        fetchUser()     
    },[])

    return (
    <>
    {!hidden && <h1 clasName="text-center">
        {JSON.stringify(user)}
    </h1>}
    </>
    ) 
}
export default UserIndex