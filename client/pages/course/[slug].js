import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import SingleCourseView from '../../components/cards/SingleCourseView'
import PreviewModal from '../../components/modal/PreviewModal'
import SingleCourseLessons from '../../components/cards/SingleCourseLessons'
import {Context} from '../../context/index'
import {toast} from 'react-toastify'



const SingleCourse = ({course}) =>{
    const router = useRouter()
    const {slug} = router.query // params degil

    
    const [showModal, setShowModal] = useState(false)
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)
    const {state: {user}} = useContext(Context)
    const [enrolled, setEnrolled] = useState({})
    

    useEffect(()=>{
        if(user && course){
            checkEnrollment()
        }
    },[user, course])

    const checkEnrollment = async () =>{
        const {data} = await axios.get(`/api/check-enrollment/${course._id}`)
        console.log(data)
        setEnrolled(data)
    }

    const handlePaidEnrollment = () => {
        console.log("handlePayment Enrollment")
    }

    const handleFreeEnrollment = async (e) => {
        // console.log("handleFreeEnrollment")
        e.preventDefault()
        try {
            if(!user) router.push("/login")
            if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`)
            setLoading(true)
            const {data} = await axios.post(`/api/free-enrollment/${course._id}`)
            toast.success(data.message)
            setLoading(false)
            router.push(`/user/course/${data.course.slug}`)
        } catch (error) {
            toast.error("handeleFREEenrollment Error")
            setLoading(false)
        }
    }
        
    return (
        <>
        <SingleCourseView course={course}
        showModal={showModal} setShowModal={setShowModal}
        preview={preview} setPreview={setPreview}
        user={user}
        loading={loading}
        setLoading={setLoading}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
        />

        <PreviewModal showModal={showModal} 
        setShowModal={setShowModal}
        preview={preview} 
        setPreview={setPreview} />
        
        {course.lessons && (
            <SingleCourseLessons lessons={course.lessons}
            setPreview={setPreview} showModal={showModal}
            setShowModal={setShowModal}
            />
        )}
        </>
    )
}
// context.query den {query} destructure yapiliyor, context.req, veya context.response da oldgu gob
// getServerSideProps single data fetching olarak NEXTJS documaninda var, bize context olarak veri sagladigida yaziyor
export async function getServerSideProps({query}) {
    const {data} = await axios.get(`${process.env.API}/course/${query.slug}` )
    return {
        props: {
            course: data,
        }
    }
}
export default SingleCourse