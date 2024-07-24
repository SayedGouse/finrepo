import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { BASE_URL } from '../Auth/BASE_URL';

function SignUp() {
  const navigate = useNavigate();
  const [status, setLoginStatus] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setlName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const data = {
    FullName: fName + " " + lName,
    Email: email,
    Address: address,
    PhoneNo: phoneNo,
    Password: password
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!fName) formErrors.fName = "This field is required";
    if (!lName) formErrors.lName = "This field is required";
    if (!phoneNo) formErrors.phoneNo = "This field is required";
    if (!address) formErrors.address = "This field is required";
    if (!email) formErrors.email = "This field is required";
    if (!password) formErrors.password = "This field is required";
    if (!confirmPassword) formErrors.confirmPassword = "This field is required";

    if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setLoading(true);

    axios
      .post(`${BASE_URL}/register`, data)
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          alert("Thank You For Registration Please Login");
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginStatus('Invalid password or email');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showconfirmPassword);
  };

  return (
    <div className='box'>
      <div className='container' style={{ width: '400px' }}>
        <div className='row'>
          <div style={{ marginTop: '30%', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
            <h3 style={{ textAlign: 'center', color: 'rgba(71, 108, 62, 1)', fontWeight: 'bold', marginTop: '5%', fontFamily: 'sans-serif' }}>Welcome to the galaxy</h3>

            <form onSubmit={formSubmit} style={{ marginTop: '10%' }}>
              <div className='mt-2 mb-3'>
                <input
                  type='text'
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  className='form-control'
                  placeholder='First Name'
                  required
                />
                {errors.fName && <p style={{ color: 'white'  }}>{errors.fName}</p>}
              </div>
              <div className='mt-2 mb-3'>
                <input
                  type='text'
                  value={lName}
                  onChange={(e) => setlName(e.target.value)}
                  className='form-control'
                  placeholder='Last Name'
                  required
                />
                {errors.lName && <p style={{ color: 'white' }}>{errors.lName}</p>}
              </div>
              <div className='mt-2 mb-3'>
                <input
                  type='text'
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className='form-control'
                  placeholder='Phone No'
                  required
                />
                {errors.phoneNo && <p style={{color: 'white'  }}>{errors.phoneNo}</p>}
              </div>
              <div className='mt-2 mb-3'>
                <textarea
                  type='text'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className='form-control'
                  placeholder='Address'
                  required
                />
                {errors.address && <p style={{ color: 'white'  }}>{errors.address}</p>}
              </div>
              <div className='mt-2 mb-3'>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='form-control'
                  placeholder='Enter your Email'
                  required
                />
                {errors.email && <p style={{ color: 'white'  }}>{errors.email}</p>}
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
                <div className='pass' onClick={togglePassword}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
                {errors.password && <p style={{ color: 'white'  }}>{errors.password}</p>}
              </div>
              <div className='mt-2 mb-3' style={{ position: 'relative' }}>
                <input
                  type={showconfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='form-control'
                  placeholder='Confirm Password'
                  required
                />
                <div className='pass' onClick={toggleConfirmPassword}>
                  {showconfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
                {errors.confirmPassword && <p style={{ color: 'white' }}>{errors.confirmPassword}</p>}
              </div>

              <div width={50} height={40}>
                {loading && <Loader width={30} height={30} />}
              </div>
              <div>
                <input
                  type='submit'
                  style={{ background: 'rgba(71, 108, 62, 1)' }}
                  className='btn form-control mt-2 mb-2 text-white'
                  value='SignUp'
                />
                <Link to='/' style={{ textDecoration: 'none', color: 'white', fontFamily:'sans-serif' }}>
                  <p>Already User</p>
                </Link>

                <p style={{ color: 'white', fontFamily:'sans-serif' }}>{status}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
