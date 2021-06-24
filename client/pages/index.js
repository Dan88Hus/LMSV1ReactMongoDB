import {useEffect, useState} from 'react'
import axios from 'axios'
import CourseCard from '../components/cards/CourseCard'
import {List , Avatar, Card, Badge} from 'antd'


const {Item} = List

const Index = ({courses}) => {
     //  const Index = () => {

    // const [courses, setCourses] = useState([])
    
    // useEffect( async()=>{
    //     const {data} = await axios.get("/api/courses")
    //     setCourses(data)
    // },[]) these are commented to maake it SEO and written new async funct at below
    //props olarak ta{courses} i alacak
    
     return (
    <>
    <h1 className="text-center">Visual Products</h1>
    {/* <div className="container"> */}
    <div className="row">
    {courses.map((course)=>(
            <div key={course._id} className="col">
                <CourseCard 
                course={course}/>
            </div>)
    )}
    </div>
    {/* </div> */}

    </>
)
}

export async function getServerSideProps() {
    //burda API in yolunu axios a tam vermemiz gelekiyor ve env dosyasinda prefix olarak NEXT_PUBLIC_ eklemiyoruz cunku direk server ile baglanti kuruyor,
    //  env dosyasinda PREFIX verirsek client olarak aligliyor, ama biz direk server ile baglanti kuruyoruz SEO da
    // const {data} = await axios.get("/api/courses....... yazardik normalde ")
    const {data} = await axios.get(`${process.env.API}/courses`)
    return { 
        props : {
            courses: data
        }
    }
    // now if we check page sources we can find each courses


}
export default Index