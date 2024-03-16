import "./../util.css";
import "./main.css";
import Menu from "./../icon/menu.png";
import BottomMenu from "./bottomMenu";
import Carrot from "./../icon/carrot.png";
import Cado from "./../icon/cado.png";
import Close from "./../icon/close.png";
import Home from "./../icon/home.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import Frame1 from "./../icon/Frame1.png";
import Pro from "./../icon/pro1.png";
import Pro2 from "./../icon/pro2.png";
import Combo from "./../icon/combo.jpg";
import allo from './../icon/potato.png'
import Ginger from './../icon/ginger.png'
import Taro from './../icon/taro.png'
import Amla from './../icon/amla.png'
import Baigan from './../icon/eggplant.png'
import Bhindi from './../icon/bhindi.png'
import Beans from './../icon/green-beans.png'
import Golgiya from './../icon/golgiya.png'
import Dhaniya from './../icon/coriander.png'
import GreenChili from './../icon/green-chilli.png'
import GreenOnion from './../icon/green-onion.png'
import Halwa from './../icon/halwa.png'
import Cocumber from './../icon/cucumber.png'
import Karela from './../icon/karela.png'
import Lokki from './../icon/long.png'
import Garlic from './../icon/garlic.png'
import desiKheera from './../icon/desikheeraa.png'
import Radish from './../icon/radish.png'
import Lemon from './../icon/lemon.png'
import Onion from './../icon/onion.png'
import Cabbage from './../icon/cabbage.png'
import Mint from './../icon/spice.png'
import Phool from './../icon/cauliflower.png'
import Spinach from './../icon/spinach.png'
import Shimla from './../icon/shimla.png'
import Lotus from './../icon/lotus.png'
import Jack from './../icon/jack.png'
import turi from './../icon/farm.png'
import tomato from './../icon/tomato.png'
import corn from './../icon/corn.png'
import basil from './../icon/basil.png'
import broccoli from './../icon/broccoli.png'
import cherry from './../icon/cherries.png'
import celery from './../icon/celery.png'
import lettuce from './../icon/lettuce.png'
import lettuce1 from './../icon/lettuce1.png'
import parsley from './../icon/parsley.png'
import peel from './../icon/peel.png'
import bellr from './../icon/bellr.png'
import belly from './../icon/belly.png'
import redcab from './../icon/red-cabbage.png'
import zucg from './../icon/zucchini.png'
import zucy from './../icon/zucchiniy.png'
import Apple from './../icon/apple.png'
import anar from './../icon/anar.png'
import guava from './../icon/guava.png'
import kela from './../icon/banana.png'
import grapes from './../icon/grapes.png'
import melon from './../icon/melon.png'
import kiwi from './../icon/kiwi.png'
import mango from './../icon/mango.png'
import Orange from './../icon/orange.png'
import pine from './../icon/pineapple.png'
import papita from './../icon/papaya.png'
import beet from './../icon/beet.png'
import noimg from './../icon/no-pictures.png'
import watermelon from './../icon/watermelon.png'
import { useNavigate } from 'react-router-dom';
import AllFruit from './../icon/allfruit.png'
import AllVeg from './../icon/allveg.png'
import AllFrz from './../icon/allfrozen.png'



