import React, { useState, createContext } from 'react';
import Landing from '../Views/Landing';

// Brings userEntered state into site router
export const UserEnteredContext = createContext(null);
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
                <div>YAY</div> 
                :
                <Landing />
            }
        </MuteContext.Provider>
    </UserEnteredContext.Provider>
    )
}

export default SiteRouter;