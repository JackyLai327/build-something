import React, { useContext, useEffect, useState } from 'react';
import '../Styles/settings.css';
import { SettingsContext } from '../Routers/SiteRouter';
import { fetchAllCities, fetchCityByName } from '../Data/CityData';
import { loadingEye } from '../Assets/Gifs';

const Settings = () => {

    // Context provides the settings state variable and setSettings function to the Settings component
    const {
        settings,
        setSettings
    } = useContext(SettingsContext);

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
    const loadCities = async (country) => {
        setIsLoading(true);

        const data = await fetchAllCities();

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

        const data = await fetchAllCities();

        data.forEach(cityData => {
            let country = cityData.country_code;
            setCountries(countries => [...countries, country]);
        });

        setIsLoading(false);
    }

    /** Update Settings
     * This function is called when the user changes the settings.
     * @param {*} e : event
     * @returns {null}
     */
    const updateSettings = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
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
        loadCities();
    }, []);

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
                        <select className='settings-field-select' name="theme" onChange={updateSettings}>
                            <option value='light'>Light</option>
                            <option value='dark'>Dark</option>
                        </select>
                    </div>

                    <div className='settings-field-group'>
                        <label className='settings-field-label' name="temperatureUnit" onChange={updateSettings}>Temperature Unit</label>
                        <select className='settings-field-select'>
                            <option value='celsius'>°C</option>
                            <option value='fahrenheit'>°F</option>
                            <option value='kelvin'>K</option>
                        </select>
                    </div> 

                    <div className='settings-field-group'>
                        <label className='settings-field-label' name="city" onChange={updateSettings}>Your City</label>
                        <select className='settings-field-select'>
                            {cities.map(city => {
                                return (
                                <option value={city.city}>{city.city}, {city.country}</option>
                                )
                            })}
                        </select>
                    </div> 

                    <div className='settings-field-group'>
                        <label className='settings-field-label' name="city" onChange={updateSettings}>Your City</label>
                        <select className='settings-field-select'>
                            {cities.map(city => {
                                return (
                                <option value={city.city}>{city.city}, {city.country}</option>
                                )
                            })}
                        </select>
                    </div>  

                    <div className='submit-field-group'>
                        <div className="close-panel-button" onClick={closePanel}>X</div>
                        <button className='submit-button'>Go Back</button>
                    </div>
                </div>
                }
            </div>
        </div>
    </>
    )
}

export default Settings;