import React, { useState, useContext, useEffect } from 'react';
import '../Styles/weather-info-panel.css';
import { WeatherContext, WeatherPanelLoadingContext } from '../Views/Dashboard';
import { SettingsContext } from '../Routers/SiteRouter';
import { loadingCircle } from '../Assets/Gifs';

const WeatherInfoPanel = () => {

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

    // This function fetches weather data from the Weather API and sets the weatherData state variable
    useEffect(() => {}, [weatherData]); 

    return (
    <>
        <div className="weather-panel">
            <div className='weather-group'>
                <div>|</div>
                <div className='label'>{settings.city}</div>
                <div className='data-container'>
                    <div className='data'>{weatherData.condition}</div>
                </div>
                <div>|</div>
            </div>
            <div className='weather-group'>
                <div className='label'>Temperature</div>
                <div className='data-container'>
                    <div className='data'>
                        {settings.temperatureUnit === "celsius" ? weatherData.temperatureC : settings.temperatureUnit === "fahrenheit" ? weatherData.temperatureF : null}
                        <span>{settings.temperatureUnit === "celsius" ? "°C" : settings.temperatureUnit === "fahrenheit" ? "°F" : null}</span>
                    </div>
                </div>
                <div>|</div>
            </div>
            <div className='weather-group'>
                <div className='label'>Feels like</div>
                <div className='data-container'>
                    <div className='data'>
                        {settings.temperatureUnit === "celsius" ? weatherData.feelsLikeC : settings.temperatureUnit === "fahrenheit" ? weatherData.feelsLikeF : null}
                        <span>{settings.temperatureUnit === "celsius" ? "°C" : settings.temperatureUnit === "fahrenheit" ? "°F" : null}</span>
                    </div>
                </div>
                <div>|</div>
            </div>
            <div className='weather-group'>
                <div className='label'>Last updated</div>
                <div className='data-container'>
                    <div className='data'>{weatherData.lastUpdated}</div>
                </div>
                <div>|</div>
            </div>
            {isLoading ? 
            <div className='weather-icon'>
                <img src={loadingCircle} alt="loading" />
            </div>
            :
            <div className="weather-icon">
                <img src={weatherData.icon} alt="weather-icon" />
            </div>
            }
        </div>
    </>
    )
}

export default WeatherInfoPanel;