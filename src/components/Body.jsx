import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  },[]);


  return (
    <div>
      <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto px-4 py-2 bg-base-100">
        <Outlet />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Footer />
      </div>
    </div>
    </div>
  )
}

export default Body