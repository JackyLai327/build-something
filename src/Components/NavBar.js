import { useState } from "react";
import '../Styles/nav-bar.css';
import { portal } from "../Assets/Videos";

const NavBar = () => {

    // This state variable keeps track of whether the nav bar is open or closed
    const [navBarOpen, setNavBarOpen] = useState(false);

    return (
    <>
        {navBarOpen ?
        null
        :
        <div className="portal-icon" onClick={() => setNavBarOpen(true)}>
            <video autoPlay muted loop>
                <source src={portal} type="video/mp4" alt="portal" />
            </video>
        </div>
        }

        {navBarOpen ? 
        <div className="nav-bar-opened">
            <div className="close-nav-bar-button" onClick={() => setNavBarOpen(false)}>X</div>
        </div>
        :
        null
        }
    </>
    );
}

export default NavBar;