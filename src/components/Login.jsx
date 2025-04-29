import React from 'react'

const Login = () => {
  return (
 <div className='flex justify-center my-10'>
     <div className="card bg-base-200 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Login</h2>
        <fieldset className="fieldset">
          <legend className="email">Email</legend>
          <input type="email" className="input" placeholder="Type here" />
        </fieldset>  
        <fieldset className="fieldset">
          <legend className="password">Password</legend>
          <input type="text" className="input" placeholder="Type here" />
        </fieldset>  
          <div className="card-actions justify-center">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
 </div>
  )
}

export default Login