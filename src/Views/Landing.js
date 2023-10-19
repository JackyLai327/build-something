import React, { useContext, useEffect, useState } from 'react';
import { UserEnteredContext } from '../Routers/SiteRouter';
import '../Styles/landing.css';
import useSound from 'use-sound';
import choirSound from '../Assets/Audios/church-choir.mp3';

const Landing = () => {

    // This is to play sound when the user enters the portfolio
    const [play, { stop }] = useSound(choirSound, { volume: 0.25 });

    // This context provides the userEntered state to the Landing component
    const {
        userEntered,
        setUserEntered
    } = useContext(UserEnteredContext);

    // This state variable keeps track of which step of animation on the landing page the user is on
    const [animationStep, setAnimationStep] = useState(0);

    // This state variable keeps track of which splash screen the user is on
    const [splashScreenNum, setSplashScreenNum] = useState(0);

    // This state variable keeps track of whether the user has entered the portfolio
    const [showEnterMessage, setShowEnterMessage] = useState(false);

    /** Next Animation Step
     * This function is called when the user clicks on the landing page. 
     * It increments the animationStep state variable by 1.
     * @param {null}
     * @returns {null}
     */
    const nextAnimationStep = () => {
        setAnimationStep(animationStep + 1);
        if (animationStep === 1 || animationStep === 2) {
            setTimeout(() => {
                nextSplashScreen();
            }, 0);
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

        document.querySelectorAll('.content').forEach((element) => {
            element.classList.add('fade-out');
        });

        setShowEnterMessage(true);

        setTimeout(() => {
            setUserEntered(true);
        }, 1500);
    }


    return (
    <div className='landing-page' onClick={nextAnimationStep} onMouseEnter={() => play()}>
        <div className='skip-button link' onClick={() => setUserEntered(true)}>skip &gt;&gt;</div>
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
                <div className='link enter-button' onClick={userEnter} onMouseDown={() => stop()}>ENTER</div>
            </div>
        </div>
        <div className={!showEnterMessage ? "transparent intro-points" : "fade-in intro-points"}>very well...</div>
        <div className='footer-project-title'>build something .</div>
    </div>
    )
}

export default Landing;