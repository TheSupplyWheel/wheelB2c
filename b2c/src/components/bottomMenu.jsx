import './bottom.css'
import './../util.css'
import Carrot from './../icon/carrot.png'
import Orange from './../icon/orange.png'
import All from './../icon/all.png'
import Male from './../icon/male.png'
import Home from './../icon/home.png'
import Cart from './../icon/cart.png'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

function BottomMenu(){


    const [activecart, setactiveacrt] = useState(0)

    function setCart1(){
        setactiveacrt(activecart=> 1)
    }

    function setCart2(){
        setactiveacrt(activecart=> 2)
    }

    
    return(
        <div className="menuBottom pad16 flex flex-1 gap24">
            <Link onClick={setCart1} to='/' className={activecart===1 ? 'cred menuBtn flex flex-dir flex-1 gap8 active' : 'cred menuBtn flex flex-dir flex-1 gap8'} >
                <img src={Home} alt='food' className='icon icon__'/>
                <label className='label label__'>Home</label>
            </Link>
            <Link onClick={setCart2} to='/cart' className={activecart===2 ? 'cred menuBtn flex flex-dir flex-1 gap8 active' : 'cred menuBtn flex flex-dir flex-1 gap8'}>
                <img src={Cart} alt='food' className='icon icon__'/>
                <label className='label label__'>Cart</label>
            </Link>
            <Link to='/all-products' className='cred menuBtn flex flex-dir flex-1 gap8'>
                <img src={All} alt='food' className='icon icon__'/>
                <label className='label label__'>All products</label>
            </Link>
            <Link to='/setting' className='cred menuBtn flex flex-dir flex-1 gap8'>
                <img src={Male} alt='food' className='icon icon__'/>
                <label className='label label__'>Account</label>
            </Link>
            
        </div>
    )
}

export default BottomMenu;