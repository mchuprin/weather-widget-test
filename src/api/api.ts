import axios, { AxiosInstance } from 'axios';
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

const weatherApi: AxiosInstance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/weather`,
    params: {
        appid: VITE_API_KEY,
        units: 'metric'
    }
});

export { weatherApi };
