import './../util.css'
import './complain.css'
import {createRef} from 'react'
import axios from 'axios'
import BottomMenu from './bottomMenu'
import Swal from 'sweetalert2'

function utilError(data){
    Swal.fire({
      title: "Success!",
      text: data,
      icon: "Success",
      confirmButtonText: "close",
    });
  }

function Complain(props){
    
    const subject = createRef()
    const description = createRef()

    function raiseTicket(el){
        props.loaderSet(true)
        el.preventDefault()
        if(subject.current.value===''){
            props.loaderSet(false)
            utilError('please add subject')
            return
        }
        if(description.current.value===''){
            props.loaderSet(false)
            utilError('please add description')
            return
        }
        axios({
            method : 'POST',
            url : 'http://127.0.0.1:9999/api/v1/user/complain',
            data : {
                subject : subject.current.value,
                description : description.current.value,
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


    return(
        <div className='complain'>
            <div className='complainBox flex flex-dir gap16 flex-1 pad16'>
                <h2 className='complainhead'>Raise ticket to complain</h2>
                <form className='complainform flex flex-dir gap16'>
                    <div className='cred flex flex-dir gap8'>
                        <label className='label'>Complain Subject</label>
                        <input ref={subject} className='inp' placeholder='subject*' type='text'/>
                    </div>
                    <div className='cred flex flex-dir gap8'>
                        <label className='label'>Complain Description</label>
                        <input ref={description} className='inp' placeholder='subject*' type='text'/>
                    </div>
                    <button onClick={raiseTicket} className='border_btn border_btn_fill'>Raise ticket</button>
                </form>
            </div>
            <BottomMenu/>
        </div>
    )
}

export default Complain;