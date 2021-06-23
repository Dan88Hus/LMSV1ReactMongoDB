import {useState, useEffect, useContext} from 'react'
import {Context} from '../../context/index'
import InstructorRoute from '../../components/routes/InstructorRoute'
import axios from 'axios'
import {stripeCurrentFormatter} from '../../utils/helper'
import Link from 'next/link'
import {toast} from "react-toastify"

const InstructorRevenue = () => {

    const [balance, setBalance] =useState({pending: []})

    useEffect(()=>{
        sendBalanceRequest()
    },[])

    const sendBalanceRequest = async() => {
        const {data} = await axios.get("/api/instructor/balance")
        setBalance(data)
        toast.success("account balance retrieved")
    }
    const handlePayoutSettings = async() => {

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
                        <Link href="#">
                        <a onClick={handlePayoutSettings}>Payouts</a>
                        </Link>

                    </div>
                </div>
            </div>

        </InstructorRoute>
    )
} 

export default InstructorRevenue