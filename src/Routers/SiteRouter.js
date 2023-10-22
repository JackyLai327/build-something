import React, { useState, createContext } from 'react';
import Landing from '../Views/Landing';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Views/Dashboard';

// Brings userEntered state into site router
export const UserEnteredContext = createContext(null);
// Brings mute state into site router
export const MuteContext = createContext(null);

export const SiteRouter = () => {

    // If user enters the portfolio, set userEntered to true and takes them to the SiteRouter
    const [userEntered, setUserEntered] = useState(false);

    // If user mutes the sound, set mute to true
    const [mute, setMute] = useState(false);

    return (
    <UserEnteredContext.Provider value={{userEntered, setUserEntered}}>
        <MuteContext.Provider value={{mute, setMute}}>
            {userEntered ? 
                <Router>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </Router>
                :
                <Landing />
            }
        </MuteContext.Provider>
    </UserEnteredContext.Provider>
    )
}

export default SiteRouter;