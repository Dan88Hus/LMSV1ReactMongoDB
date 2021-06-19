// import {List, Avatar, Modal} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'


// import InstructorRoute from '../../../../components/routes/InstructorRoute'
// import CourseCreateForm from '../../../../components/forms/CourseCreateForm'
// import Resizer from 'react-image-file-resizer'
// import {toast} from 'react-toastify'
// import {DeleteOutlined} from '@ant-design/icons'
// import UpdateLessonForm from '../../../../components/forms/updateLessonForm'


// const {Item} = List

const SingleCourse = ({course}) =>{
    const router = useRouter()
    const {slug} = router.query // params degil



    return (
        // <InstructorRoute>

            <div className="container-fluid">
            <div className="row mt-1">
            <div className="col">
                <h4 className="text-start">Lessons:</h4>
                {JSON.stringify(course)}
            </div>

            </div>
            </div>

        // </InstructorRoute>
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