import {  useEffect, useState, useContext} from 'react'
import {Context} from '../../context/index'
import UserRoute from '../../components/routes/UserRoute'
import axios from 'axios'


const UserIndex = () => {
    const {state: {user}, dispatch} = useContext(Context)
    const [courses, setCourses] = useState([])

    // state

    useEffect(() => {
        loadCourses()
    })
    
    const loadCourses = async() => {
        const {data} =  await axios.get("/api/user-courses") 
        setCourses(data)
    }

    return (
    <UserRoute>
    <h1 className="text-center">
        User Dashboard
    </h1>
    {JSON.stringify(courses)}
    </UserRoute>
    ) 
}
export default UserIndex