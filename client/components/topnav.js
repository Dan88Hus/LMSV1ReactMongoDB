import { Menu } from 'antd'
import Link from 'next/link'

const {Item} = Menu

const topnav = () => {
    return (
        <Menu mode="horizontal">
            <Item key="app">
                <Link href="/">
                    <a>App</a>
                </Link>
            </Item>

            <Item key="login">
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </Item>

            <Item key="register">
                <Link href="/register">
                    <a>Register</a>
                </Link>
            </Item>
        </Menu>
    )
}
export default topnav