import {useState, useEffect} from 'react'
import axios from 'axios'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import CourseCreateForm from '../../../../components/forms/CourseCreateForm'
import Resizer from 'react-image-file-resizer'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'

const CourseEdit = () =>{
    const router = useRouter()

    const {slug} = router.query // params degil

    useEffect(async()=>{
        const {data} = await axios.get(`/api/course/${slug}`)
        //useEffect calistiginda slug henuz aktif degil ondan router.params dan slugi alacaz ve when the slug changes run the useEffect
        setValues(data)
    },[slug])

    const [values, setValues] = useState({
        name: "",
        description: "",
        category: "",
        price: "9.99",
        uploading: false,
        paid: true,
        loading: false,
    })
    const [image, setImage] = useState({})
    const [preview, setPreview] = useState("")
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image")

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
            const {data} = await axios.post("/api/course", {...values, image})
            toast.success("Course created")
            router.push("/instructor")
        } catch (error) {
            console.log("create course send values to server error", error.response.data)
            toast.error("Create course failed")
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
            />
            {/* <pre>{JSON.stringify(values)}</pre> */}
        </div>
        {/* {JSON.stringify(values,null,4)} */}
        </InstructorRoute>
    )
}
export default CourseEdit