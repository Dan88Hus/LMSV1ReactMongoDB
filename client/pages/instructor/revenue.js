import {useState, useEffect, useContext} from 'react'
import {Context} from '../../context/index'
import InstructorRoute from '../../components/routes/InstructorRoute'
import axios from 'axios'
import {stripeCurrentFormatter} from '../../utils/helper'
import Link from 'next/link'
import {toast} from "react-toastify"
import {Button} from 'antd'

const InstructorRevenue = () => {

    const [balance, setBalance] =useState({pending: []})
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        sendBalanceRequest()
    },[])

    const sendBalanceRequest = async() => {
        const {data} = await axios.get("/api/instructor/balance")
        setBalance(data)
        toast.success("account balance retrieved")
    }
    const handlePayoutSettings = async() => {
        try {
            setLoading(true)
            const {data} = await axios.get("/api/instructor/payout-settings")
            window.location.href = data

        } catch (error) {
            console.log(error.message)
            setLoading(false)
            toast.error(error.message)
        }
    }

    return(
        <InstructorRoute>
            <div className="container">
                <div className="row">
                    <div className="col offset-2">
                        <h2>Revenue Report</h2>
                        <hr />
                        <h4 >
                            Pending Balances: 
                            {balance.pending && balance.pending.map((bp,i)=>(
                                <span key={i} className="float-end">
                                    {stripeCurrentFormatter(bp)}
                                </span>
                            ))}
                        </h4>
                        <Button
                         onClick={handlePayoutSettings}
                        size="large"
                        shape="round"
                        disabled={loading}
                        className="bg-success">Check Account
                        </Button>

                    </div>
                </div>
            </div>

        </InstructorRoute>
    )
} 

export default InstructorRevenue