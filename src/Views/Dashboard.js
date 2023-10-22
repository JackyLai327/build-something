import NavBar from "../Components/NavBar";
import UIControls from "../Components/UIControls";
import { fetchWeather } from "../Data/WeatherData";
import { useEffect, useState } from "react";

const Dashboard = () => {

    // This state variable keeps track of the weather data
    const [weatherData, setWeatherData] = useState(
        {
            temperatureC: 0,
            temperatureF: 0,
            feelsLikeC: 0,
            feelsLikeF: 0,
            condition: '',
        }
    );

    // This function fetches weather data from the Weather API and sets the weatherData state variable
    const getWeather = async () => {
        const data = await fetchWeather('New York');
        setWeatherData(
            {
                temperatureC: data.current.temp_c,
                temperatureF: data.current.temp_f,
                feelsLikeC: data.current.feelslike_c,
                feelsLikeF: data.current.feelslike_f,
                condition: data.current.condition.text,
            }
        );
    }

    // This useEffect hook calls the getWeather function when the component mounts
    useEffect(() => {
        getWeather();
    }, []);

    return (
    <>
        <div>
            <UIControls />
        </div>
    </>
    );
}

export default Dashboard;