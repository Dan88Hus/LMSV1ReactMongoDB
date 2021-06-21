import Link from 'next/link'
import {useState, useEffect} from 'react'



const UserNav = ({showNav=true})=>{
    const [current, setCurrent] = useState("")

    useEffect(()=>{
        process.browser && setCurrent(window.location.pathname)
    },[process.browser && window.location.pathname])

       return (
    <>
        <div className="nav flex-column nav-plus mt-2">
        <Link href="/user">
            <a className={`nav-link ${current === "/user" && "active"}`}>User Dashboard</a>
        </Link>
        </div>
    </>)
}
export default UserNav