import './../util.css'
import './feedback.css'
import BottomMenu from './bottomMenu'
import {useState, createRef} from 'react'
import axios from 'axios'
import Swal from "sweetalert2";

function utilError(data){
    Swal.fire({
      title: "Success!",
      text: data,
      icon: "Success",
      confirmButtonText: "close",
    });
  }

function Feedback(props){

    const feedbackMessage = createRef()

    function feedback(el){
        el.preventDefault()
        props.loaderSet(true)
        if(feedbackMessage.current.value===''){
            props.loaderSet(false)
            utilError('please add feedback first')
            return
        }
        axios({
            method : 'POST',
            url : 'http://127.0.0.1:9999/api/v1/user/feedback',
            data : {
                feedbackMessage : feedbackMessage.current.value
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
            }
        })
    }

    return (
        <div className='feedback'>
            <div className='feedbackForm pad16 flex flex-dir gap16'>
                <p className='feedHead'>Feedback</p>
                <form className='feedbackForm__'>
                    <div className='flex flex-dir gap8'>
                        <label className='rating'>Give your feedback</label>
                        <textarea ref={feedbackMessage} className='inp__updated inp_text'  rows="10" cols="50"></textarea>
                        <button onClick={feedback} className='border_btn border_btn_fill'>Submit your feedback</button>
                    </div>
                </form>
            </div>
            <BottomMenu/>
        </div>
    )
}

export default Feedback;