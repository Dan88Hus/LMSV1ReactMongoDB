import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {SyncOutlined} from '@ant-design/icons'
import Link from 'next/link'
import {Context} from '../context/index'
import {useRouter} from 'next/router'

const register = () => {

    const [name, setName] = useState("Huseyin Ozdogan")
    const [email, setEmail] = useState("huseyinozdogan@gmail.com")
    const [password, setPassword] = useState("212121")
    const [loading, setLoading] = useState(false)

    const {state: {user}} = useContext(Context)

    const router = useRouter()

    useEffect(()=>{
        if(user !== null){
            router.push("/")
        }
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // console.table({name,email,password})
            setLoading(true)
            const {data} = await axios.post(`/api/register`,{
                name, email, password
            })
            // console.log("Register response", data)
            toast.success("Registration successful")
            setLoading(false)
            router.push("/login")
        } catch (error) {
            console.log("error in catch", error)
            toast.error(error.response.data)
            setLoading(false)
        }

    }
    return(
        <>
            <h1 className="text-center">Register</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="text" 
                    className="form-control mb-4 p-2" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter Name" 
                    required
                    />

                    <input type="text" 
                    className="form-control mb-4 p-2" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter Email" 
                    required
                    />

                    <input type="password" 
                    className="form-control mb-4 p-2" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Password" 
                    required
                    />
                    <br />

                    <button className="btn btn-primary"
                    disabled={!name || !email || !password || loading}
                    type="submit">
                        {loading ? <SyncOutlined spin/> : "Submit"}
                    </button>
                        <p className="text-center p-3">
                            Already Registered?{"  "}
                            <Link href="/login" >
                                <a>Login</a>
                            </Link>
                        </p>
                </form>
            </div>
        </>
    )
}

export default register