import { InvoiceContext } from '@/Context/InvoiceContext'
import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet, replace } from 'react-router-dom'

const ProtectedRoute = () => {
    const {token, navigate}=useContext(InvoiceContext)
    
    useEffect(()=>{
        console.log(token)
    },[token])

    if(!token){
        console.log('yes')
return <Navigate to={'/'} replace/>
    }
    return <Outlet/>
}

export default ProtectedRoute