import axios from "axios";

const BASE_URL = "http://api.weatherapi.com/v1";
const CURRENT_WEATHER = "/current.json";
const API_KEY = "f26a090c10a745309de113708232210";

/** Fetch Weather Data from Weather API
 * 
 * @param {string} city 
 * @returns 
 */
const fetchWeather = async (city) => {
    const url = `${BASE_URL}${CURRENT_WEATHER}?key=${API_KEY}&q=${city}`;
    const response = await axios.get(url);
    return response.data;
}

export { fetchWeather };