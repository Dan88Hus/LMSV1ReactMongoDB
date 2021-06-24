import {useState, useEffect, useContext} from 'react'
import { Menu } from 'antd'
import Link from 'next/link'
import {Context} from '../context/index'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


const {Item, SubMenu, ItemGroup} = Menu

const topnav = () => {
    const [current, setCurrent] = useState("")

    const {state, dispatch} = useContext(Context)

    const {user} = state

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
                    <a>Home</a>
                </Link>
            </Item>

{user === null && (
    <>

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
    </>
)}

{user && user.role && user.role.includes("Instructor") ? (
    <Item key=" "
    onClick={(e)=>setCurrent(e.key)}
    >
    <Link href="/instructor/course/create">
        <a>New Product</a>
    </Link>
    </Item>

) : (
    <Item key="/user/become-instructor"
    onClick={(e)=>setCurrent(e.key)}
    >
    <Link href="/user/become-instructor">
        <a>Seller menu</a>
    </Link>
    </Item>
) }



{user !== null &&  (
    <SubMenu key="/submenu" title={user && user.name} className="float-end">
        <ItemGroup>

        <Item key="/user">
                <Link href="/user">
                    <a>Dashboard</a>
                </Link>
        </Item>
        
        <Item key="/logout" onClick={logout}>
                <a>Logout</a>
        </Item>

        </ItemGroup>
    </SubMenu>
)}
{user && user.role && user.role.includes("Instructor") && (
        <Item key="/instructor"
        onClick={(e)=>setCurrent(e.key)}
        className="float-end "
        >
        <Link href="/instructor">
            <a>Seller</a>
        </Link>
        </Item>
)}
        </Menu>
    )
}
export default topnav