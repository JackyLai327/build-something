import React, { useContext, useEffect, useState } from 'react';
import '../Styles/settings.css';
import { SettingsContext } from '../Routers/SiteRouter';
import { fetchAllCities, fetchCityByName } from '../Data/CityData';
import { loadingEye } from '../Assets/Gifs';
import { fetchAllCountries } from '../Data/CountryData';
import hoverPopSound from '../Assets/Audios/hover-pop.mp3';
import releasePopSound from '../Assets/Audios/release-pop.mp3';
import clickSound from '../Assets/Audios/click.mp3';
import useSound from "use-sound";

const Settings = () => {

    // Context provides the settings state variable and setSettings function to the Settings component
    const {
        settings,
        setSettings
    } = useContext(SettingsContext);

    // Sounds
    const [playHoverPopSound] = useSound(hoverPopSound);
    const [playReleasePopSound] = useSound(releasePopSound);
    const [playClickSound] = useSound(clickSound);

    // List of countries
    const [countries, setCountries] = useState([]);

    // List of cities
    const [cities, setCities] = useState([]);

    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    /** Fetch all cities
     * This function fetches all cities from the database.
     * @param {null}
     * @returns {null}
     */
    const loadCities = async (countryCode) => {
        setCities([]);

        setIsLoading(true);

        const data = await fetchAllCities(countryCode);

        data.forEach(cityData => {
            let city = {city: cityData.name, country: cityData.country_code}
            setCities(cities => [...cities, city]);
        });

        setIsLoading(false);
    }

    /** Fetch all countries
     * This function fetches all countries from the database.
     * @param {null}
     * @returns {null}
     */
    const loadCountries = async () => {
        setIsLoading(true);

        const data = await fetchAllCountries();

        data.forEach(countryData => {
            let country = {country: countryData.name, countryCode: countryData.code}
            setCountries(countries => [...countries, country]);
        });

        setIsLoading(false);
    }

    /** Close Panel
     * This function is called when the user clicks on the close panel button.
     * @param {null}
     * @returns {null}
     */
    const closePanel = () => {
        setSettings({
            ...settings,
            panelOpen: false
        });
    }

    // Fetch all cities from the api when the component mounts
    useEffect(() => {
        loadCountries();
        if (settings.countryCode !== '') {
            loadCities(settings.countryCode);
        }
    }, []);

    /** Toggle Theme
     * This function is called when the user changes the theme.
     * @param {Event} e 
     */
    const toggleTheme = e => {
        setSettings({ ...settings, theme: e.target.value });
        if (e.target.value === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else if (e.target.value === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    return (
    <>
        <div className="settings-panel-container">
        <div className='settings-panel-header'>Settings</div>
            <div className='settings-panel'>
                {isLoading ? 
                <div className='loading-eye'>
                    <img src={loadingEye} alt='loading' />
                    <div> Loading... </div>
                </div>
                :
                <div className='settings-fields-container'>
                    <div className='settings-field-group'>
                        <label className='settings-field-label'>Theme</label>
                        <select className='settings-field-select' value={settings.theme} name="theme" 
                            onChange={(e) => {
                                toggleTheme(e);
                            }} onMouseEnter={playHoverPopSound} onMouseDown={playClickSound} onMouseUp={playReleasePopSound}>
                            <option value='light'>Light</option>
                            <option value='dark'>Dark</option>
                        </select>
                    </div>

                    <div className='settings-field-group'>
                        <label className='settings-field-label'>Temperature Unit</label>
                        <select className='settings-field-select' value={settings.temperatureUnit} name="temperatureUnit" 
                            onChange={(e) => {
                                setSettings({ ...settings, temperatureUnit: e.target.value });
                            
                            }} onMouseEnter={playHoverPopSound} onMouseDown={playClickSound} onMouseUp={playReleasePopSound}>
                            <option value='celsius'>°C</option>
                            <option value='fahrenheit'>°F</option>
                        </select>
                    </div> 

                    <div className='settings-field-group'>
                        <label className='settings-field-label'>Your Country</label>
                        <select className='settings-field-select' value={settings.countryCode ? settings.country : ""} name="countryCode" 
                            onChange={(e) => {
                                setSettings({ ...settings, countryCode: e.target.options[e.target.selectedIndex].value });
                                setSettings({ ...settings, country: e.target.options[e.target.selectedIndex].text });
                                loadCities(e.target.value);
                            }} onMouseEnter={playHoverPopSound} onMouseDown={playClickSound} onMouseUp={playReleasePopSound}>
                            <option value={settings.countryCode}>{settings.country}</option>
                            {countries.map(country => {
                                return (
                                    <option value={country.countryCode}>{country.country}</option>
                                )
                            })}
                        </select>
                    </div> 

                    <div className='settings-field-group'>
                        <label className='settings-field-label'>Your City</label>
                        <select className='settings-field-select' value={settings.city} name="city" 
                            onChange={(e) => {
                                setSettings({ ...settings, city: e.target.options[e.target.selectedIndex].value });
                            }} onMouseEnter={playHoverPopSound} onMouseDown={playClickSound} onMouseUp={playReleasePopSound}>
                            <option value={settings.city}>{settings.city}</option>
                            {cities.map(city => {
                                return (
                                <option value={city.city}>{city.city}, {city.country}</option>
                                )
                            })}
                        </select>
                    </div>  

                    <div className='submit-field-group'>
                        <button className='submit-button' onClick={closePanel} onMouseEnter={playHoverPopSound} onMouseDown={playClickSound} onMouseUp={playReleasePopSound}>Go Back</button>
                    </div>
                </div>
                }
            </div>
        </div>
    </>
    )
}

export default Settings;