import Carrot from './../icon/carrot.png'
import BottomMenu from './bottomMenu'
import './../util.css'
import './fruits.css'

function Vegetable(){
    return(

        <div className='flex flex-dir'>
        <div className="fruit pad16 flex flex-dir gap16">
            <p className='fruithead'>Vegetables</p>
            {[1,2,3,4,5,6].map(el=>
                <div className='prod pad16 flex flex-2'>
                    <div className='flex flex-1 gap16'>
                        <img src={Carrot} className='icon' alt='vegetable'/>
                        <div className='flex flex-dir gap8'>
                            <p className='price'>Carrot</p>
                            <p className='price'>20/- kg</p>
                        </div>
                    </div>
                    <div className='flex flex-dir gap16'>
                        <select className='inp__small inp'>
                            <option className='opt' value='choose'>choose</option>
                            <option className='opt' value='0.5'>0.5 kg</option>
                            <option className='opt' value='1'>1 kg</option>
                            <option className='opt' value='1.5'>1.5 kg</option>
                            <option className='opt' value='2'>2 kg</option>
                            <option className='opt' value='2.5'>2.5 kg</option>
                            <option className='opt' value='3'>3 kg</option>
                            <option className='opt' value='3.5'>3.5 kg</option>
                            <option className='opt' value='4'>4 kg</option>
                            <option className='opt' value='5'>5 kg</option>
                        </select>
                        <button className='border_btn border_btn_fill'>+</button>
                    </div>
                </div>
            )}
        </div>
            <BottomMenu/>
        </div>
    )

}

export default Vegetable