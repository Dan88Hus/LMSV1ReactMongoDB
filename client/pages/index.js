import {useEffect, useState} from 'react'
import axios from 'axios'
import CourseCard from '../components/cards/CourseCard'
import {List , Avatar, Card, Badge} from 'antd'


const {Item} = List

 const Index = () => {
    const [courses, setCourses] = useState([])
    
    useEffect( async()=>{
        const {data} = await axios.get("/api/courses")
        setCourses(data)
    },[])
    
     return (
    <>
    <h1 className="text-center">eLearning</h1>
    <div className="container-fluid">
    <div className="row">
    {courses.map((course)=>{
        return(
            <div key={course._id} className="col-auto md-4">
                <CourseCard 
                course={course}/>
            </div>
        )
    })}
    </div>
    </div>

    </>
)
     }
export default Index