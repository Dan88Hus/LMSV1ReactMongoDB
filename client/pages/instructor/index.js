import {useEffect, useState} from 'react'
import axios from 'axios'
import InstructorRoute from '../../components/routes/InstructorRoute'

const InstructorIndex = () =>{

    const [courses, setCourses] = useState([])

    useEffect( async()=>{
        const {data} = await axios.get("/api/instructor-courses")
        setCourses(data)
    },[])
    return (
        <InstructorRoute>
        <h1 className="text-center">Instructor Dashboard</h1>
        {JSON.stringify(courses,null,4)}
        </InstructorRoute>
    )
}
export default InstructorIndex