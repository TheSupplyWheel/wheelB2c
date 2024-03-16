import './../util.css'
import './setting.css'
import BottomMenu from './bottomMenu'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useEffect, useState, createRef} from 'react'
import Pencil from './../icon/pencil.png'
import Close from './../icon/close.png'

function Setting(){

    const [creds, setCreds] = useState({})
    const address = createRef()
    const [openUpdateAddress, setOpenUpdateAddress] = useState(false)

    useEffect(el=>{
        axios({
            method : 'GET',
            url : 'http://127.0.0.1:9999/api/v1/user/sending-user'
        }).then(res=>{
            if(res.data.status==='success'){
                setCreds(creds=> res.data.data.user)
            }
        })
    }, [])

    function addressUpdateVisible(){
        setOpenUpdateAddress(openUpdateAddress=> true)
    }

    function addressUpdateVisibleClose(){
        setOpenUpdateAddress(openUpdateAddress=> false)
    }

    function changeAddress(){
        axios({
            method : 'POST',
            url : 'http://127.0.0.1:9999/api/v1/user/change-address',
            data : {
                address : address.current.value
            }
        }).then(res=>{
            if(res.data.status==='success'){
                setCreds(creds=> res.data.data.user)
                setOpenUpdateAddress(openUpdateAddress=> false)
            }

        })
    }

    return(
        <div className='setting flex flex-dir'>
            <div className='settingBox flex flex-dir pad16 gap16'>
                <p className='settingHead'>Setting</p>
                <Link to='/forgot' className='linkCentre border_btn border_btn_fill'>Forgot password</Link>
                <Link to='/complain' className='linkCentre border_btn border_btn_fill'>Add Complain</Link>
                <div className='changeaddress flex flex-dir gap16'>
                    <div className='changeadd flex flex-align gap16'>
                        <p className='addressChange'>Change Address</p>
                        {openUpdateAddress ? <img onClick={addressUpdateVisibleClose} src={Close} alt='update' className='icon__'/> : <img onClick={addressUpdateVisible} src={Pencil} alt='update' className='icon__'/>}
                    </div>
                    <p className='addresscurrent'>{creds.address}</p>
                    {openUpdateAddress && <input ref={address} className='inp inp__updated' placeholder='new address' type='text'/> }
                    {openUpdateAddress && <button onClick={changeAddress} className='border_btn border_btn_fill'>Update address</button> }
                </div>
            </div>
            <BottomMenu/>
        </div>
    )
}


export default Setting