import { Link } from "react-router-dom"
import './../util.css'
import './signup.css'
import './login.css'
import {createRef, useState} from 'react'
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

function Login(props){

    const navigate = useNavigate();
    const email = createRef()
    const password = createRef()
    const [direct, setDirect] = useState('/login')
    const [loadSpinner, setLoadSpinner] = useState(false)

    function Login(el){
      props.loaderSet(true)
      el.preventDefault()
      if(email.current.value===''){
        props.loaderSet(false)
        utilError('please entre valid email id')
        return;
      }
      if(password.current.value===''){
        props.loaderSet(false)
        utilError('please entre valid password')
        return;
      }
      axios({
        method : 'POST',
        url : 'http://127.0.0.1:9999/api/v1/user/login',
        data : {
          email : email.current.value,
          password : password.current.value,
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
          navigate('/');
        }else{
          props.loaderSet(false)
          Swal.fire({
            title: "user not found",
            text: res.data.data.message,
            icon: "error",
            confirmButtonText: "close",
          });
        }
      })
    }

    return(
        <div className='signup flex flex-1'>
        <form className='formSignup flex flex-dir gap16'>
          <h2 className='subHead'>Login to your account</h2>
          
          
          <div className='cred flex flex-dir gap8'>
            <label className='label'>Email</label>
            <input ref={email} className='inp' placeholder='Email*' type='text'/>
          </div>
          <div className='cred flex flex-dir gap8'>
            <label className='label'>Password</label>
            <input ref={password} className='inp' placeholder='Password*' type='Password'/>
          </div>
          <Link to='/forgot'>Forgot password</Link>
          <button onClick={Login} className='submit border_btn border_btn_fill'>Login</button>
          <Link to='/open-acc' className="newAcc" >Open new account</Link>
          <Link to='/' className="newAcc" >Home</Link>

        </form>
      </div>
    )
}

export default Login;
