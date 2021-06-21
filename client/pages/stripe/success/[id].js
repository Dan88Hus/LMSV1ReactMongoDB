import {useEffect} from 'react'
import UserRoute from '../../../components/routes/UserRoute'
import {useRouter} from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'


const StripeSuccess = ()=>{
    const router = useRouter()
    const {id} = router.query 
    
    useEffect(()=>{
        if(id){
            console.log("stripe/success/id useEffect")
            successRequest()
        }
    },[id])

    const successRequest = async() => {
        const {data} = await axios.get(`/api/stripe-success/${id}`)
        toast.success("Thank you for payment")
        console.log("useEffect ok")
        router.push(`/user/course/${data.course.slug}`)
    }

    return(
        <UserRoute showNav={false}>
            <div className="row text-center">
                <div className="col">
                    <p className="lead">Payment Succeded, Thank you</p>
                </div>
            </div>
        </UserRoute>
    )
}
export default StripeSuccess
