import axios from "axios";

const API_KEY = "0c58e01d-1428-459d-933a-675cfb4b4322";
const BASE_URL = "https://airlabs.co/api/v9/countries";

/** Fetch all countries from City API
 * This function fetches all countries from the City API
 * @param {null}
 * @returns {Promise} countries
 */
const fetchAllCountries = async () => {
    const url = `${BASE_URL}?api_key=${API_KEY}`;
    const fetchResult = await axios.get(url);
    return fetchResult.data.response;
}

export { fetchAllCountries };