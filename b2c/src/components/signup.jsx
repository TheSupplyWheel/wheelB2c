import './signup.css'
import { Link } from 'react-router-dom';
import {createRef, useState, useReducer} from 'react'
import axios from 'axios'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function utilError(data){
  Swal.fire({
    title: "Success!",
    text: data,
    icon: "Success",
    confirmButtonText: "close",
  });
}

function SignUp(props){
  const navigate = useNavigate();
  const username = createRef()
  const email = createRef()
  const password = createRef()
  const address = createRef()
  const phone = createRef()

  function createAccount(el){
    el.preventDefault()
    props.loaderSet(true)
    if(username.current.value===''){
      props.loaderSet(false)
      utilError('please entre valid username')
      return
    }
    if(email.current.value===''){
      props.loaderSet(false)
      utilError('please entre valid email address')
      return
    }
    if(password.current.value===''){
      props.loaderSet(false)
      utilError('password must be more 8 charater long')
      return
    }
    if(password.current.value.split('').length<8){
      props.loaderSet(false)
      utilError('password must be more 8 charater long')
      return
    }
    if(address.current.value===''){
      props.loaderSet(false)
      utilError('please entre a valid address')
      return
    }
    if(phone.current.value===''){
      props.loaderSet(false)
      utilError('please entre a valid phone number')
      return
    }
    if(phone.current.value.split('').length<10){
      props.loaderSet(false)
      utilError('Phone number must be of 10 digit')
      return
    }
    axios({
      method : "POST",
      url : 'http://127.0.0.1:9999/api/v1/user/open-acc',
      data : {
        username : username.current.value,
        email : email.current.value,
        password : password.current.value,
        address : address.current.value,
        phone : phone.current.value,
        key : Math.trunc(Math.random()*789789789)
      }
    }).then(res=>{
      if(res.data.status==='success'){
        props.loaderSet(false)
        Swal.fire({
          title: "Success!",
          text: res.data.data.message,
          icon: "Success",
          confirmButtonText: "close",
        });
        navigate('/')
      }else{
        props.loaderSet(false)
        Swal.fire({
          title: "Success!",
          text: res.data.data.message,
          icon: "Success",
          confirmButtonText: "close",
        });
      }
    })
  }



    return(
      <div className='signup flex flex-1'>
        <form className='formSignup flex flex-dir gap16'>
          <h2 className='subHead'>Open Account</h2>
          <div className='cred flex flex-dir gap8'>
            <label className='label'>Username</label>
            <input ref={username} className='inp' placeholder='Username*' type='text'/>
          </div>
          <div className='cred flex flex-dir gap8'>
            <label className='label'>Email</label>
            <input ref={email} className='inp' placeholder='Email*' type='text'/>
          </div>
          <div className='cred flex flex-dir gap8'>
            <label className='label'>Password</label>
            <input ref={password} className='inp' placeholder='Password*' type='Password'/>
          </div>
          <div className='cred flex flex-dir gap8'>
            <label className='label'>Shipping Address</label>
            <input ref={address} className='inp' placeholder='Shipping Address*' type='text'/>
          </div>
          <div className='cred flex flex-dir gap8'>
            <label className='label'>Phone</label>
            <input ref={phone} className='inp' placeholder='Phone*' type='number'/>
          </div>
          <button onClick={createAccount}  className='submit border_btn border_btn_fill'>Open Account</button>
          <Link to='/login' className='backToLogin'>Login</Link>
          <Link to='/' className="newAcc" >Home</Link>

        </form>
      </div>
    )
  }

  export default SignUp;