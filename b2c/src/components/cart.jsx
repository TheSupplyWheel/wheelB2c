import "./cart.css";
import "./../util.css";
import Orange from "./../icon/orange.png";
import BottomMenu from "./bottomMenu";
import { useEffect, useState, createRef } from "react";
import axios from "axios";
// import Razorpay from 'razorpay'
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Dustbin from "./../icon/delete.png";

function Cart(props) {
  const [cart, setCart] = useState([]);
  const [credentials, setCredentials] = useState({});
  const [updateCart, setUpdateCart] = useState(true);
  const [paymentMethodChoosing, setPaymentMEthodChoosing] = useState("");
  const [combo, setcombo] = useState([]);
  const paymentMethod = createRef();
  const [orderConfirming, setOrderConfirming] = useState(true);

  useEffect(() => {
    props.loaderSet(true)
    axios({
      method: "GET",
      url: "http://127.0.0.1:9999/api/v1/user/cart-items",
    }).then((res) => {
      if (res.data.status === "success") {
        props.loaderSet(false)
        setCart((cart) => res.data.data.cart);
        const creds = {
          subtotal: res.data.data.subTotal,
          total: res.data.data.total,
        };
        setCredentials((credentials) => creds);
        setcombo((combo) => res.data.data.combo);
        console.log(res.data.data.combo);
        
      }
    });
  }, [props.updatingCartCount, updateCart]);

  function update() {
    axios({
      method: "POST",
      url: "http://127.0.0.1:9999/api/v1/user/cart-update",
      data: {},
    });
  }

  const updationGlause = true;

  function add(el) {
    const val = el.target.parentNode.children[1];
    val.textContent = Number(val.textContent) + 0.25;
    const name =
      el.target.parentNode.parentNode.children[0].children[1].children[0]
        .textContent;
    axios({
      method: "POST",
      url: "http://127.0.0.1:9999/api/v1/user/cart-update",
      data: {
        name: name,
        units: val.textContent,
      },
    });
    const additionalPriceNeedToAddAfterAddition =
      0.25 *
      el.target.parentNode.parentNode.children[0].children[1].children[1].textContent.split(
        "/-"
      )[0];
    const obj = {
      subtotal: credentials.subtotal + additionalPriceNeedToAddAfterAddition,
      total: credentials.total + additionalPriceNeedToAddAfterAddition,
    };
    setCredentials((credentials) => obj);
  }

  function substract(el) {
    const val = el.target.parentNode.children[1];
    if (Number(val.textContent) === 0) {
      return;
    }
    val.textContent = Number(val.textContent) - 0.25;
    const name =
      el.target.parentNode.parentNode.children[0].children[1].children[0]
        .textContent;

    axios({
      method: "POST",
      url: "http://127.0.0.1:9999/api/v1/user/cart-update",
      data: {
        name: name,
        units: val.textContent,
      },
    });

    const additionalPriceNeedToAddAfterAddition =
      0.25 *
      el.target.parentNode.parentNode.children[0].children[1].children[1].textContent.split(
        "/-"
      )[0];
    const obj = {
      subtotal: credentials.subtotal - additionalPriceNeedToAddAfterAddition,
      total: credentials.total - additionalPriceNeedToAddAfterAddition,
    };
    setCredentials((credentials) => obj);
  }

  function choosingPaymentMethod() {
    if (paymentMethod.current.value === "cod") {
      setPaymentMEthodChoosing((paymentMethodChoosing) => "cod");
    }
    if (paymentMethod.current.value === "online") {
      setPaymentMEthodChoosing((paymentMethodChoosing) => "online");
    }
  }

  function onlinePayment() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:9999/api/v1/user/online-payment",
    }).then((res) => {
      if (res.data.status === "success") {
        var options = {
          key: "rzp_test_7FSn7opeUIrdfi", // Enter the Key ID generated from the Dashboard
          amount: `${credentials.total}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "The Supply Wheel",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: `${res.data.data.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: function (response) {
            axios({
              method: "POST",
              url: "http://127.0.0.1:9999/api/v1/user/payment-validate",
              data: {
                order_id: `${res.data.data.id}`,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
            }).then((res) => {
              if (res.data.status === "success") {
                Swal.fire({
                  title: "Success!",
                  text: res.data.data.message,
                  icon: "Success",
                  confirmButtonText: "close",
                });
                setOrderConfirming((orderConfirming) => false);
              }
            });
          },
          prefill: {
            name: "The Supply Wheel",
            email: "thesupplywheel@gmail.com",
            contact: "9478181139",
          },
          notes: {
            address: "Mandi maqsuda shop number 139 jalandhar punjab",
          },
          theme: {
            color: "#287f71",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    });
  }

  function CODpaymentAndPlacingOrder() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:9999/api/v1/user/cod-payment",
    }).then((res) => {
      if (res.data.status === "success") {
        Swal.fire({
          title: "Success!",
          text: res.data.data.message,
          icon: "Success",
          confirmButtonText: "close",
        });
        setOrderConfirming((orderConfirming) => false);
      }
    });
  }

  function deleteItemFromCart(el) {
    el.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:9999/api/v1/user/delete",
      data: {
        name: el.target.parentNode.parentNode.children[0].children[1]
          .children[0].textContent,
      },
    }).then((res) => {
      if (res.data.status === "success") {
        setCart((cart) => res.data.data.cart);
        Swal.fire({
          title: "Success!",
          text: res.data.data.message,
          icon: "Success",
          confirmButtonText: "close",
        });
      }
    });
  }

  return (
    <>
      {orderConfirming ? (
        <div className="cart flex flex-dir">
          <div className="coverCart flex pad8 flex-dir gap16">
            <h2 className="carthead">Cart</h2>
            <div className="cartItem flex flex-dir gap16">
              {cart.map((el) => (
                <div className="cartProd flex flex-2 pad16 gap8">
                  <div className="flex flex-1 gap16">
                    <img src={Orange} alt="fruit image" className="icon__" />
                    <div className="flex flex-dir gap8">
                      <p className="name">{el.itemName}</p>
                      <p className="name">{el.price}</p>
                      {/* <p className='name'>quanity added - {el.units}kg</p> */}
                    </div>
                  </div>
                  <div className="countbox flex flex-1 gap8">
                    <button onClick={substract} className="add">
                      -
                    </button>
                    <p className="count">{el.units}</p>
                    <button onClick={add} className="add">
                      +
                    </button>
                    <p className="unitsInCartupdate">kg</p>
                  </div>
                  <button onClick={deleteItemFromCart} className="deleteBtn">
                    <img src={Dustbin} className="icon__" alt="delete" />
                  </button>
                </div>
              ))}
              <div className="flex flex-dir gap8">
                <p className="sub total">Sub total -{credentials.subtotal}/-</p>
                <p className="sub total">Delivery charges -20/-</p>
                <p className="sub total">tax - 2/-</p>
                <p className="sub total">Platform charges - 2/-</p>
                <p className="sub total">Total - {credentials.total}/-</p>

                {cart.length > 0 && (
                  <>
                    <div className="paymentprocessbox flex flex-dir gap8">
                      <p className="paymentprocess">Choose payment method</p>
                      <select
                        onChange={choosingPaymentMethod}
                        ref={paymentMethod}
                        className="inp__update inp"
                      >
                        <option className="opt" value="choose">
                          Choose payment method
                        </option>
                        <option className="opt" value="cod">
                          Cash on delivery
                        </option>
                        <option className="opt" value="online">
                          online payment
                        </option>
                      </select>
                    </div>
                    {paymentMethodChoosing === "cod" ? (
                      <button
                        onClick={CODpaymentAndPlacingOrder}
                        className="placeorder border_btn border_btn_fill"
                      >
                        Place order with COD
                      </button>
                    ) : (
                      <button
                        onClick={onlinePayment}
                        className="placeorder border_btn border_btn_fill"
                      >
                        Place order with online payment
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="combos flex flex-dir gap16">
              {combo.map((el, index) => (
                <div className="comb flex flex-dir gap16 pad16">
                  <p className="combocred-">Combo - {index + 1}</p>
                  <div className="grid grid-2-col gap16">
                    {el.list.map(item=>
                        <div className="corentbox flex flex-1 gap16">
                            <p className="combocred">{item.name}</p>
                            <p className="combocred">{item.quantity}kg</p>
                        </div>
                    )}
                  </div>
                    
                </div>
              ))}
            </div>
          </div>
          <BottomMenu />
        </div>
      ) : (
        <div className="placedScreen pad16 flex flex-1 flex-dir gap48">
          <p className="thanks">Thankyou very for choosing us!</p>
          <div className="outer flex flex-1">
            <div className="inner flex flex-1">
              <p className="placename">Placed</p>
            </div>
          </div>
          <Link to="/placed" className="border_btn border_btn_fill">
            See your placed order
          </Link>
        </div>
      )}
    </>
  );
}

export default Cart;
