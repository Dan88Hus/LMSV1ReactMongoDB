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
        User Courses List
    </h1>
    {!loading && (
        <div>
            {courses.map((course) => (
                <div key={courses._id} className="row mb-1">
                    <div className="col-auto">
                    <Avatar
                    size={80}
                    shape="square"
                    src={course.image ? course.image.Location : "No image"}
                    />
                    </div>
                    <div className="col">
                         <Link href={`/user/course/${course.slug}`}><a><div>{course.name}</div></a></Link>
                         <div>Lessons: {course.lessons.length}</div>
                         <div className="text-muted">{course.instructor.name}</div>

                    </div>
                    <hr className="mt-3"/>
                </div>
            ))}
        </div>
    )}
    {/* {JSON.stringify(courses)} */}
    </UserRoute>
    ) 
}
export default UserIndex