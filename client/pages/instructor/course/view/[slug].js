import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import axios from 'axios'
import {Avatar} from 'antd'

const CourseView = ()=>{
    const [course,setCourse] = useState({})

    const router = useRouter()
    const {slug} = router.query
 

    useEffect(async()=>{
        const {data} = await axios.get(`/api/course/${slug}`)
        setCourse(data)
    },[])

    return (
        <InstructorRoute>
            <div className="container">
               <h1 className="text-center"> {slug}</h1>
                {/* {JSON.stringify(course, null, 4)} */}
                {course && 
                <div className="form-control mb-2">
                    <div className="row">
                        <div className="col">
                        <Avatar shape="square" size={80}
                    src={course.image ? course.image.Location : "No Image"} 
                    />
                        </div>
                        
                    <div className="col">
                    <div className="row">
                        <div>
                            <h5 className="text-primary text-start">{course.name}</h5>
                            <p>{course.lessons && course.lessons.length} Lessons</p>
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

                    }
            </div>
        </InstructorRoute>
    )
}

export default CourseView 