import {  useEffect, useState, useContext} from 'react'
import {Context} from '../../context/index'
import UserRoute from '../../components/routes/UserRoute'
import axios from 'axios'
import {Avatar} from 'antd'
import Link from "next/link"
import {toast} from "react-toastify"




const UserIndex = () => {
    const {state: {user}, dispatch} = useContext(Context)
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)


    // state

    useEffect(() => {
        loadCourses()
    },[])
    
    const loadCourses = async() => {
        try {
            setLoading(true)
            const {data} =  await axios.get("/api/user-courses") 
            setCourses(data)
            setLoading(false)
            toast.success("all courses are listed successfully")
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
    <UserRoute>
    <h1 className="text-center">
        User Dashboard
    </h1>
    {!loading && (
        <div>
            {courses.map((course) => (
                <div key={courses._id} className="row mb-2">
                    <div className="col">
                    <Avatar
                    size={80}
                    shape="square"
                    src={course.image ? course.image.Location : "No image"}
                    />
                    </div>
                    <div className="col">
                        test
                    </div>
                </div>
            ))}
        </div>
    )}
    {/* {JSON.stringify(courses)} */}
    </UserRoute>
    ) 
}
export default UserIndex