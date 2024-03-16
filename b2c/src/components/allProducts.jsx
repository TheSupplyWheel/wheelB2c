import "./../util.css";
import "./allProducts.css";
import Carrot from "./../icon/carrot.png";
import BottomMenu from "./bottomMenu";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import Potato from './../icon/potato.png'
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


function utilError(data){
  Swal.fire({
    title: "Success!",
    text: data,
    icon: "Success",
    confirmButtonText: "close",
  });
}

function AllProducts(props) {
  const [items, setItems] = useState([]);
  const filter_cat = createRef()
  const searchname = createRef()

  const [existingCart, setExistingCart]=useState([])
  const [list, setList] = useState([])

  useEffect(el=>{
    props.loaderSet(true)
    axios({
      method : 'get',
      url : 'http://127.0.0.1:9999/api/v1/product/all-products'
    }).then(res=>{
      if(res.data.status==='success'){
        props.loaderSet(false)
        setList(list=> res.data.data.items)
        setItems(items=> res.data.data.items)
        setExistingCart(existingCart=> res.data.data.nameArr)
        
        /// filtering the elements if we get the catagory from expore section in main page
        if(props.filterpass){

          const filter_catagory = props.filterpass ? props.filterpass : 'all'
          document.querySelector('.filterpassing').value = filter_catagory 
          
          if(filter_catagory==='all'){
            setItems(items=> list)
            return
          }
          const newArr = res.data.data.items.filter((el)=>{
            if(el.variety===filter_catagory){
              return el
            }
          })
          setItems(items=> newArr)
        }
      }
    })
  }, [])


  function filterItems(){
   
    const filter_catagory = filter_cat.current.value
    if(filter_catagory==='all'){
      setItems(items=> list)
      return
    }
    const newArr = list.filter((el)=>{
      if(el.variety===filter_catagory){
        return el
      }
    })
    setItems(items=> newArr)
  }

  function addTocart(el) {
    if(el.target.parentNode.children[0].value==='choose'){
      utilError('please select the quantity')
      return
    }
    axios({
      method: "POST",
      url: "http://127.0.0.1:9999/api/v1/user/add-to-cart",
      data: {
        itemName:
          el.target.parentNode.parentNode.children[0].children[1].children[0]
            .textContent,
        price:
          el.target.parentNode.parentNode.children[0].children[1].children[1]
            .textContent,
        units: el.target.parentNode.children[0].value,
      },
    }).then((res) => {
        if (res.data.status === "success") {
          utilError(res.data.data.message)

          setExistingCart(existingCart=> res.data.data.nameArr)
        }
      });
    }

    function search(){
      const filter_name = searchname.current.value;
      const filter_catagory = filter_cat.current.value;

      
      const newArr = list.filter((el)=>{
        if(el.name.includes(filter_name.toLowerCase())){
          return el
        }
      })
      setItems(items=> newArr)
    }

  return (
    <>
      <div className="all-products pad16 flex flex-dir gap16">
        {/* <div className="floatCart pad8 gap8">
          <p className="subhead">Items</p>
          {existingCart.map(el=>
            <div className="itemAdded flex flex-1 gap16">
              <p className="name">{el}</p>
              <p className="name"></p>
            </div>
          )}
        </div> */}
        <h2 className="allProd">All products</h2>
        <div className="search">
          <input ref={searchname} onChange={search} className="inp inp__updated" placeholder="search" type="text"/>
        </div>
        <div className="filter flex flex-dir gap8">
          <p className="filterhead">Filter Items</p>
          <select onChange={filterItems} ref={filter_cat} className="filterpassing inp inp__updated">
            <option className="opt" value="all">
              Choose filter
            </option>
            <option className="opt" value="all">
              All products
            </option>
            <option className="opt" value="fruits">
              Fruits
            </option>
            <option className="opt" value="vegetables">
              Vegetables
            </option>
            <option className="opt" value="english">
              English items
            </option>
            <option className="opt" value="frozen">
              Packed food
            </option>
          </select>
        </div>
        
        <div className="products flex flex-dir gap16 pad16">
          {items.map((el) => (
            <div key={el._id} className="prod pad16 flex flex-2">
              <div className="flex flex-1 gap16">
                {el.name==='allo' && <img src={Potato} className="icon" alt="vegetable" />}
                {el.name==='adrak' && <img src={Ginger} className="icon" alt="vegetable" />}
                {el.name==='arbi' && <img src={Taro} className="icon" alt="vegetable" />}
                {el.name==='amla' && <img src={Amla} className="icon" alt="vegetable" />}
                {el.name==='baigan' && <img src={Baigan} className="icon" alt="vegetable" />}
                {el.name==='bhindi' && <img src={Bhindi} className="icon" alt="vegetable" />}
                {el.name==='beans' && <img src={Beans} className="icon" alt="vegetable" />}
                {el.name==='gajar' && <img src={Carrot} className="icon" alt="vegetable" />}
                {el.name==='goal giya' && <img src={Golgiya} className="icon" alt="vegetable" />}
                {el.name==='hara dhaniya' && <img src={Dhaniya} className="icon" alt="vegetable" />}
                {el.name==='hari mirch' && <img src={GreenChili} className="icon" alt="vegetable" />}
                {el.name==='hara payaz' && <img src={GreenOnion} className="icon" alt="vegetable" />}
                {el.name==='halwa kaddu' && <img src={Halwa} className="icon" alt="vegetable" />}
                {el.name==='kheera china' && <img src={Cocumber} className="icon" alt="vegetable" />}
                {el.name==='karela' && <img src={Karela} className="icon" alt="vegetable" />}
                {el.name==='lokki' && <img src={Lokki} className="icon" alt="vegetable" />}
                {el.name==='lasan' && <img src={Garlic} className="icon" alt="vegetable" />}
                {el.name==='kheera desi' && <img src={desiKheera} className="icon" alt="vegetable" />}
                {el.name==='mooli' && <img src={Radish} className="icon" alt="vegetable" />}
                {el.name==='mashroom' && <img src={Radish} className="icon" alt="vegetable" />}
                {el.name==='nimbu' && <img src={Lemon} className="icon" alt="vegetable" />}
                {el.name==='onion' && <img src={Onion} className="icon" alt="vegetable" />}
                {el.name==='patta gobhi' && <img src={Cabbage} className="icon" alt="vegetable" />}
                {el.name==='pudina' && <img src={Mint} className="icon" alt="vegetable" />}
                {el.name==='phool gobhi' && <img src={Phool} className="icon" alt="vegetable" />}
                {el.name==='palak' && <img src={Spinach} className="icon" alt="vegetable" />}
                {el.name==='shimla mirch' && <img src={Shimla} className="icon" alt="vegetable" />}
                {el.name==='zimikhand' && <img src={Shimla} className="icon" alt="vegetable" />}
                {el.name==='bhe' && <img src={Lotus} className="icon" alt="vegetable" />}
                {el.name==='khatal' && <img src={Jack} className="icon" alt="vegetable" />}
                {el.name==='turi' && <img src={turi} className="icon" alt="vegetable" />}
                {el.name==='tomato' && <img src={tomato} className="icon" alt="vegetable" />}
                {el.name==='baby corn' && <img src={corn} className="icon" alt="vegetable" />}
                {el.name==='basil' && <img src={basil} className="icon" alt="vegetable" />}
                {el.name==='broccoli' && <img src={broccoli} className="icon" alt="vegetable" />}
                {el.name==='cherry tomato' && <img src={cherry} className="icon" alt="vegetable" />}
                {el.name==='celery' && <img src={celery} className="icon" alt="vegetable" />}
                {el.name==='china cabbage' && <img src={Cabbage} className="icon" alt="vegetable" />}
                {el.name==='ice berg' && <img src={lettuce} className="icon" alt="vegetable" />}
                {el.name==='lettuce' && <img src={lettuce1} className="icon" alt="vegetable" />}
                {el.name==='parsely' && <img src={parsley} className="icon" alt="vegetable" />}
                {el.name==='pokchey' && <img src={parsley} className="icon" alt="vegetable" />}
                {el.name==='peeled garlic' && <img src={peel} className="icon" alt="vegetable" />}
                {el.name==='red capsicum' && <img src={bellr} className="icon" alt="vegetable" />}
                {el.name==='yellow capsicum' && <img src={belly} className="icon" alt="vegetable" />}
                {el.name==='red cabbage' && <img src={redcab} className="icon" alt="vegetable" />}
                {el.name==='zucchini green' && <img src={zucg} className="icon" alt="vegetable" />}
                {el.name==='zucchini yellow' && <img src={zucy} className="icon" alt="vegetable" />}
                {el.name==='apple' && <img src={Apple} className="icon" alt="vegetable" />}
                {el.name==='anar' && <img src={anar} className="icon" alt="vegetable" />}
                {el.name==='amrood' && <img src={guava} className="icon" alt="vegetable" />}
                {el.name==='banana' && <img src={kela} className="icon" alt="vegetable" />}
                {el.name==='babbu gosha' && <img src={kela} className="icon" alt="vegetable" />}
                {el.name==='grapes' && <img src={grapes} className="icon" alt="vegetable" />}
                {el.name==='kharbooja' && <img src={melon} className="icon" alt="vegetable" />}
                {el.name==='kiwi' && <img src={kiwi} className="icon" alt="vegetable" />}
                {el.name==='mango' && <img src={mango} className="icon" alt="vegetable" />}
                {el.name==='mausmi' && <img src={Orange} className="icon" alt="vegetable" />}
                {el.name==='orange' && <img src={Orange} className="icon" alt="vegetable" />}
                {el.name==='pineapple rani' && <img src={pine} className="icon" alt="vegetable" />}
                {el.name==='papita' && <img src={papita} className="icon" alt="vegetable" />}
                {el.name==='beet root' && <img src={beet} className="icon" alt="vegetable" />}
                {el.name==='sharda' && <img src={noimg} className="icon" alt="vegetable" />}
                {el.name==='water melon' && <img src={watermelon} className="icon" alt="vegetable" />}
                {el.name==='french fries' && <img src={noimg} className="icon" alt="vegetable" />}
                {el.name==='frozen mattar' && <img src={noimg} className="icon" alt="vegetable" />}
                {el.name==='soya chaap' && <img src={noimg} className="icon" alt="vegetable" />}
                {el.name==='sweet corn' && <img src={noimg} className="icon" alt="vegetable" />}
                {el.name==='half boiled noodles' && <img src={noimg} className="icon" alt="vegetable" />}

                <div className="flex flex-dir gap8">
                  <p className="price">{el.name}</p>
                  <p className="price">{el.price}/- kg</p>
                </div>
              </div>
              <div className="flex flex-dir gap16">
                <select className="inp__small inp">
                  <option className="opt" value="choose">
                    choose
                  </option>
                  <option className="opt" value="0.5">
                    0.5 kg
                  </option>
                  <option className="opt" value="1">
                    1 kg
                  </option>
                  <option className="opt" value="1.5">
                    1.5 kg
                  </option>
                  <option className="opt" value="2">
                    2 kg
                  </option>
                  <option className="opt" value="2.5">
                    2.5 kg
                  </option>
                  <option className="opt" value="3">
                    3 kg
                  </option>
                  <option className="opt" value="3.5">
                    3.5 kg
                  </option>
                  <option className="opt" value="4">
                    4 kg
                  </option>
                  <option className="opt" value="5">
                    5 kg
                  </option>
                </select>
                {existingCart.includes(el.name) ? 
                  <button
                  
                  className="border_btn border_btn_fill"
                  >
                  Added
                  </button>
                : 
                  <button
                    onClick={addTocart}
                    className="border_btn border_btn_fill"
                  >
                  +
                  </button>
                }
                
                
              </div>
            </div>
          ))}
          <Link to='/cart' className="border_btn border_btn_fill">Go to cart</Link>
        </div>
      </div>
      <BottomMenu />
    </>
  );
}

export default AllProducts;
