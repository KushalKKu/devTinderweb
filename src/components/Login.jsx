import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
const Login = () => {

  const [emailId, setEmailId] = useState('john.doe@example.com')
  const [password, setPassword] = useState('JohnDoe@1')
  const [error, setError] = useState('')
  const dispatch = useDispatch()  
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const res = await axios.post(BASE_URL+'/login',
        { emailId, password }, { withCredentials: true })
      console.log(res?.data);
      dispatch(addUser(res?.data))
      navigate("/feed")
    } catch (err) {
      console.log("Error in login")
      setError(err?.response?.data.message || "Something went wrong")
      console.log(err)
    }
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div className="card w-full max-w-sm shadow-md bg-base-200">

        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset">
            <legend className="email">Email</legend>
            <input type="email" value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input" placeholder="Type here" />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="password">Password</legend>
            <input type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input" placeholder="Type here" />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
