import {useEffect, useState} from 'react'
import axios from 'axios'
import InstructorRoute from '../../components/routes/InstructorRoute'
import {Avatar} from "antd"
import Link from 'next/link'

const InstructorIndex = () =>{

    const [courses, setCourses] = useState([])

    useEffect( async()=>{
        const {data} = await axios.get("/api/instructor-courses")
        setCourses(data)
    },[])
    return (
        <InstructorRoute>
        <h1 className="text-center">Seller Dashboard</h1>
        {courses && courses.map(course =>{
            return (
                <>
                <div className="form-control mb-2">
                    <div className="row">
                        <div className="col">
                        <Avatar shape="square" size={80}
                    src={course.image ? course.image.Location : "No Image"} 
                    />
                        </div>
                        
                        <div className="col">
                    <div className="row">
                        <div className="col-auto">
                            <Link href={`/instructor/course/view/${course.slug}`}>
                                <a className="h5 mt-2 text-primary">{course.name}</a>
                            </Link>
                            <p >{course.lessons.length} Products</p>

                            {course.lessons.legth<5 ? (<p>
                                At least 5 lessons are required to publish a course
                            </p>) : course.published ? (<p>
                                
                            </p>) : (<p className="text-muted">Offline</p>) }
                        </div>
                    </div>
                    <div className="col text-end">
                        {course.published ? (<div className="text-success">Online</div>)
                         : 
                        (<div className="text-muted">Offline</div>)}
                    </div>
                    </div>
                </div>

                    </div>
                  

                </>

            )
        })}
        </InstructorRoute>
    )
}
export default InstructorIndex