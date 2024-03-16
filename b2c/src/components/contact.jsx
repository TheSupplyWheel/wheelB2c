import './../util.css'
import './contact.css'
import BottomMenu from './bottomMenu'

function Contact(){
    return(
        <div className="contact flex flex-dir">
            <div className="contactbox pad16 flex flex-dir gap16">
                <p className="contacthead">Contact</p>
                <div className='company_detials flex flex-dir gap16'>
                    <p className='company'>The Supply Wheel partnership firm</p>
                    <p className='company'>Mandi maqsuda shop number 138</p>
                    <p className='company'>Tarsem singh - +91 9478181139</p>
                    <p className='company'>Tajinder singh - +91 6283507108</p>
                    <p className='company'>Sourav - +91 8544878787</p>
                    <p className='company'>Email - thesupplywheel@gmail.com</p>
                </div>
            </div>
            <BottomMenu/>
        </div>
    )
}

export default Contact