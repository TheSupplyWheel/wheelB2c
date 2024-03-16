import './../util.css'
import './history.css'
import BottomMenu from './bottomMenu'

function History(){
    return(
        <div className="history">
            <div className='historyBox pad16 flex flex-dir gap16'>
                <p className='historyhead'>History</p>
                {[1,2,3,4,56].map(el=>
                    <div className='historyOrders pad16 flex flex-dir gap16'>
                        <div className='items grid grid-2-col gap8 '>
                            <p className='itemorder'>Items ordered</p>
                            <p className='item itemshade pad8'>Apple</p>
                            <p className='item itemshade pad8'>Apple</p>
                            <p className='item itemshade pad8'>Apple</p>
                            <p className='item itemshade pad8'>Apple</p>
                            <p className='item itemshade pad8'>Apple</p>
                        </div>
                        <div className='creds flex flex-dir gap8'>
                            <p className='totalprice'>Total price paid - 4568/-</p>
                            <button className='border_btn border_btn_fill'>Download bill</button>
                        </div>
                    </div>
                )}
            </div>
            <BottomMenu/>
        </div>
    )
}

export default History