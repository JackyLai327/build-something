import React, { useState, createContext } from 'react';
import Landing from '../Views/Landing';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Views/Dashboard';
import Games from '../Views/Games';
import Forum from '../Views/Forum';
import About from '../Views/About';

// Brings userEntered state into site router
export const UserEnteredContext = createContext(null);
// Brings mute state into site router
export const MuteContext = createContext(null);
// Brings settings state into site router
export const SettingsContext = createContext(null);

export const SiteRouter = () => {

    // If user enters the portfolio, set userEntered to true and takes them to the SiteRouter
    const [userEntered, setUserEntered] = useState(false);

    // If user mutes the sound, set mute to true
    const [mute, setMute] = useState(false);
    
    // If user changes settings, set settings to true
    const [settings, setSettings] = useState({
        panelOpen: false,
        theme: 'light',
        countryCode: 'AU',
        country: 'Australia',
        city: 'Melbourne',
        temperatureUnit: 'celsius'
    });

    return (
    <UserEnteredContext.Provider value={{userEntered, setUserEntered}}>
        <SettingsContext.Provider value={{settings, setSettings}}>
        <MuteContext.Provider value={{mute, setMute}}>
            {userEntered ? 
                <Router>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/games" element={<Games />} />
                        <Route path="/forum" element={<Forum />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<Dashboard />} />
                    </Routes>
                </Router>
                :
                <Landing />
            }
        </MuteContext.Provider>
        </SettingsContext.Provider>
    </UserEnteredContext.Provider>
    )
}

export default SiteRouter;