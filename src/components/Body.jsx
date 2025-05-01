import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
const Body = () => {
  const dispatch = useDispatch()

  const fetchUser =async () =>{ 
  try{
    const res = await axios.get(BASE_URL + '/profile/view',{withCredentials:true})
    console.log("frombody",res.data)
    dispatch(addUser(res.data))
  }catch(err){
    console.log(err)
  }
};

useEffect(()=>{
  fetchUser()
},[])
  return (
    <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
    </div>
  )
}

export default Body