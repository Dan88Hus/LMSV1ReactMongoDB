import {useState, useEffect} from 'react'
import axios from 'axios'
import InstructorRoute from '../../../components/routes/InstructorRoute'
import CourseCreateForm from '../../../components/forms/CourseCreateForm'
import Resizer from 'react-image-file-resizer'
import {toast} from 'react-toastify'

const CourseCreate = () =>{
    const [values, setValues] = useState({
        name: "",
        description: "",
        category: "",
        price: "9.99",
        uploading: false,
        paid: true,
        loading: false,
    })
    const [image, setImage] = useState("")
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

    const handleSubmit = e =>{
        e.preventDefault()
        console.log(values)
    }

    return (
        <InstructorRoute>
        <h1 className="text-center">Create Course</h1>
        <div className="p-3">
            <CourseCreateForm 
            handleSubmit={handleSubmit}
            handleImage={handleImage}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            preview={preview}
            uploadButtonText={uploadButtonText}
            />
            <pre>{JSON.stringify(values)}</pre>
        </div>
        </InstructorRoute>
    )
}
export default CourseCreate