import {useState, useEffect, useContext} from 'react'
import { Menu } from 'antd'
import Link from 'next/link'
import {Context} from '../context/index'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


const {Item} = Menu

const topnav = () => {
    const [current, setCurrent] = useState("")

    const {state, dispatch} = useContext(Context)

    const router = useRouter()


    useEffect(()=>{
        process.browser && setCurrent(window.location.pathname)
    },[process.browser && window.location.pathname])

    const logout = async() => {
        // console.log("logout clicked")
        dispatch({ type: "LOGOUT"})
        window.localStorage.removeItem("user")
        const {data} = await axios.get("/api/logout")
        toast.success(data.message)
        router.push("/login")
    }

    return (
        <Menu mode="horizontal" selectedKeys={[current]}>
            <Item key="/" onClick={(e)=> setCurrent(e.key)}>
                <Link href="/">
                    <a>App</a>
                </Link>
            </Item>

            <Item key="/login" onClick={(e)=> setCurrent(e.key)}>
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </Item>

            <Item key="/register" onClick={(e)=> setCurrent(e.key)}>
                <Link href="/register">
                    <a>Register</a>
                </Link>
            </Item>


            <Item onClick={logout} className="float-right">
                    <a>Logout</a>
            </Item>
        </Menu>
    )
}
export default topnav