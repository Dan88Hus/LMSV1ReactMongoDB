import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import axios from 'axios'

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
                {slug}
                {JSON.stringify(course, null, 4)}
            </div>
        </InstructorRoute>
    )
}

export default CourseView 