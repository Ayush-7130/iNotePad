import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credential, setcredential] = useState({ email: "", password: "" });

    let Navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:5000/api/auth/login';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            props.showAlert("LogIn Successful", "success");
            Navigate('/');
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    };

    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value });
    };

    return (
        <div className='container w-50 space-t'>
            <h2>Login to continue to iNotePad</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-5">
                    <label htmlFor="email" className="form-label text-sel">Email address</label>
                    <input type="email" className="form-control" value={credential.email} id="email" aria-describedby="emailHelp" name='email' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-sel">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary text-sel">Submit</button>
            </form>
        </div>
    )
}

export default Login