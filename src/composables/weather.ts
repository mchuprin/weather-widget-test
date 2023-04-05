import { ref, Ref } from "vue";
import { weatherApi } from "../api/api";
import { AxiosResponse } from "axios";

interface ICityWeather {
    city: string,
    country: string,
    icon: string,
    temp: string,
    description: string
    windSpeed: string,
    pressure: string,
    humidity: string,
    visibility: string,
};

const weather:Ref<ICityWeather[]> = ref([]);

const convertObject = (value: AxiosResponse) :ICityWeather => {
    return {
        city: value.data.name,
        country: value.data.sys.country,
        icon: value.data.weather[0].icon,
        temp: value.data.main.temp,
        description: value.data.weather[0].description,
        windSpeed: value.data.wind.speed,
        pressure: value.data.main.pressure,
        humidity: value.data.main.humidity,
        visibility: value.data.visibility,
    }
}
export function useWeather() {
    const getWeather = async (): Promise<void> => {
        if (localStorage.weather) {
            weather.value = JSON.parse(localStorage.weather);
        } else {
            navigator.geolocation.getCurrentPosition(
                async (position: GeolocationPosition): Promise<void> => {
                const res: AxiosResponse = await weatherApi.get(`?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);

                weather.value.push(convertObject(res));
                localStorage.setItem('weather', JSON.stringify(weather.value));
                },
                async (): Promise<void> => {
                    const res: AxiosResponse<any, any> = await weatherApi.get('?q=moscow');

                    weather.value.push(convertObject(res));
                    localStorage.setItem('weather', JSON.stringify(weather.value));
                }
            )
        }
    }

    const addCity = async (city: string): Promise<void> => {
        if (weather.value.filter((el: ICityWeather): boolean => el.city.toLowerCase() === city.toLowerCase()).length === 0) {
            try {
                const res: AxiosResponse<any, any> = await weatherApi.get(`?q=${city}`);
                weather.value.push(convertObject(res));
                localStorage.setItem('weather', JSON.stringify(weather.value))
            } catch (e) {
                throw e;
            }
        }
    }

    const deleteCity = async (city: string): Promise<void> => {
        weather.value = weather.value.filter((el: ICityWeather) => el.city.toLowerCase() !== city.toLowerCase());
        localStorage.setItem('weather', JSON.stringify(weather.value));
    }

    return {
        weather,
        addCity,
        deleteCity,
        getWeather,
    };
}
