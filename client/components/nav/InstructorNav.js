import Link from 'next/link'
import {useState, useEffect} from 'react'



const InstructorNav = ()=>{
    const [current, setCurrent] = useState("")

    useEffect(()=>{
        process.browser && setCurrent(window.location.pathname)
    },[process.browser && window.location.pathname])

       return (
    <>
        <div className="nav flex-column nav-plus mt-2">
        <Link href="/instructor">
            <a className={`nav-link ${current === "/instructor" && "active"}`}>Seller Board</a>
        </Link>

        <Link href="/instructor/course/create">
            <a className={`nav-link ${current === "/instructor/course/create" && "active"}`}>Product Create</a>
        </Link>

        <Link href="/instructor/revenue">
            <a className={`nav-link ${current === "/instructor/revenue" && "active"}`}>Account</a>
        </Link>


        </div>
    </>)
}
export default InstructorNav