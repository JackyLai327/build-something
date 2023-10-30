import { soundOff, soundOffInverted, soundOn, soundOnInverted } from "../Assets/Images";
import { MuteContext } from "../Routers/SiteRouter"
import { useContext } from "react";
import hoverPopSound from '../Assets/Audios/hover-pop.mp3';
import releasePopSound from '../Assets/Audios/release-pop.mp3';
import clickSound from '../Assets/Audios/click.mp3';
import useSound from "use-sound";
import { SettingsContext } from "../Routers/SiteRouter";

const SoundButton = () => {
    // Context provides the mute state variable and setMute function to the SoundButton component
    const {
        mute,
        setMute
    } = useContext(MuteContext);

    // Context provides the settings state variable and setSettings function to the SoundButton component
    const {
        settings,
        setSettings
    } = useContext(SettingsContext);

    // Sounds
    const [playHoverPopSound] = useSound(hoverPopSound);
    const [playReleasePopSound] = useSound(releasePopSound);
    const [playClickSound] = useSound(clickSound);
    
    return (
        <div className='utility-button sound-button link utility-button-initial-animation' onClick={() => setMute(!mute)} onMouseEnter={playHoverPopSound} onMouseDown={playClickSound} onMouseUp={playReleasePopSound}>
            {settings.theme === 'light' ?
            <img src={mute ? soundOff : soundOn} alt='sound button' />
            :
            <img src={mute ? soundOffInverted : soundOnInverted} alt='sound button' />
            }
        </div>
    )
}

export default SoundButton;