import React from 'react'
import { Navigate } from 'react-router-dom'

// Element wrapper to display elements only when authenticated.
export default function ProtectedRouter({children}){

    return (
       sessionStorage.getItem("token") ? children : <Navigate to="/"/>
    )
}
