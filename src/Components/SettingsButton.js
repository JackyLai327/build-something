import { settingsIcon } from "../Assets/Gifs";
import { SettingsContext } from "../Routers/SiteRouter";
import { useContext } from "react";
import Settings from "../Views/Settings";

const SettingsButton = () => {

    // Context provides the settings state variable and setSettings function to the SettingsButton component
    const {
        settings,
        setSettings
    } = useContext(SettingsContext);

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
        <div className="utility-button settings-button link utility-button-initial-animation" onClick={openSettings}>
            <img src={settingsIcon} alt="settings" />
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