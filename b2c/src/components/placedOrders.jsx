import './../util.css'
import './placed.css'
import BottomMenu from './bottomMenu'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function PlacedOrders(props){

    const [placedOrders, setPlacedOrders] = useState([])

    useEffect(()=>{
        props.loaderSet(true)
        axios({
            method : 'GET',
            url : 'http://127.0.0.1:9999/api/v1/user/placed_orders'
        }).then(res=>{
            if(res.data.status==='success'){
                props.loaderSet(false)
                setPlacedOrders(placedOrders=> res.data.data.placed_orders)
                if(res.data.data.placed_orders.length===0){
                    Swal.fire({
                        title: "Success!",
                        text: res.data.data.message,
                        icon: "Success",
                        confirmButtonText: "close",
                    });
                }
            }
        })
    }, [])

    return(
        <div className="place flex flex-dir">
            <div className='placedorders pad16 flex flex-dir gap16'>
                <p className='placedOrderNow'>Open orders</p>
                {placedOrders.map(el=>
                    <div className='place pad16 flex flex-dir gap16'>
                        <div className='grid grid-2-col gap16'>
                            <p className='temsIncluded'>Items Included</p>
                            {el.item_list.map(items=>
                                <p className='item pad8'>{items.itemName} - {items.units}kg <br></br>(₹{items.price})</p>
                            )}
                        </div>
                        <div className='credentials flex flex-dir gap8'>
                            <p className='total'>Date - {el.date}</p>
                            <p className='total'>Time - {el.time}</p>
                            <p className='total'>Delivery - {el.delivery}/-</p>
                            <p className='total'>Tax - {el.tax}/-</p>
                            <p className='total'>Platform - {el.platform}/-</p>
                            <p className='total'>Payment Mode - <span>{el.payment_mode}</span></p>
                            <p className='total'>Payment status - <span>{el.payment_status}</span></p>
                            <p className='total'>Total price - {el.total}/-</p>
                        </div> 
                    </div>
                )}
            </div>
            <BottomMenu/>
        </div>
    )
}

export default PlacedOrders