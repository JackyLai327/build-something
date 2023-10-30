import { useEffect, useState } from "react";
import '../Styles/nav-bar.css';
import { portal, portalInverted } from "../Assets/Gifs";
import useSound from "use-sound";
import openPortalSound from '../Assets/Audios/open-portal.mp3';
import warpSound from '../Assets/Audios/warp.mp3';

const NavBar = () => {

    // This state variable keeps track of whether the nav bar is open or closed
    const [navBarOpen, setNavBarOpen] = useState(false);

    // Sounds
    const [playOpenPortalSound] = useSound(openPortalSound, { volume: 0.2 });
    const [playWarpSound, { stop }] = useSound(warpSound);

    const [isHovering, setIsHovering] = useState(false);

    // Removes initial animation for nav bar
    useEffect(() => {
        setTimeout(() => {
            const portalIcon = document.querySelector('.portal-icon-initial-animation');
            if (portalIcon) {
                portalIcon.classList.remove('portal-icon-initial-animation');
            }
        }
        , 350);

        if (isHovering) {
            playWarpSound();
        } else {
            stop();
        }

    }, [navBarOpen, isHovering]);

    return (
    <>
        {navBarOpen ?
        <div className="nav-bar-opened">
            <div className="close-nav-bar-button" onClick={() => {setNavBarOpen(false); setIsHovering(false)}} onMouseDown={playOpenPortalSound} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <img src={portalInverted} alt="portal icon" />
            </div>
        </div>
        :
        <div className="portal-icon portal-icon-initial-animation" onClick={() => {setNavBarOpen(true); setIsHovering(false)}} onMouseDown={playOpenPortalSound} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <img src={portal} alt="portal icon" />
        </div>
        }
    </>
    );
}

export default NavBar;