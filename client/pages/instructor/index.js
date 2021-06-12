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
                <div className="form-control mb-2 media pt-2">
                    <Avatar shape="square" size={80}
                    src={course.image ? course.image.Location : "No Image"} />
                    <div className="media-body pl-2">
                    <div className="row">
                        <div className="col">
                            <Link href={`/instructor/course/view/{course._id}`}>
                                <a className="h5 mt-2 text-primary">{course.name}</a>
                            </Link>
                            <p >{course.lessons.length} Lessons</p>

                            {course.lessons.legth<5 ? (<p>
                                At least 5 lessons are required to publish a course
                            </p>) : course.published ? (<p>
                                Your course is live in the marketplace
                            </p>) : (<p>Your course is ready to be published</p>) }
                        </div>
                    </div>
                    <div className="col mt-3 text-end">
                        {course.published ? (<div>Published</div>)
                         : 
                        (<div>Not Published</div>)}
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