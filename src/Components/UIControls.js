import NavBar from "./NavBar";
import SettingsButton from "./SettingsButton";
import SoundButton from "./SoundButton";
import '../Styles/ui-controls.css';

const UIControls = () => {

    // Remove initial animation for utility buttons
    setTimeout(() => {
        const utilityButtons = document.querySelectorAll('.utility-button-initial-animation');
        utilityButtons.forEach(button => {
            button.classList.remove('utility-button-initial-animation');
        });
    }, 350);

    return (
    <div>
        <NavBar />
        <SettingsButton />
        <SoundButton />
    </div>
    );
}

export default UIControls;