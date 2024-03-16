import './App.css';
import './util.css'


import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import SignUp from './components/signup';
import Login from './components/login';
import Main from './components/main';
import AllProducts from './components/allProducts';
import Cart from './components/cart';
import Fruits from './components/fruits';
import Vegetable from './components/vegetable';
import PlacedOrders from './components/placedOrders';
import History from './components/history';
import Contact from './components/contact';
import Feedback from './components/feedback';
import Setting from './components/setting';
import Forgot from './components/forgot';
import Complain from './components/complain';
import Terms from './components/terms';
import Refund from './components/refund';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {

  const [updatingCartCount, setupdatingCartCount] = useState(false)

  function updatingCartCountfun(cond){
    setupdatingCartCount(updatingCartCount=> cond)
  }

  function NotFound(){
    const navigate = useNavigate()
    useEffect(el=>{
      navigate('/main');
    }, [])
    return(
      <div className=''>not found</div>
    )
  }

  const [loader, setLoader] = useState(false)
  const [filterpass, setFilterPass] = useState('')

  function loaderSet(cond){
    setLoader(loader=> cond)
  }

  function filterPassing(cond){
    setFilterPass(filterpass=> cond)
  }

  return (
    <div className='app'>
      {loader && 
        <div className='loaderbox flex flex-1'>
          <div class="loader"></div>
        </div>
      }
      <BrowserRouter>
        <Routes>
          {/* <Route path='' element={<Home/>}/> */}
          <Route path='open-acc' element={<SignUp loaderSet={loaderSet} />}/>
          <Route path='login' element={<Login loaderSet={loaderSet} />}/>
          <Route path='/' element={<Main filterPassing={filterPassing} />}/>
          <Route path='all-products' element={<AllProducts loaderSet={loaderSet} filterpass={filterpass} updatingCartCountfun={updatingCartCountfun} />}/>
          <Route path='cart' element={<Cart loaderSet={loaderSet} updatingCartCount={updatingCartCount} />}/>
          <Route path='fruits' element={<Fruits/>}/>
          <Route path='vegetables' element={<Vegetable/>}/>
          <Route path='placed' element={<PlacedOrders loaderSet={loaderSet} />}/>
          <Route path='history' element={<History loaderSet={loaderSet} />}/>
          <Route path='contact' element={<Contact loaderSet={loaderSet} />}/>
          <Route path='feedback' element={<Feedback loaderSet={loaderSet} />}/>
          <Route path='setting' element={<Setting loaderSet={loaderSet} />}/>
          <Route path='forgot' element={<Forgot loaderSet={loaderSet} />}/>
          <Route path='complain' element={<Complain loaderSet={loaderSet} />}/>
          <Route path='terms-conditions' element={<Terms loaderSet={loaderSet} />}/>
          <Route path='refund' element={<Refund loaderSet={loaderSet} />}/>
          <Route path='*' element={<NotFound loaderSet={loaderSet} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
