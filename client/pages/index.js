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
            {/* {courses.map((course)=>{
                return(
                    <div key={course._id} className="col-auto md-4">
                        <CourseCard 
                        course={course}/>
                    </div>
                )
            })} */}
            {/* //dataSource in List component , it map each item */}
            <List
            grid={{ gutter: 1  , column: 4}}
            dataSource={courses}
            size= "small"
            renderItem={(course)=>(
                <Item>
                    <Item.Meta className="form-control"
                    onClick={()=> console.log("onclick desc")}
                    avatar={<Avatar shape="square"
                    src={course.image && course.image.Location ? (course.image.Location): "No image"}
                    ></Avatar>}
                    style={{cursor: "pointer", height: "120px"}}
                    size="large"
                    title={course.name}
                    description={course.category}
                    >

                    </Item.Meta>

            </Item>
            )}>
                {/* {JSON.stringify(course)} */}
            </List>

        </div>
    </div>
    </>
)
     }
export default Index