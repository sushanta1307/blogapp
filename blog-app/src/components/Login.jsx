import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import {cookieContext} from '../context/CookieContext';
import "./styles.css"

const Login = () => {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const {setCookie, getCookie} = useContext(cookieContext);

    let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        if(json.success){
            //store the auth token as a cookie
            document.cookie = "authToken=" + json.authToken + ";path=/;";
            setCookie(getCookie("authToken"));
            navigate("/", { replace: true});
            console.log(json.authToken)
        }
        else{
            toast.error('Invalid login credentials',{
                autoClose: 3000,
                pauseOnHover: true
            })
        }
        
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
            <div className="row login">
                <form className="col s8 offset-s2" >
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" required={true} className="validate" name="email" value={credentials.email} onChange={onChange}/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" required={true} className="validate" name="password" value={credentials.password} onChange={onChange}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                <button onClick={handleSubmit} className="btn waves-effect waves-light s8 offset-s2" type="submit">Submit
                    <i className="material-icons right">send</i>
                </button>
                <p>Don't have an account? <Link to="/auth/signup">Create One</Link></p>
                <ToastContainer />
                </form>
            </div>
    )
}

export default Login
