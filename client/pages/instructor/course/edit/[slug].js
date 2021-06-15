import {List, Avatar, Modal} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import CourseCreateForm from '../../../../components/forms/CourseCreateForm'
import Resizer from 'react-image-file-resizer'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import {DeleteOutlined} from '@ant-design/icons'
import UpdateLessonForm from '../../../../components/forms/updateLessonForm'


const {Item} = List

const CourseEdit = () =>{
    const router = useRouter()

    const {slug} = router.query // params degil

    useEffect(async()=>{
        const {data} = await axios.get(`/api/course/${slug}`)
        //useEffect calistiginda slug henuz aktif degil ondan router.params dan slugi alacaz ve when the slug changes run the useEffect
        if(data && data.image){
            setImage(data.image)
            setValues(data)
            // console.log(data)
        }
    },[slug])

    const [values, setValues] = useState({
        name: "",
        description: "",
        category: "",
        price: "9.99",
        uploading: false,
        paid: true,
        loading: false,
        lessons: [],
    })
    const [image, setImage] = useState({})
    const [preview, setPreview] = useState("")
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image")
    //state for lesson update
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState({})
    const [uploadVideoButtonText, setUploadVideoButtonText] = useState("Upload Video")
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)


    const handleChange = (e)=>{
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleImage = (e) => {
        let file = e.target.files[0]
        setPreview(window.URL.createObjectURL(file))
        setUploadButtonText(file.name)
        setValues({...values, loading:true})
        Resizer.imageFileResizer(
            file,
            720,
            500,
            "JPEG",
            100,
            0,
            // uri can any variable name, which is resized image
            async(uri)=>{
               try {
                   let {data} = await axios.post("/api/course/upload-image", {
                       image: uri,
                   })
                   console.log("imageuploaded", data)
                   setValues({...values, loading: false})
                   setImage(data)
               } catch (error) {
                   console.log(error)
                   setValues({...values, loading:false})
                   toast.error("Image Upload failed")
               } 
            })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        // console.log(values)
        try {
            const {data} = await axios.put(`/api/course/${slug}`, {...values, image})
            toast.success("Course updated")
            router.push("/instructor")
        } catch (error) {
            console.log("update course send values to server error", error.response.data)
            toast.error("update course failed")
        }  }

    const handleImageRemove = async()=>{
        console.log("REMOVE IMAGE CLICKED")
        try {
            setValues({...values, loading: true})
            const res = await axios.post("/api/course/remove-image", {image})
            setImage({})
            setPreview("")
            setUploadButtonText("Upload Image") 
            setValues({...values, loading: false})
        } catch (error) {
            console.log("Image Remove failed",error)
            setValues({...values, loading: false})
            toast.error("Image Remove failed")
        }
    }
    const handleDrag = (e, index)=>{
        // console.log("handleDrag index", index)
        e.dataTransfer.setData("itemIndex", index)
    }

    const handleDrop = async(e, index) => {
        // console.log("handleDrop index", index)
        const movingItemIndex = e.dataTransfer.getData("itemIndex")
        const targetItemIndex = index
        let allLessons = values.lessons
        let movingItem = allLessons[movingItemIndex] //clicked or dragged item reorder
        allLessons.splice(movingItemIndex,1) //to remove item
        allLessons.splice(targetItemIndex,0,movingItem) //to add item //0 indicates number of item to be removed
        setValues({...values, lessons: [...allLessons]})

        const {data} = await axios.put(`/api/course/${slug}`, {...values, image})
        toast.success("Lessons re-order is updated")
        // router.push("/instructor")

    }

    const handleDelete = async(index) =>{
        try {
            const answer = window.confirm("are you sure to delete?")
            console.log("lesson delete clicked")
            if(!answer){
                return
            }
            let allLessons = values.lessons
            const removed = allLessons.splice(index,1) // this gives individual item which is removed
            setValues({...values, lessons: allLessons})
            const {data} = await axios.put(`/api/course/${slug}/${removed[0]._id}`)
            toast.success("lesson is deleted")

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }

    }
    const lessonClik = (item) =>{
        setVisible(true)
        setCurrent(item)
    }

    //lesson update functions
    const handleVideoUpload = async()=>{
        console.log("handle video upload")
    }

    const handleUpdateLesson = async()=>{
        console.log("handleUpdateLesson")
    }
    return (
        <InstructorRoute>

        <h1 className="text-center">Edit Course</h1>
        <div className="p-3">
            <CourseCreateForm 
            handleSubmit={handleSubmit}
            handleImage={handleImage}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            preview={preview}
            uploadButtonText={uploadButtonText}
            handleImageRemove={handleImageRemove}
            editPage={true}
            />
        </div>
        <hr />
            <div className="container">
            <div className="row mt-1">
            <div className="col">
                <h4 className="text-start">Lessons:</h4>
            </div>
            {/* //dataSource in List component , it map each item */}
            <List onDragOver={e => e.preventDefault()}
            itemLayout="horizantal" dataSource={values && values.lessons}
            renderItem={(item, index)=>(
                <Item draggable onDragStart={e => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                >
                    <Item.Meta onClick={()=> lessonClik(item)}
                    avatar={<Avatar>{index+1}</Avatar>}
                    style={{cursor: "pointer"}}
                    title={item.title}>
                    </Item.Meta>
                    <DeleteOutlined onClick={()=>handleDelete(index)}
                    className="text-danger float-end"
                    />
                </Item>
            )}>
            </List>
            </div>
            </div>
            {/* //Modal doesnot have to be inside of any div ,can be in anywhere */}
            {/* ama modalin icin de gostereceklerimizi modal icnde yazziyoruz */}
            <Modal
            title="Update Lesson"
            centered
            visible={visible}
            onCancel={()=> setVisible(false)}
            footer={false}
            > 
            <UpdateLessonForm current={current}
            setCurrent={setCurrent}
            handleVideoUpload={handleVideoUpload}
            handleUpdateLesson={handleUpdateLesson}
            uploadVideoButtonText={uploadVideoButtonText}
            progress={progress}
            uploading={uploading}
            
            />
             </Modal>
        </InstructorRoute>
    )
}
export default CourseEdit