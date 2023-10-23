import { useEffect, useState } from "react";
import '../Styles/nav-bar.css';
import { portal } from "../Assets/Gifs";

const NavBar = () => {

    // This state variable keeps track of whether the nav bar is open or closed
    const [navBarOpen, setNavBarOpen] = useState(false);

    // Removes initial animation for nav bar
    useEffect(() => {
        setTimeout(() => {
            const portalIcon = document.querySelector('.portal-icon-initial-animation');
            if (portalIcon) {
                portalIcon.classList.remove('portal-icon-initial-animation');
            }
        }
        , 350);
    }, [navBarOpen]);


    return (
    <>
        {navBarOpen ?
        <div className="nav-bar-opened">
            <div className="close-nav-bar-button" onClick={() => setNavBarOpen(false)}>X</div>
        </div>
        :
        <div className="portal-icon portal-icon-initial-animation" onClick={() => setNavBarOpen(true)}>
            <img src={portal} alt="portal icon" />
        </div>
        }
    </>
    );
}

export default NavBar;