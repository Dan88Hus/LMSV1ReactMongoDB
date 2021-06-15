import { useState, useContext} from 'react'
import {Context} from '../../context/index'
import UserRoute from '../../components/routes/UserRoute'

const UserIndex = () => {
    const {state: {user}, dispatch} = useContext(Context)
    // state
        

    return (
    <UserRoute>
    <h1 className="text-center">
        User Dashboard
    </h1>
    </UserRoute>
    ) 
}
export default UserIndex