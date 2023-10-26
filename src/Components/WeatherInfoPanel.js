import React, { useState, useContext, useEffect } from 'react';
import '../Styles/weather-info-panel.css';
import { WeatherContext, WeatherPanelLoadingContext } from '../Views/Dashboard';
import { SettingsContext } from '../Routers/SiteRouter';
import { loadingCircle } from '../Assets/Gifs';

const WeatherInfoPanel = () => {

    // This state variable keeps track of whether the panel is open or closed
    const [panelOpen, setPanelOpen] = useState(false);

    // Context provides the weatherData state variable and setWeatherData from Dashboard
    const {
        weatherData,
        setWeatherData
    } = useContext(WeatherContext);

    // Context provides the loading state variable
    const isLoading = useContext(WeatherPanelLoadingContext);

    // Context provides the settings state variable and setSettings function form SiteRouter 
    const {
        settings,
        setSettings
    } = useContext(SettingsContext);

    useEffect(() => {
    }, [weatherData]);

    return (
    <>
        <div className="weather-panel">
            {!panelOpen ?
            <div className='weather-panel-collapsed' onClick={() => setPanelOpen(true)}>
                <div>&lt;</div>
                {isLoading ?
                <img className='loading-circle' src={loadingCircle} alt="loading" />
                :
                <img className='weather-icon' src={weatherData.icon} alt="weather" />
                }
            </div>
            :
            <div className='weather-panel-expanded'>
                <div className='collapse-button' onClick={() => setPanelOpen(false)}><div>&gt;</div></div>
                <div className="weather-details">
                    {isLoading ? 
                    <div className='weather-icon-expanded'>
                        <img src={loadingCircle} alt="loading" />
                    </div>
                    :
                    <div className="weather-icon-expanded">
                        <img src={weatherData.icon} alt="weather-icon" />
                        <img src={weatherData.icon} alt="weather-icon" />
                        <img src={weatherData.icon} alt="weather-icon" />
                    </div>
                    }
                    <div className='weather-group'>
                        <div>Current weather in {settings.city} </div>
                        <div>{weatherData.condition}</div>
                    </div>
                    <div className='weather-group'>
                        <div>Temperature</div>
                        <div>
                            {settings.temperatureUnit === "Celsius" ? weatherData.temperatureC : settings.temperatureUnit === "Fahrenheit" ? weatherData.temperatureF : null}
                            <span>{settings.temperatureUnit === "Celsius" ? "°C" : settings.temperatureUnit === "Fahrenheit" ? "°F" : null}</span>
                        </div>
                    </div>
                    <div className='weather-group'>
                        <div>Feels like</div>
                        <div>
                            {settings.temperatureUnit === "Celsius" ? weatherData.feelsLikeC : settings.temperatureUnit === "Fahrenheit" ? weatherData.feelsLikeF : null}
                            <span>{settings.temperatureUnit === "Celsius" ? "°C" : settings.temperatureUnit === "Fahrenheit" ? "°F" : null}</span>
                        </div>
                    </div>
                    <div className='weather-group'>
                        <div>Last updated</div>
                        <div>{weatherData.lastUpdated}</div>
                    </div>
                </div>
            </div>
            }
        </div>
    </>
    )
}

export default WeatherInfoPanel;