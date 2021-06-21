import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
// import SingleCourseView from '../../components/cards/SingleCourseView'
// import PreviewModal from '../../components/modal/PreviewModal'
// import SingleCourseLessons from '../../components/cards/SingleCourseLessons'
import {Context} from '../../../context/index'
// import {toast} from 'react-toastify'
// import {loadStripe} from "@stripe/stripe-js"
import StudentRoute from '../../../components/routes/UserRoute'
import {Button, Menu, Avatar} from 'antd'


const {Item} = Menu

const SingleCourse = () =>{
    const router = useRouter()
    const {slug} = router.query // params degil

    
    const [loading, setLoading] = useState(false)
    const {state: {user}} = useContext(Context)
    const [clicked, setClicked] = useState(-1)
    const [collapsed, setCollapsed] = useState(false)
    const [course, setCourse] = useState({lessons: []}) //course.lesson

    

    useEffect(()=>{
        if(slug){
            loadCourse()
        }
    },[slug])

    const loadCourse = async () =>{
        const {data} = await axios.get(`/api/user/course/${slug}`)
        // console.log(data) 
        setCourse(data)
    }


        
    return (
        <StudentRoute>
       <div className="row">
           <div style={{maxWidth: 250}}>
                <Menu defaultSelectedKeys={[clicked]} 
                inlineCollapsed={collapsed}>
                    {course.lessons.map((lesson, index) => (
                        <Menu.Item key={index} 
                        icon={<Avatar
                            >{index+1}</Avatar>}
                        onClick={()=> setClicked(index+1)}>
                            {lesson.title.substring(0,30)}
                        </Menu.Item>
                    ))}
                </Menu>
           </div>
           <div className="col">
               {clicked !== -1 ? (
                   <>
                   {course.lessons[clicked]}
                   </>
               ) : "please select lesson to see details"}
           </div>
       </div>
        </StudentRoute>
    )
}
export default SingleCourse