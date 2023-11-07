import { useEffect, useState } from "react";
import '../Styles/nav-bar.css';
import { portal, portalInverted } from "../Assets/Gifs";
import useSound from "use-sound";
import openPortalSound from '../Assets/Audios/open-portal.mp3';
import warpSound from '../Assets/Audios/warp.mp3';
import hoverPopSound from '../Assets/Audios/hover-pop.mp3';
import clickSound from '../Assets/Audios/click.mp3';
import releasePopSound from '../Assets/Audios/release-pop.mp3';

const NavBar = () => {

    // This state variable keeps track of whether the nav bar is open or closed
    const [navBarOpen, setNavBarOpen] = useState(false);

    // Sounds
    const [playOpenPortalSound] = useSound(openPortalSound, { volume: 0.5 });
    const [playWarpSound, { stop }] = useSound(warpSound, {volume: 1, loop: true});
    const [playHoverPopSound] = useSound(hoverPopSound);
    const [playClickSound] = useSound(clickSound);
    const [playReleasePopSound] = useSound(releasePopSound);

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
            <div className="nav-bar-title">Teleportation Destinations</div>
            <div className="nav-bar-item-container">
                {/* TODO: Make nav-bar items into graphics not texts */}
                <div className="nav-bar-item animate-1">Dashboard</div>
                <div className="nav-bar-item animate-2">Games</div>
                <div className="nav-bar-item animate-3">Forum</div>
                <div className="nav-bar-item animate-4">About</div>
                <div className="nav-bar-item animate-5" onMouseEnter={playHoverPopSound} onMouseDown={playClickSound} onMouseUp={playReleasePopSound}><a href="https://jackylai327.github.io/portfolio-2023/" target="_blank">Professional Portfolio</a></div>
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