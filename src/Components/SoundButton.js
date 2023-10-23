import { soundOff, soundOn } from "../Assets/Images";
import { MuteContext } from "../Routers/SiteRouter"
import { useContext } from "react";

const SoundButton = () => {

    // Context provides the mute state variable and setMute function to the SoundButton component
    const {
        mute,
        setMute
    } = useContext(MuteContext);
    
    return (
        <div className='utility-button sound-button link utility-button-initial-animation' onClick={() => setMute(!mute)}>
            <img src={mute ? soundOff : soundOn} alt='sound button' />
        </div>
    )
}

export default SoundButton;