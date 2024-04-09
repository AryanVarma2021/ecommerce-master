import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../src/components/NavBar';

function PrivateRoute({ checkStatus}) {
    const loggin = checkStatus();
    
   

   
    
  return (
    <>

    
    
    
    {loggin ? <Outlet/> :  <Navigate to='/'/>}
    
    
    </>
  )
}

export default PrivateRoute