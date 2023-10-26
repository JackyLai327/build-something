import UIControls from "../Components/UIControls";
import { fetchWeather } from "../Data/WeatherData";
import React, { useEffect, useState, useContext } from "react";
import { SettingsContext } from "../Routers/SiteRouter";
import WeatherInfoPanel from "../Components/WeatherInfoPanel";

export const WeatherContext = React.createContext(null);
export const WeatherPanelLoadingContext = React.createContext(null);

const Dashboard = () => {

    // Context provides the settings state variable and setSettings function to the Settings component
    const {
        settings,
        setSettings
    } = useContext(SettingsContext);

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // This state variable keeps track of the weather data
    const [weatherData, setWeatherData] = useState(
        {
            temperatureC: 0,
            temperatureF: 0,
            feelsLikeC: 0,
            feelsLikeF: 0,
            condition: '',
            isDay: 1,
            lastUpdated: "",
            icon: ""
        }
    );

    // This function fetches weather data from the Weather API and sets the weatherData state variable
    const getWeather = async () => {

        setIsLoading(true);

        const data = await fetchWeather(settings.city);

        setWeatherData(
            {
                temperatureC: data.current.temp_c,
                temperatureF: data.current.temp_f,
                feelsLikeC: data.current.feelslike_c,
                feelsLikeF: data.current.feelslike_f,
                condition: data.current.condition.text,
                isDay: data.current.is_day,
                lastUpdated: data.current.last_updated,
                icon: data.current.condition.icon,
            }
        );

        setIsLoading(false)
    }

    // This useEffect hook calls the getWeather function when the component mounts
    useEffect(() => {
        getWeather();
    }, [settings]);

    return (
    <WeatherContext.Provider value={{weatherData, setWeatherData}}>
        <div>
            <UIControls />
            <WeatherPanelLoadingContext.Provider value={isLoading}>
                <WeatherInfoPanel  />
            </WeatherPanelLoadingContext.Provider>
        </div>
    </WeatherContext.Provider>
    );
}

export default Dashboard;