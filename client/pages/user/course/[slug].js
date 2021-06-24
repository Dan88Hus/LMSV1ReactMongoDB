import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import {Context} from '../../../context/index'
import {toast} from 'react-toastify'
import StudentRoute from '../../../components/routes/UserRoute'
import {Button, Menu, Avatar} from 'antd'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import {CheckCircleFilled, MinusCircleFilled} from '@ant-design/icons'


const {Item} = Menu

const SingleCourse = () =>{
    const router = useRouter()
    const {slug} = router.query // params degil

    
    const [loading, setLoading] = useState(false)
    const {state: {user}} = useContext(Context)
    const [clicked, setClicked] = useState(-1)
    const [collapsed, setCollapsed] = useState(false)
    const [course, setCourse] = useState({lessons: []}) //course.lesson
    const [completedLessons, setCompletedLessons] = useState([])
    const [updateState, setUpdateState] = useState(false)

    

    useEffect(()=>{
        if(slug){
            loadCourse()
        }
    },[slug])

    useEffect(()=>{
        if(course) loadCompletedLessons()
    },[course])

   const loadCompletedLessons = async () => {
    const {data}  =await axios.post("/api/list-completed", {
        courseId: course._id})
        // console.log("completed Lessons", data)
        // toast.success("fetching List success")
        setCompletedLessons(data)
   }

    const loadCourse = async () =>{
        const {data} = await axios.get(`/api/user/course/${slug}`)
        // console.log(data) 
        setCourse(data)
    }

    const markCompleted = async () => {
        // console.log("mark completed runs")
        const {data} = await axios.post("/api/mark-completed", {
            courseId: course._id,
            lessonId: course.lessons[clicked]._id,
            })
            // toast.success("Marked Completed")
            // console.log("data", data)
            setCompletedLessons([...completedLessons, course.lessons[clicked]._id])
    }
    const markInCompleted = async () =>{
       try {
        const {data} = await axios.post("/api/mark-incomplete", {
            courseId: course._id,
            lessonId: course.lessons[clicked]._id,
            })
            // console.log("Incomplete data", data)
            const all = completedLessons
            const index = all.indexOf(course.lessons[clicked]._id) // true/false
            if(index > -1){
                all.splice(index, 1)
                setCompletedLessons(all)
                setUpdateState(!updateState)
            }
       } catch (error) {
           console.log(error.message)
       }
    }

        
    return (
        <StudentRoute>
       <div className="row">
           <div style={{maxWidth: 250}}>
               <Button onClick={()=> setCollapsed(!collapsed)} className="text-primary mt-1 mb-2">{collapsed ? "Unfold" : "Fold"}</Button>
                <Menu mode="inline"
                inlineCollapsed={collapsed}
                style={{height:"80vh", overflow:"hidden"}}>
                    {course.lessons.map((lesson, index) => (
                        <Menu.Item key={index} 
                        icon={<Avatar
                            >{index+1}</Avatar>}
                        onClick={()=> setClicked(index)}>
                            {lesson.title.substring(0,30)}
                            {completedLessons.includes(lesson._id) ? (<CheckCircleFilled className="float-end"/>) : (<MinusCircleFilled className="float-end"/>)}
                        </Menu.Item>
                    ))}
                </Menu>
           </div>
           <div className="col">
               {clicked !== -1 ? (
                   <>

                   <div className="col text-center m-3">
                       <b>{course.lessons[clicked] && course.lessons[clicked].title.substring(0,30)}</b>
                   {completedLessons.includes(course.lessons[clicked]._id) ?  (<span style={{cursor: "pointer"}} className="float-end" onClick={markInCompleted}>UnComplete</span>) 
                   : (<span style={{cursor: "pointer"}} className="float-end" onClick={markCompleted}>Complete</span>
                    )
                   }
                   </div>
                   {course.lessons[clicked] && course.lessons[clicked].video && course.lessons[clicked].video.Location && (
                       <>
                       <div className="wrapper">
                           <ReactPlayer 
                           className="player"
                           url={course.lessons[clicked].video.Location}
                           width="100%"
                           height="100%"
                           controls
                           onEnded={()=> markCompleted()}
                           />
                       </div>
  
                       </>
                   )}
                        <ReactMarkdown children={course.lessons[clicked] && course.lessons[clicked].content}
                        className="single-post"
                       
                       />
                   {/* {JSON.stringify(course.lessons[clicked])} */}
                   </>
               ) : "please select item to see details"}
           </div>
       </div>
        </StudentRoute>
    )
}
export default SingleCourse