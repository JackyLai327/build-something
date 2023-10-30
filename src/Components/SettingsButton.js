import { settingsIcon, settingsIconInverted } from "../Assets/Gifs";
import { SettingsContext } from "../Routers/SiteRouter";
import { useContext } from "react";
import Settings from "../Views/Settings";
import useSound from "use-sound";
import hoverPopSound from '../Assets/Audios/hover-pop.mp3';
import releasePopSound from '../Assets/Audios/release-pop.mp3';
import clickSound from '../Assets/Audios/click.mp3';

const SettingsButton = () => {

    // Context provides the settings state variable and setSettings function to the SettingsButton component
    const {
        settings,
        setSettings
    } = useContext(SettingsContext);

    // Sounds
    const [playHoverPopSound] = useSound(hoverPopSound);
    const [playReleasePopSound] = useSound(releasePopSound);
    const [playClickSound] = useSound(clickSound);

    /** Open Settings
     * This function is called when the user clicks on the settings button.
     * It toggles the panelOpen state variable in the settings state.
     * @param {null}
     * @returns {null}
     */
    const openSettings = () => {
        setSettings({
            ...settings,
            panelOpen: !settings.panelOpen
        });
    }

    return (
    <>
        <div className="utility-button settings-button link utility-button-initial-animation" onClick={openSettings} onMouseEnter={playHoverPopSound} onMouseDown={playClickSound} onMouseUp={playReleasePopSound}>
            {settings.theme === 'light' ?
            <img src={settingsIcon} alt="settings" />
            :
            <img src={settingsIconInverted} alt="settings" />
            }
        </div>

        {settings.panelOpen ?
        <Settings />
        :
        null
        }
    </>
    );
}

export default SettingsButton;