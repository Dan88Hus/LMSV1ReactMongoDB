import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import SingleCourseView from '../../components/cards/SingleCourseView'
import PreviewModal from '../../components/modal/PreviewModal'
import SingleCourseLessons from '../../components/cards/SingleCourseLessons'
import {Context} from '../../context/index'


// import {toast} from 'react-toastify'

const SingleCourse = ({course}) =>{
    const router = useRouter()
    const {slug} = router.query // params degil

    
    const [showModal, setShowModal] = useState(false)
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)
    const {state: {user}} = useContext(Context)


    const handlePaidEnrollment = () => {
        console.log("handlePayment Enrollment")
    }

    const handleFreeEnrollment = () => {
        console.log("handleFreeEnrollment")
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