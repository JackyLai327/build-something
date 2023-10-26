import React, { useContext, useEffect, useState } from 'react';
import '../Styles/settings.css';
import { SettingsContext } from '../Routers/SiteRouter';
import { fetchAllCities, fetchCityByName } from '../Data/CityData';
import { loadingEye } from '../Assets/Gifs';
import { fetchAllCountries } from '../Data/CountryData';

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
    const loadCities = async (countryCode) => {
        console.log(countryCode);
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
        loadCities(settings.countryCode);
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
                        <select className='settings-field-select' value={settings.theme} name="theme" 
                            onChange={(e) => {
                                setSettings({ ...settings, theme: e.target.value });
                            }}>
                            <option value='light'>Light</option>
                            <option value='dark'>Dark</option>
                        </select>
                    </div>

                    <div className='settings-field-group'>
                        <label className='settings-field-label'>Temperature Unit</label>
                        <select className='settings-field-select' value={settings.temperatureUnit} name="temperatureUnit" 
                            onChange={(e) => {
                                setSettings({ ...settings, temperatureUnit: e.target.value });
                            
                            }}>
                            <option value='celsius'>°C</option>
                            <option value='fahrenheit'>°F</option>
                        </select>
                    </div> 

                    <div className='settings-field-group'>
                        <label className='settings-field-label'>Your Country</label>
                        <select className='settings-field-select' value={settings.country} name="countryCode" 
                            onChange={(e) => {
                                setSettings({ ...settings, countryCode: e.target.options[e.target.selectedIndex].value });
                                setSettings({ ...settings, country: e.target.options[e.target.selectedIndex].text });
                                loadCities(e.target.value);
                            }}>
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
                            }}>
                            <option value={settings.city}>{settings.city}</option>
                            {cities.map(city => {
                                return (
                                <option value={city.city}>{city.city}, {city.country}</option>
                                )
                            })}
                        </select>
                    </div>  

                    <div className='submit-field-group'>
                        <div className="close-panel-button" onClick={closePanel}>X</div>
                        <button className='submit-button' onClick={closePanel}>Go Back</button>
                    </div>
                </div>
                }
            </div>
        </div>
    </>
    )
}

export default Settings;