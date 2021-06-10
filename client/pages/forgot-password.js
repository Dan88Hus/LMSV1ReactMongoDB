import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {SyncOutlined} from '@ant-design/icons'
import Link from 'next/link'
import {Context} from '../context/index'
import {useRouter} from "next/router"

const ForgotPassword = () => {

    const [email, setEmail] = useState("huseyinozdogan@gmail.com")
    const [success, setSuccess] = useState(false)
    const [code, setCode ] = useState("")
    const [newPassword, setNewPassword] = useState("212121")
    const [loading, setLoading] = useState(false)

    const {state: {user}, dispatch} = useContext(Context)
    // console.log("STATE", state)
    

    //router
    const router = useRouter()

    useEffect(()=>{
        if(user !== null){
            router.push("/")
        }
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const {data} = await axios.post(`/api/forgot-password`,{
             email
            })   
            setSuccess(true)
            toast.success("Check your email for secret code")
            // redirect user
            router.push("/login")
            // setLoading(false)
        } catch (error) {
            console.log("error in catch", error)
            toast.error(error.response.data)
            setLoading(false)
            setSuccess(false)

        }

    }
    const handleResetPassword = async()=>{
        e.preventDefault()
        try {
            setLoading(true)
            const {data} = await axios.post("/api/reset-password",{
                email, code, newPassword
            })
            setLoading(false)
        } catch (error) {
            console.log("handleResetPassword Error", error.response.data)
        }
    }
    return(
        <>
            <h1 className="text-center">Forgot Password</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={success? handleResetPassword : handleSubmit}>

                    <input type="email" 
                    className="form-control mb-4 p-2" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter E-mail" 
                    required
                    />
            {success && 
                <>
                <input type="text" 
                    className="form-control mb-4 p-2" 
                    value={code} 
                    onChange={e => setCode(e.target.value)}
                    placeholder="Enter Secret Code" 
                    required
                    />
                    
                    <input type="password" 
                    className="form-control mb-4 p-2" 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter New Password" 
                    required
                    />
                </>
                    }

                    <button className="btn btn-primary"
                    disabled={!email || !newPassword || loading}
                    type="submit">
                        {loading ? <SyncOutlined spin/> : "Submit"}
                    </button>

                </form>

            </div>
        </>
    )
}

export default ForgotPassword