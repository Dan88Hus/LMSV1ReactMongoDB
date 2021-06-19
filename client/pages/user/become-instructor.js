import axios from 'axios'
import {useEffect, useState, useContext} from 'react'
import {Context} from '../../context/index'
import {Button} from 'antd'
import {toast} from 'react-toastify'
import UserRoute from '../../components/routes/UserRoute'
import {LoadingOutlined} from '@ant-design/icons'



const BecomeInstructor = () =>{

    const [loading, setLoading] = useState(false)
    const {state:{user}} = useContext(Context)

    const becomeInstructor = () =>{
        setLoading(true)
        axios.post("/api/make-instructor")
        .then((res)=>{
            toast.success("res.data")
            window.location.href = res.data
        })
        .catch(err => {
            console.log(err.response.status)
            toast.error("stripe onboarding failed")
            setLoading(false)
        })
    }
    return (
        <>
        <h1 className="text-center">Become Instructor</h1>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <div className="pt-4">
                        <h2 className="pb-3">Setup payout to publish courses</h2>
                        <Button className="mb-3" block shape="round"
                        icon={loading ? <LoadingOutlined/> : "Continue to configure by Stripe"}
                        size="large"
                        onClick={becomeInstructor}
                        disabled={user && user.role && user.role.includes("Instructor") || loading}
                        >
                        {/* {loading ? "Processing" : ""} */}

                        </Button>
                        <p className="lead">You will be redirected to stripe</p>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}
export default BecomeInstructor