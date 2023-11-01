import React, { useContext, useEffect, useState, createContext } from 'react';
import { UserEnteredContext } from '../Routers/SiteRouter';
import '../Styles/landing.css';
import useSound from 'use-sound';
import choirSound from '../Assets/Audios/church-choir.mp3';
import { mouesClick } from '../Assets/Images';
import SoundButton from '../Components/SoundButton';
import { MuteContext } from '../Routers/SiteRouter';
import hoverPopSound from '../Assets/Audios/hover-pop.mp3';
import releasePopSound from '../Assets/Audios/release-pop.mp3';
import slideEffectSound from '../Assets/Audios/slide-effect.mp3';
import clickSound from '../Assets/Audios/click.mp3';

const Landing = () => {

    // Sounds
    const [playChurchSound, { stop }] = useSound(choirSound, { volume: 0.2 });
    const [playHoverPopSound] = useSound(hoverPopSound);
    const [playReleasePopSound] = useSound(releasePopSound);
    const [playSlideEffectSound] = useSound(slideEffectSound, { volume: 0.5 });
    const [playClickSound] = useSound(clickSound);

    // This context provides the userEntered state to the Landing component
    const {
        userEntered,
        setUserEntered
    } = useContext(UserEnteredContext);

    // This context provides the mute state variable and setMute function to the Landing component
    const {
        mute,
        setMute
    } = useContext(MuteContext);

    // This state variable keeps track of which step of animation on the landing page the user is on
    const [animationStep, setAnimationStep] = useState(0);

    // This state variable keeps track of which splash screen the user is on
    const [splashScreenNum, setSplashScreenNum] = useState(0);

    // This state variable keeps track of whether the user has entered the portfolio
    const [showEnterMessage, setShowEnterMessage] = useState(false);

    // Remove initial animation for utility buttons
    setTimeout(() => {
        const utilityButtons = document.querySelectorAll('.utility-button-initial-animation');
        utilityButtons.forEach(button => {
            button.classList.remove('utility-button-initial-animation');
        });
    }, 350);

    /** Next Animation Step
     * This function is called when the user clicks on the landing page. 
     * It increments the animationStep state variable by 1.
     * @param {null}
     * @returns {null}
     */
    const nextAnimationStep = () => {
        setAnimationStep(animationStep + 1);
        if (animationStep === 0 || animationStep === 1 || animationStep === 2) {
            setTimeout(() => {
                nextSplashScreen();
            }, 0);
        }

        if (animationStep === 0) {
            playChurchSound();
        }
    }

    /** Next Splash Screen
     * This function is called when the user clicks on the splash screen. 
     * It increments the splashScreenNum state variable by 1.
     * @param {null}
     * @returns {null}
     */
    const nextSplashScreen = () => {
        setSplashScreenNum(splashScreenNum + 1);
        
        document.querySelectorAll('.fade-out').forEach((element) => {
            element.classList.add('no-display');
        });
    }

    /** User Enter
     * This function is called when the user clicks on the enter button.
     * It sets the userEntered state variable to true and plays the enter sound.
     * @param {null}
     * @returns {null}
     */
    const userEnter = () => {

        // This hides the landing page and the fade-in elements
        document.querySelectorAll('.landing-page').forEach((element) => {
            element.classList.add('no-display');
            element.classList.add('transparent');
        });

        // This hides the footer project title
        document.querySelectorAll('.fade-in').forEach((element) => {
            element.classList.add('no-display');
        });

        // This shows the enter message
        setShowEnterMessage(true);
        
        // This hides the footer project title
        document.querySelectorAll('.footer-project-title').forEach((element) => {
            element.classList.add('fade-out');
        });

        // Hides sound button
        document.querySelectorAll('.sound-button').forEach((element) => {
            element.classList.add('no-display');
        });

        // Stops church music
        stop();

        // Sets mute to true
        setMute(true);

        // Enters
        setTimeout(() => {
            setUserEntered(true);
        }, 2000);

    }

    // This useEffect hook is called when the any of the following state variables change: animationStep, userEntered, mute
    useEffect(() => {
        // If mute is true, stop the sound. Otherwise, play the sound.
        if (mute) {
            stop();
        } else {
            playChurchSound();
        }
    }, [userEntered, mute])

    return (
        <div>
            <div className='sound-button'>
                <SoundButton />
            </div>

            <div className='landing-page' onClick={nextAnimationStep}>
                <div className={animationStep === 0 ? "content" : "fade-out"}>
                    <img src={mouesClick} alt='mouse click' />
                    <div>Click <span className='text-accent'>anywhere</span> to proceed**</div>
                </div>
                <div className='skip-button link' onClick={userEnter} onMouseEnter={playHoverPopSound} onMouseDown={playClickSound} onMouseUp={playReleasePopSound}>skip &gt;&gt;</div>
                <div className={animationStep < 2 ? "content" : "fade-out"}>
                    <div className={animationStep < 1 ? "transparent" : "fade-in"}>Hello, intelligent being.</div>
                    <div className={animationStep < 1 ? "transparent" : "fade-in"}>Welcome to <span className='text-accent'>build something .</span></div>
                </div>
                <div className={animationStep < 2 ? "no-display" : animationStep < 3 ? "content" : "fade-out"}>
                    <div className={animationStep < 2 ? "transparent" : "fade-in"}>I heard you "users" like <span className='text-accent'>keeping things simple.</span></div>
                    <div className={animationStep < 2 ? "transparent" : "fade-in"}>So I made my introduction short.</div>
                </div>
                <div className={animationStep < 3 ? "no-display" : animationStep < 5 ? "content" : "content"}>
                    <div className={animationStep < 3 ? "transparent" : "fade-in"}><span className='text-accent'>build something .</span> is a:</div>
                    <div className={animationStep < 3 ? "transparent intro-points" : "fade-in intro-points"}>
                        <div>• creative web <span className='text-accent'>portfolio</span></div>
                        <div>• <span className='text-accent'>reminder</span> that tells me to keep building something</div>
                        <div>• my little personal <span className='text-accent'>gallery</span> of projects</div>
                        <div>• a place to <span className='text-accent'>chill</span></div>
                    </div>
                    <div className={animationStep < 4 ? "transparent enter-form" : "fade-in enter-form"}>
                        <div>Whenever you're ready</div>
                        <div className='link enter-button' onClick={userEnter} onMouseEnter={playHoverPopSound} onMouseDown={playClickSound} onMouseUp={playReleasePopSound}>ENTER</div>
                    </div>
                </div>
                <div className='footer-project-title' onMouseEnter={playSlideEffectSound}>build something .</div>
            </div>
            <div className={!showEnterMessage ? "no-display" : "fade-in enter-message"}>very well...</div>
        </div>
    )
}

export default Landing;