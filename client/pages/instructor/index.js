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
        <h1 className="text-center">Instructor Dashboard</h1>
        {/* {JSON.stringify(courses,null,4)} */}
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
                            <p >{course.lessons.length} Lessons</p>

                            {course.lessons.legth<5 ? (<p>
                                At least 5 lessons are required to publish a course
                            </p>) : course.published ? (<p>
                                Your course is live in the marketplace
                            </p>) : (<p className="text-muted">ready to be published</p>) }
                        </div>
                    </div>
                    <div className="col text-end">
                        {course.published ? (<div className="text-muted">Published</div>)
                         : 
                        (<div className="text-muted">Not Published</div>)}
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