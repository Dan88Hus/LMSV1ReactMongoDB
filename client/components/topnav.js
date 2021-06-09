import {useState, useEffect} from 'react'
import { Menu } from 'antd'
import Link from 'next/link'

const {Item} = Menu

const topnav = () => {
    const [current, setCurrent] = useState("")

    useEffect(()=>{
        process.browser && setCurrent(window.location.pathname)
    },[process.browser && window.location.pathname])

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
        </Menu>
    )
}
export default topnav