import './../util.css'
import './forgot.css'
import { Link } from 'react-router-dom'
import {useState, useEffect, createRef} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


function utilError(data){
    Swal.fire({
      title: "Success!",
      text: data,
      icon: "Success",
      confirmButtonText: "close",
    });
  }

function Forgot(){

    const navigate = useNavigate();
    const email = createRef()
    const key = createRef()
    const password = createRef()
    const confirmPass = createRef()

    function forgotPassword(el){
        el.preventDefault()
        if(email.current.value===''){
            utilError('please entre a valid email address')
            return
        }

        if(key.current.value===''){
            utilError('please entre a valid key')
            return
        }

        if(password.current.value===''){
            utilError('password must be off 8 character long')
            return
        }

        if(password.current.value.split('').length<8){
            utilError('password must be off 8 character long')
            return
        }

        if(password.current.value!==confirmPass.current.value){
            utilError('Confirm password must be same as of password')
            return
        }

        axios({
            method : 'POST',
            url : 'http://127.0.0.1:9999/api/v1/user/forgot',
            data : {
                email : email.current.value,
                key : key.current.value,
                password : password.current.value,
                confirmPass : confirmPass.current.value,
            }
        }).then(res=>{
            if(res.data.status==='success'){
                Swal.fire({
                    title: "Success!",
                    text: res.data.data.message,
                    icon: "Success",
                    confirmButtonText: "close",
                });
                navigate('/login')
            }else{
                Swal.fire({
                    title: "user not found!",
                    text: res.data.data.message,
                    icon: "error",
                    confirmButtonText: "close",
                });
            }
        })
    }




    return(
        <div className='forgot pad16 flex flex-dir gap16 flex-1'>
            <Link to='/' className='backArrow'>&larr;</Link>
            <h2 className='forgothead'>Forgot password</h2>
            <form className='formForgot flex flex-dir gap16'>
                <div className='credentials flex flex-dir gap8'>
                    <label className='label'>Email</label>
                    <input ref={email} className='inp' placeholder='email*' type='text'/>
                </div>
                <div className='credentials flex flex-dir gap8'>
                    <label className='label'>Security key</label>
                    <input ref={key} className='inp' placeholder='key*' type='text'/>
                </div>
                <div className='credentials flex flex-dir gap8'>
                    <label className='label'>New Password</label>
                    <input ref={password} className='inp' placeholder='New password*' type='password'/>
                </div>
                <div className='credentials flex flex-dir gap8'>
                    <label className='label'>Confirm Password</label>
                    <input ref={confirmPass} className='inp' placeholder='New password*' type='password'/>
                </div>
                <div className='credentials flex flex-dir gap8'>
                    <label className='label'>Change password</label>
                    <button onClick={forgotPassword} className='border_btn border_btn_fill'>Change password</button>
                </div>
            </form>
        </div>
    )
}

export default Forgot