function Main(props) {
  const navigate = useNavigate();
  const [sidebarStatus, setSideBarStatus] = useState(true);
  const [existingCartTomain, setExistingCarttoMain] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [english, setEnglish] = useState([]);
  const [frozen, setFrozen] = useState([]);
  const [comboOffer, setComboOffer] = useState([]);
  const [comboUnits, setComboUnits] = useState('');


 
  function openSideBar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.transition = "all 0.5s";

    sidebar.style.left = "0";
    setSideBarStatus((sidebarStatus) => false);
  }

  function closeSideBar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.transition = "all 0.5s";

    sidebar.style.left = "-100%";
    setSideBarStatus((sidebarStatus) => true);
  }

  function loggingOut() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:9999/api/v1/user/logout",
    }).then((res) => {
      if (res.data.status === "success") {
        navigate('/login');
        Swal.fire({
          title: "Success!",
          text: res.data.data.message,
          icon: "Success",
          confirmButtonText: "close",
        });

      }
    });
  }

  async function otp() {
    const options = {
      method: "POST",
      url: "https://2factor.in/API/V1/ca6e0ae0-e223-11ee-8cbb-0200cd936042/SMS/+919478181139/AUTOGEN/OTP1",

      data: {
        Status: "Success",
        Details: "l60gaseavbemjvlgw7o-7303503698702e11",
        OTP: "565059",
      },
    };

    const response = await axios.request(options);
    console.log(response);
  }

  useEffect((el) => {
    axios({
      method: "get",
      url: "http://127.0.0.1:9999/api/v1/product/home-stuff",
    }).then((res) => {
      if (res.data.status === "success") {
        setFruits((fruits) => res.data.data.fruits);
        setVegetables(vegetables=> res.data.data.vegetables)
        setEnglish(english => res.data.data.english)
        setFrozen(frozen=> res.data.data.frozen)
        setComboOffer(comboOffer=> res.data.data.combo)
      }
    });
  }, []);

  useEffect((el) => {
    axios({
      method: "get",
      url: "http://127.0.0.1:9999/api/v1/product/all-products",
    }).then((res) => {
      if (res.data.status === "success") {
        setExistingCarttoMain((existingCartTomain) => res.data.data.nameArr);
      }
    });
  }, []);

  function addToCart(el) {
    axios({
      method: "POST",
      url: "http://127.0.0.1:9999/api/v1/user/add-to-cart",
      data: {
        itemName: el.target.parentNode.children[1].textContent,
        price: el.target.parentNode.children[2].textContent.split("/-")[0],
        units:
          el.target.parentNode.children[3].textContent.split("gm")[0] / 1000,
      },
    }).then((res) => {
      if (res.data.status === "success") {
        Swal.fire({
          title: "Success!",
          text: res.data.data.message,
          icon: "Success",
          confirmButtonText: "close",
        });
        setExistingCarttoMain((existingCartTomain) => res.data.data.nameArr);
      }
    });
  }

  function addingComboOfferToCart(el){
    el.preventDefault()
    const listArr = [...el.target.parentNode.parentNode.children]
    const quantity = el.target.parentNode.children[0]
    const count = listArr.length
    let runningCount = 0
    const finalist = []
    listArr.forEach(el=>{
        if(runningCount === count-1){
            return
        }
        runningCount++
        const obj = {
            name : el.textContent.split('|')[0],
            quantity : el.textContent.split('|')[1]!=='' ? el.textContent.split('|')[1].split('gm')[0]/1000 : Number(quantity.value) 
        }
        finalist.push(obj)
    })
    axios({
        method : 'POST',
        url : 'http://127.0.0.1:9999/api/v1/user/combo-offer',
        data : {
            list : finalist
        }
    })
  }

  function exploreToFruits(){
    props.filterPassing('fruits')
    navigate('/all-products')
  }
  function exploreToVege(){
    props.filterPassing('vegetables')
    navigate('/all-products')
  }
  function exploreToEng(){
    props.filterPassing('english')
    navigate('/all-products')
  }
  function exploreToFrozen(){
    props.filterPassing('frozen')
    navigate('/all-products')
  }

  return (
    <div className="main">
      <div className="sidebar  flex flex-dir gap16">
        <h2 className="sidebarMenu">Additional facalities</h2>
        <div className="flex flex-dir ">
          <Link to="/open-acc" className="sidebarBtn">
              &rarr; Create account
          </Link>
          <Link to="/login" className="sidebarBtn">
              &rarr; Login to your account
          </Link>
          <Link to="/placed" className="sidebarBtn">
            &rarr; Placed orders
          </Link>

          {/* <Link to='/history' className='sidebarBtn'>&rarr; History</Link> */}
          <Link to="/contact" className="sidebarBtn">
            &rarr; Contact us
          </Link>

          <Link to="/feedback" className="sidebarBtn">
            &rarr; Feedback
          </Link>


          <Link to="/terms-conditions" className="sidebarBtn">
            &rarr; Terms & conditions
          </Link>

          <Link to="/refund" className="sidebarBtn">
            &rarr; Refund policy
          </Link>

          <Link to="/complain" className="sidebarBtn">
            &rarr; Complain your issue
          </Link>

          <Link to="/forgot" className="sidebarBtn">
            &rarr; Change your password
          </Link>

          <Link to="/setting" className="sidebarBtn">
            &rarr; Setting
          </Link>

          <Link onClick={loggingOut} to="/" className="sidebarBtn">
            &rarr; Logout
          </Link>

        </div>
      </div>
      <div className="top flex flex-2 pad16">
        <div className="letterbox">
          <p className="letter">W</p>
        </div>
        <p className="comp">Order Fresh Life</p>
        {sidebarStatus ? (
          <img
            onClick={openSideBar}
            src={Menu}
            className="icon icon__ sidebarImgAsBtn"
            alt="icon"
          />
        ) : (
          <img
            onClick={closeSideBar}
            src={Close}
            className="icon icon__ sidebarImgAsBtn"
            alt="icon"
          />
        )}
      </div>
      <div className="middle   gap16">
        <div className="desc pad8 flex flex-dir flex-1">
          <p className="dess">Order by XX:XX & get next day delivery</p>
          <p className="dess">Get fresh fruits & vegetable at door step</p>
        </div>
        <div className="promotionbox pad16">
          <h1 className="welcomeToApp">
            Welcome to <br /> <span>&mdash; Order fresh life &mdash;</span>
          </h1>
          <div class="scroll-left">
            <div className="srco flex  gap16">
              <div className="boxxx pad8 flex flex-dir gap16">
                <img src={Apple} className="lens" alt="lens" />
                <p className="name displayName">Fresh fruits</p>
              </div>
              <div className="boxxx pad8 flex flex-dir gap16">
                <img src={Carrot} className="lens" alt="lens" />
                <p className="name displayName">Fresh vegetables</p>
              </div>
              <div className="boxxx pad8 flex flex-dir gap16">
                <img src={basil} className="lens" alt="lens" />
                <p className="name displayName">Exostic vegetables</p>
              </div>
              <div className="boxxx pad8 flex flex-dir gap16">
                <img src={Orange} className="lens" alt="lens" />
                <p className="name displayName">Fresh fruits</p>
              </div>
            </div>
          </div>
        </div>

        <Link to="/all-products" className="fruitsMove">
          <div className="fruits pad16 flex flex-dir gap8">
            <p className="sub">We have fresh fruits</p>
            <p className="explain">
              Our fruits are fresh and dirt free with full premium quality and
              fully system delivery
            </p>
            <div className="flex flex-1 gap32">
                {fruits.slice(0,4).map(el=>
                    <div className="flex flex-dir flex-1 gap8">
                      {el.name==='apple' && <img src={Apple} className="icon icon__" alt="fruits" />}
                      {el.name==='anar' && <img src={anar} className="icon icon__" alt="fruits" />}
                      {el.name==='amrood' && <img src={guava} className="icon icon__" alt="fruits" />}
                      {el.name==='banana' && <img src={kela} className="icon icon__" alt="fruits" />}
                      <p className="toppum">{el.name}</p>
                    </div>
                )}
            </div>
          </div>
        </Link>

        <Link to="/all-products" className="fruitsMove">
          <div className="vegies fruits pad16 flex flex-dir gap8">
            <p className="sub">We have fresh vegeies</p>
            <p className="explain">
              Our fruits are fresh and dirt free with full premium quality and
              fully system delivery
            </p>
            <div className="flex flex-1 gap32">
                {vegetables.slice(0,4).map(el=>
                    <div className="flex flex-dir flex-1 gap8">
                      {el.name==='allo' && <img src={allo} className="icon icon__" alt="fruits" />}
                      {el.name==='adrak' && <img src={Ginger} className="icon icon__" alt="fruits" />}
                      {el.name==='arbi' && <img src={Taro} className="icon icon__" alt="fruits" />}
                      {el.name==='amla' && <img src={Amla} className="icon icon__" alt="fruits" />}
                      <p className="toppum">{el.name}</p>
                    </div>
                )}
            </div>
          </div>
        </Link>
        <div className="pro">
          <img src={Pro2} alt="pro" className="promotionIm pro2" />
        </div>
        {/* <p className="special specialIndependent">Special catagory</p> */}
        {/* <div className="english fruits pad16 flex flex-dir gap8">
          <p className="sub">We have english fruits & vegetables</p>
          <p className="explain">
            Our fruits are fresh and dirt free with full premium quality and
            fully system delivery
          </p>
          <div className="flex flex-1 gap32">
            {english.slice(0,4).map(el=>
                <div className="flex flex-dir flex-1 gap8">
                    {el.name==='baby corn' && <img src={allo} className="icon icon__" alt="fruits" />}
                    {el.name==='adrak' && <img src={Ginger} className="icon icon__" alt="fruits" />}
                    {el.name==='arbi' && <img src={Taro} className="icon icon__" alt="fruits" />}
                    {el.name==='amla' && <img src={Amla} className="icon icon__" alt="fruits" />}
                    <p className="toppum">{el.name}</p>
                </div>
            )}
          </div>
        </div> */}

        <div className="addProductDirectTocart direct flex flex-dir gap16">
          <p className="special">&mdash; Explore our fruit exibition</p>
          <div className="addtocartbox flex pad8 gap16">
            {fruits.map((el) => (
              <div
                className={
                  existingCartTomain.includes(el.name)
                    ? "productbox pad16 flex flex-dir gap8 activated"
                    : "productbox pad16 flex flex-dir gap8"
                }
              >
                                      
                {el.name==='apple' && <img src={Apple} className="icon" alt="fruits" />}
                {el.name==='anar' && <img src={anar} className="icon" alt="fruits" />}
                {el.name==='amrood' && <img src={guava} className="icon" alt="fruits" />}
                {el.name==='banana' && <img src={kela} className="icon" alt="fruits" />}
                {el.name==='babbu gosha' && <img src={noimg} className="icon" alt="fruits" />}
                
                <p className="name">{el.name}</p>
                <p className="name">{el.price}/- kg.</p>
                <p className="name">500gm</p>
                {existingCartTomain.includes(el.name) ? (
                  <button className="addcart">Added</button>
                ) : (
                  <button onClick={addToCart} className="addcart">
                    Add+
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="addProductDirectTocart direct flex flex-dir gap16">
          <p className="special">&mdash; Explore our vegetable exibition</p>
          <div className="addtocartbox pad8 flex gap16">
            {vegetables.map((el) => (
              <div className={
                existingCartTomain.includes(el.name)
                  ? "productbox productbox pad16 flex flex-dir gap8 activated"
                  : "productbox productbox pad16 flex flex-dir gap8"
              }>
                {el.name==='allo' && <img src={allo} className="icon" alt="fruits" />}
                {el.name==='adrak' && <img src={Ginger} className="icon" alt="fruits" />}
                {el.name==='arbi' && <img src={Taro} className="icon" alt="fruits" />}
                {el.name==='amla' && <img src={Amla} className="icon" alt="fruits" />}
                {el.name==='baigan' && <img src={Baigan} className="icon" alt="fruits" />}
                
                <p className="name">{el.name}</p>
                <p className="name">{el.price}/- kg.</p>
                <p className="name">500gm</p>
                {existingCartTomain.includes(el.name) ? (
                  <button className="addcart">Added</button>
                ) : (
                  <button onClick={addToCart} className="addcart">
                    Add+
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="addProductDirectTocart direct flex flex-dir gap16">
          <p className="special">We have english items as well</p>
          <div className="addtocartbox pad8 flex gap16">
            {english.map((el) => (
              <div className={
                existingCartTomain.includes(el.name)
                  ? "productbox productbox pad16 flex flex-dir gap8 activated"
                  : "productbox productbox pad16 flex flex-dir gap8"
              }>
                <img src={Orange} className="icon" alt="fruit" />
                <p className="name">{el.name}</p>
                <p className="name">{el.price}/- kg.</p>
                <p className="name">500gm</p>
                {existingCartTomain.includes(el.name) ? (
                  <button className="addcart">Added</button>
                ) : (
                  <button onClick={addToCart} className="addcart">
                    Add+
                  </button>
                )}
              </div>
            ))}
          </div>
        </div> */}

        <div className="pro">
          <img src={Pro} alt="pro" className="promotionIm" />
        </div>

        <div className="explore_catagories grid grid-2-col gap16 pad16">
          <p className="special catalogTopHead">&mdash; Explore our catagories</p>
          
          <button onClick={exploreToFruits} className="btncatalog" >
            <div className="catalog pad16 flex flex-1 flex-dir gap16">
              <img src={AllFruit} className="icon" alt="fruits"/>
              <p className="catalogNames">Fruits</p>
            </div>
          </button>

          <button onClick={exploreToVege} className="btncatalog" >
            <div className="catalog pad16 flex flex-1 flex-dir gap16">
              <img src={AllVeg} className="icon" alt="fruits"/>
              <p className="catalogNames">Vegetables</p>
            </div>
          </button>


          <button onClick={exploreToEng} className="btncatalog" >
            <div className="catalog pad16 flex flex-1 flex-dir gap16">
              <img src={Cado} className="icon" alt="fruits"/>
              <p className="catalogNames">English items</p>
            </div>
          </button>

          <button onClick={exploreToFrozen} className="btncatalog" >
            <div className="catalog pad16 flex flex-1 flex-dir gap16">
              <img src={AllFrz} className="icon" alt="fruits"/>
              <p className="catalogNames">Frozen items</p>
            </div>
          </button>


        </div>

        {/* <div className="addProductDirectTocart direct flex flex-dir gap16">
          <p className="special">We have frozen items as well</p>
          <div className="addtocartbox frozenList pad8 flex gap16">
            
            {frozen.map((el) => (
                
              <div className={
                existingCartTomain.includes(el.name)
                  ? "productbox productbox pad16 flex flex-dir gap8 activated"
                  : "productbox productbox pad16 flex flex-dir gap8"
              }>
                <img src={Orange} className="icon" alt="fruit" />
                <p className="name">{el.name}</p>
                <p className="name">{el.price}/- kg.</p>
                <p className="name">500gm</p>

                {existingCartTomain.includes(el.name) ? (
                  <button className="addcart">Added</button>
                ) : (
                  <button onClick={addToCart} className="addcart">
                    Add+
                  </button>
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="addProductDirectTocart direct flex flex-dir gap16">
          <p className="special">Choose combo offers</p>
          <div className="comboOfferSlider flex gap16 mar8">
            {comboOffer.map((el) => (
              <div className="combo comboGrid grid grid-3-col">
                <img
                  src={Combo}
                  alt="combo offersh"
                  className="comboOfferImg"
                />
                <div className="offerContent pad8 grid grid-2-col gap8">
                    {el.items.map(el=>
                        <p className="offercombo">{el.name}|{el.units ? el.units : ''}</p>
                    )}
                  <form className="offerOrderform flex flex-1 gap8">
                    <select className="inp_updated inp__mini">
                      <option className="opt" value="quantity">
                        quantity
                      </option>
                      <option className="opt" value="0.5">
                        0.5kg
                      </option>
                      <option className="opt" value="1">
                        1kg
                      </option>
                      <option className="opt" value="1.5">
                        1.5kg
                      </option>
                      <option className="opt" value="2">
                        2kg
                      </option>
                      <option className="opt" value="2.5">
                        2.5kg
                      </option>
                      <option className="opt" value="3">
                        3kg
                      </option>
                      <option className="opt" value="3.5">
                        3.5kg
                      </option>
                      <option className="opt" value="4">
                        4kg
                      </option>
                      <option className="opt" value="4.5">
                        4.5kg
                      </option>
                      <option className="opt" value="5">
                        5kg
                      </option>
                    </select>
                    <p className="priceForperkg">399/- kg</p>
                    <buttom onClick={addingComboOfferToCart} className="ordernowBtn">Add + </buttom>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div> */}

      
      </div>
      <div className="bottom">
        <BottomMenu />
      </div>
    </div>
  );
}

export default Main;
