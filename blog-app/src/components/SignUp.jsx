import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css"

const SignUp = () => {
  const [credentials, setCredentials] = useState({ firstName: '', lastName: '', email: '', password: '', cpassword: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (credentials.password !== credentials.cpassword) {
      console.log("Passwords don't match")
      return
    }

    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName: credentials.firstName, lastName: credentials.lastName, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      toast.success('Signed Up Successfully', {
        autoClose: 3000,
      });
    }
    else {
      toast.error('Some error Ocrured, Try Again', {
        autoClose: 3000,
      })
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="row login">
      <form className="col s8 offset-s2" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s6">
            <input id="firstName" type="text" name="firstName" required={true} className="validate" value={credentials.firstName} onChange={onChange} />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="input-field col s6">
            <input id="lastName" type="text" name="lastName" required={true} className="validate" value={credentials.lastName} onChange={onChange} />
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" name="email" required={true} className="validate" value={credentials.email} onChange={onChange} />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" required={true} name="password" className="validate" value={credentials.password} onChange={onChange} />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="cpassword" type="password" required={true} name="cpassword" className="validate" value={credentials.cpassword} onChange={onChange} />
            <label htmlFor="cpassword">Confirm Password</label>
          </div>
        </div>
        <button className="btn waves-effect waves-light s8 offset-s2" type="submit">Submit
          <i className="material-icons right">send</i>
        </button>
        <p>Have an account?  <Link to="/auth/login">Login Here</Link></p>
      </form>
      <ToastContainer />
    </div>
  )
}

export default SignUp