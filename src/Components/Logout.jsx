import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const {logoutUser} = useContext(AuthContext)
    useEffect(()=> {
        logoutUser()
    },[])
}


export default Logout