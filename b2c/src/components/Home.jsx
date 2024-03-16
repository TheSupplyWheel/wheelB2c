import './../util.css'
import './home.css'
import { Link } from 'react-router-dom';
function Home(){
    return(
      <div className='home flex flex-1 flex-dir gap16'>
        <p className='susidary'>Order Fresh Life powered by The Supply Wheel</p>
        <h1 className="headingOrder">Welcome to <br></br> <span>Order Fresh Life</span>  </h1>
        <div className='btns grid grid-2-col gap16 flex-1'>
            <Link to='/login' className='border_btn border_btn_fill border_btn_white'>Login</Link>
            <Link to='/open-acc' className='border_btn border_btn_fill border_btn_white'>Open Account</Link>
        </div>
      </div>
    )
  }

  export default Home;