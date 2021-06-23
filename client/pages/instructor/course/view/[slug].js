import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import axios from 'axios'
import {Avatar, Tooltip, Button, Modal, List, Badge} from 'antd'
import {EditOutlined, CheckOutlined} from '@ant-design/icons'
import ReactMarkDown from 'react-markdown'
import AddLessonForm from '../../../../components/forms/AddLessonForm'
import {toast} from "react-toastify"
import Item from 'antd/lib/list/Item'

const CourseView = ()=>{
    const [course,setCourse] = useState({})
    const [visible, setVisible] = useState(false)
    const [values, setValues] = useState({
        title: "",
        content: "",
        video: {},
    })
    const [uploading, setUploading] = useState(false)
    const [uploadButtonText, setUploadButtonText] = useState("Upload Video")
    const [progress, setProgress] = useState(0)
    // student count
    const [students, setStudents] = useState(0)

    useEffect(()=>{
        course && studentCount()
    },[course])

    const studentCount = async() =>{
        const {data} = await axios.post(`/api/instructor/student-count`,{
            courseId : course._id
        })
        // toast.success("students count is updated")
        console.log(data.length)
        // setStudents(data.length)
    }


    const router = useRouter()
    const {slug} = router.query

    const handleVideoRemove = async()=>{
        try {
            setUploading(true)
            console.log("handleRemoveClicked")
            const {data} = await axios.post(`/api/course/video-remove/${course.instructor._id}`, {video: values.video})
            console.log(data)
            setValues({...values, video:{}})
            setProgress(0)
            setUploading(false)
            setUploadButtonText("Upload video")
            toast.success("Video deleted")
        } catch (error) {
            console.log(error.message)
            setUploading(false)
            toast.error("Video delete failed")
        }        
    }
 

    useEffect(async()=>{
        const {data} = await axios.get(`/api/course/${slug}`)
        setCourse(data)
    },[])

    //functions for add lesson
    const handleAddLesson = async(e) =>{
        try {
            e.preventDefault()
            // console.log(values)
            const {data} = await axios.post(`/api/course/lesson/${slug}/${course.instructor._id}`, values)
            setCourse(data)
            setValues({...values, title: "", content: "", video: {}})
            setVisible(false) //to close Modal
            setUploadButtonText("Upload video")
            toast.success("lesson is saved")
        } catch (error) {
            console.log(error.message)
            toast.error("save lesson is failed")
        }
    }

    const handleVideo = async(e)=>{
        // console.log(course.instructor._id)
        try {
            console.log("handleVideo upload")

            const file = e.target.files[0]
            setUploadButtonText(file.name)
            setUploading(true)
            //we will send video to our backend so we use formData to send it in form, image gibi binary gonderirsek cok olacak
            const videoData = new FormData()
            videoData.append("video", file)
            //save progress bar and send data, axios provide how much its loaded
            const {data} = await axios.post(`/api/course/video-upload/${course.instructor._id}`, videoData, {
                onUploadProgress: (e) =>{
                    setProgress(Math.round((100* e.loaded)/ e.total))
                }
            })
            // once response is received 
            // console.log(data)
            setValues({...values, video: data})
            setUploading(false)
            toast.success("video Uploaded")
        } catch (error) {
            console.log(error)
            setUploading(false)
            toast.error("video upload failed")
        }
    }

    const handlePublish = async(e, courseId) => {
        // console.log("handlePublish")
        try {
            let answer = window.confirm("are you sure?")
            if (!answer) return
            const {data} = await axios.put(`/api/course/publish/${courseId}`)
            setCourse(data)
            toast.success("Course is Published")
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const handleUnPublish = async(e, courseId) =>{
        // console.log("handleUNPublish")
        try {
            let answer = window.confirm("are you sure?")
            if (!answer) return
            const {data} = await axios.put(`/api/course/unpublish/${courseId}`)
            setCourse(data)
            toast.success("Course is Unpublished")
        } catch (error) {
            toast.error(error.message)
            
        }

    }

    return (
        <InstructorRoute>
            <div className="container">
               <h1 className="text-center"> {slug}</h1>
                {/* {JSON.stringify(course, null, 4)} */}
                {course && 
                <div className="form-control mb-2">
                    <div className="row">
                        <div className="col-auto">
                        <Avatar shape="square" size={80}
                    src={course.image ? course.image.Location : "No Image"} 
                    />
                        </div>
                    <div className="col">
                    <div className="row">
                        <div className="col-auto">
                            <h5 className="text-primary text-start">Category: {course.category}</h5>
                            <p>{course.lessons && course.lessons.length} Lessons</p>
                        </div>
                        <div className="col text-end">
                        {course.published ? (<div className="text-muted">Published</div>)
                         : 
                        (<div className="text-muted">Not Published</div>)}
                   
                   <div className="text-end">
                        <Badge className="m-3" count={`${students} Enrolled`}>
                        </Badge>
                        <Tooltip title="Edit">
                            <EditOutlined onClick={() => router.push(`/instructor/course/edit/${slug}`)} style={{cursor: "pointer"}} className="h5 mr-4"/>
                        </Tooltip>
                        <Tooltip title={course.published ? "UnPublish" : "Publish" }>
                            <CheckOutlined 
                            onClick={course.published ? ((e)=> handleUnPublish(e, course._id)) : ((e)=> handlePublish(e, course._id)) }
                            style={{cursor: "pointer"}} className="h5 ml-4"/>
                        </Tooltip>
                        {/* {JSON.stringify(course.published)} */}
                    </div>
                </div>
                </div>
                </div>
                </div>

                    <div className="row">
                        <hr style={{marginTop: "3px", width: "80%"}}/>
                        <ReactMarkDown children={course.description}/>
                    </div>
                    <Button
                    onClick={()=> setVisible(true)}
                    className="col-md-6 offset-md-3 text-center"
                    type="primary"
                    shape="round"
                    size="large"
                    >
                        Add Lesson
                    </Button>
                    <Modal
                    title="Add Lesson"
                    centered 
                    visible={visible}
                    onCancel={()=> setVisible(false)}
                    footer={null}
                    >
                        <AddLessonForm values={values} setValues={setValues}
                        handleAddLesson={handleAddLesson}
                        uploading={uploading}
                        setUploading={setUploading}
                        uploadButtonText={uploadButtonText}
                        handleVideo={handleVideo}
                        progress={progress}
                        handleVideoRemove={handleVideoRemove}/>
                    </Modal>

                    <div className="row mt-1">
                        <div className="col">
                            <h4 className="text-start">Lessons:</h4>
                        </div>
                        {/* //dataSource in List component , it map each item */}
                        <List itemLayout="horizantal" dataSource={course && course.lessons}
                        renderItem={(item, index)=>(
                            <Item>
                                <Item.Meta avatar={<Avatar>{index+1}</Avatar>}
                                title={item.title}>
                                </Item.Meta>
                            </Item>
                        )}>

                        </List>
                    </div>
                    </div>
                    }
                    {/* {JSON.stringify(course.description)} */}
            </div>
        </InstructorRoute>
    )
}

export default CourseView 