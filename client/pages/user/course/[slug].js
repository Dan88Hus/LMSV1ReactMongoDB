import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
// import SingleCourseView from '../../components/cards/SingleCourseView'
// import PreviewModal from '../../components/modal/PreviewModal'
// import SingleCourseLessons from '../../components/cards/SingleCourseLessons'
import {Context} from '../../../context/index'
// import {toast} from 'react-toastify'
// import {loadStripe} from "@stripe/stripe-js"

const SingleCourse = () =>{
    const router = useRouter()
    const {slug} = router.query // params degil

    
    const [loading, setLoading] = useState(false)
    const {state: {user}} = useContext(Context)
    const [enrolled, setEnrolled] = useState({})
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
        <>
       {JSON.stringify(course, null, 6)}
        </>
    )
}
export default SingleCourse