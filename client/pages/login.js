import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {SyncOutlined} from '@ant-design/icons'
import Link from 'next/link'
import {Context} from '../context/index'
import {useRouter} from "next/router"

const login = () => {

    const [email, setEmail] = useState("huseyinozdogan@gmail.com")
    const [password, setPassword] = useState("212121")
    const [loading, setLoading] = useState(false)

    const {state, dispatch} = useContext(Context)
    // console.log("STATE", state)
    
    const {user} = state // const {state: {user}, dispatch} = useContext(Context) de olabilirdi

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
            const {data} = await axios.post(`/api/login`,{
             email, password
            })   
            // console.log("Login response", data)
            dispatch({
                type: "LOGIN",
                payload: data
            })
            // console.log("STATE", state)
            // save to localstorage
            window.localStorage.setItem("user", JSON.stringify(data))

            toast.success("Login successful")
            // redirect user
            router.push("/")
            
            setLoading(false)

        } catch (error) {
            console.log("error in catch", error)
            toast.error(error.response.data)
            setLoading(false)
        }

    }
    return(
        <>
            <h1 className="text-center">Login</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>

                    <input type="text" 
                    className="form-control mb-4 p-2" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter Email" 
                    required
                    />

                    <input type="text" 
                    className="form-control mb-4 p-2" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Password" 
                    required
                    />
                    <br />

                    <button className="btn btn-primary"
                    disabled={!email || !password || loading}
                    type="submit">
                        {loading ? <SyncOutlined spin/> : "Submit"}
                    </button>

                </form>
                <p className="text-center pt-3">
                    Not Registered?{"  "}
                    <Link href="/register" >
                        <a>Register</a>
                    </Link>
                </p>
                <p className="text-center">
                    <Link href="/forgot-password" >
                        <a className="text-gray">Forgot Password</a>
                    </Link>
                </p>
            </div>
        </>
    )
}

export default login