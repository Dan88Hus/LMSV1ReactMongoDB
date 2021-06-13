import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import axios from 'axios'
import {Avatar, Tooltip, Button, Modal} from 'antd'
import {EditOutlined, CheckOutlined} from '@ant-design/icons'
import ReactMarkDown from 'react-markdown'
import AddLessonForm from '../../../../components/forms/AddLessonForm'

const CourseView = ()=>{
    const [course,setCourse] = useState({})
    const [visible, setVisible] = useState(false)
    const [values, setValues] = useState({
        title: "",
        content: "",
        video: "",
    })
    const [uploading, setUploading] = useState(false)
    const [uploadButtonText, setUploadButtonText] = useState("Upload Video")


    const router = useRouter()
    const {slug} = router.query
 

    useEffect(async()=>{
        const {data} = await axios.get(`/api/course/${slug}`)
        setCourse(data)
    },[])

    //functions for add lesson
    const handleAddLesson = (e) =>{
        e.preventDefault()
        console.log(values)
    }

    const handleVideo = (e)=>{
        console.log("handleVideo upload")
        const file = e.target.files[0]
        setUploadButtonText(file.name)
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
                        <Tooltip title="Edit">
                            <EditOutlined style={{cursor: "pointer"}} className="h5 mr-4"/>
                        </Tooltip>
                        <Tooltip title="Publish">
                            <CheckOutlined style={{cursor: "pointer"}} className="h5 ml-4"/>
                        </Tooltip>
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
                    clasName="col-md-6 offset-md-3 text-center"
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
                        handleVideo={handleVideo}/>
                    </Modal>
                    </div>
                    }
                    {/* {JSON.stringify(course.description)} */}
            </div>
        </InstructorRoute>
    )
}

export default CourseView 