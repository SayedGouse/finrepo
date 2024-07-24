import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Cookies from 'js-cookie';
import { BASE_URL } from '../Auth/BASE_URL';
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function Login() {
  const navigate = useNavigate();
  const [status, setLoginStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const formSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!email) formErrors.email = "This field is required";
    if (!password) formErrors.password = "This field is required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      console.log("Data", email, password);
      const response = await axios.post(`${BASE_URL}/login`, { email, Password: password });
      console.log("Response Status Code:", response);

      if (response.status === 200) {
        const user = response.data;
        Cookies.set('email', user.Email);
        Cookies.set('token', user.Token);
        navigate('/dashboard');
      } else {
        setLoginStatus('Invalid password or email');
      }
    } catch (err) {
      console.log(err);
      setLoginStatus('Invalid password or email');
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='box'>
      <div className='container' style={{ width: '400px' }}>
        <div className='row'>
          <div style={{ marginTop: '35%', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
            <h3 style={{ textAlign: 'center', color: 'rgba(71, 108, 62, 1)', fontWeight: 'bold', fontFamily: "sans-serif", marginTop: '5%' }}>Welcome to the galaxy</h3>

            <form onSubmit={formSubmit} style={{ marginTop: '10%' }}>
              <div className='mt-2 mb-3'>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='form-control'
                  placeholder='Enter your Email'
                  required
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>
              <div className='mt-2 mb-3' style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='form-control'
                  placeholder='Password'
                  required
                />
                <div className='pass' style={{ position: 'absolute', right: '10px', top: '8px', cursor: 'pointer' }} onClick={togglePassword}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              </div>
              <div width={50} height={40}>
                {loading && <Loader width={30} height={30} />}
              </div>
              <div>
                <input
                  type='submit'
                  style={{ background: 'rgba(71, 108, 62, 1)' }}
                  className='btn form-control mt-2 mb-2 text-white'
                  value='Login'
                />
                <Link to='/signup' style={{ textDecoration: 'none', color: 'white', fontFamily:'sans-serif' }}><p>Don't Have an account?</p></Link>
                <p style={{ color: 'white', fontFamily:'sans-serif' }}>{status}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
