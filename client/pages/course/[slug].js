import {Badge} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import {currentFormatter} from '../../utils/helper'


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
    const {name, description, instructor, updatedAt, 
        lessons, image, price, paid, category} = course

    


    return (
        // <InstructorRoute>

            <div className="container-fluid">
            <div className="row mt-1">
                <div className="col-md-8">
                    {/* tirtle */} {/* description  category author price updatedAt */}
                    <h1 className="text-muted font-weight-bold">{name}</h1>
                    <p className="lead">{description && description.substring(0, 160)}....</p>
                    <Badge
                        count={category}
                    />
                    <p className="text-muted mt-1">
                        Created By: {instructor.name}
                    </p>
                    <p>Last updated: {new Date(updatedAt).toLocaleDateString()}</p>
                    <h4 className="text-muted">
                        {paid ? currentFormatter({
                            amount: price,
                            currency: "usd"
                        }) : "Free"}
                    </h4>
                
                </div> 
                <div className="col-md-4">
                    {/* show video preview course image */}
                    {/* enroll button */}
                    <p>course image</p>
                    <button className="btn btn-success">Enroll</button>

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