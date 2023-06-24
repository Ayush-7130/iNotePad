import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credential, setcredential] = useState({ name: "", email: "", password: "" });

  let Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/auth/createuser';
    const { name, email, password } = credential;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      props.showAlert("Successfully Signed Up", "success");
      Navigate('/');
    }
    else {
      props.showAlert("This Email is already exists", "danger");
    }
  };

  const onChange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className='container w-50 space-t'>
      <h2 className='pad-l'>Signup to use to iNotePad</h2>
      <form className='container' onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
          <label htmlFor="name" className="form-label text-sel">Name</label>
          <input type="name" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-sel">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-sel">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label text-sel">Confirm Password</label>
          <input type="cpassword" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary text-sel">Submit</button>
      </form>
    </div>
  )
}

export default Signup