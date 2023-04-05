<template>
    <v-carousel
        class="Weather"
        :show-arrows="false"
        hide-delimiter-background
        height="calc(100% + 4px)"
    >
        <v-carousel-item
            v-for="city in weather" :key="city.city"
        >
            <v-card class="Weather pa-3">
                <v-card-title>
                    {{ city.city + ', ' + city.country }}
                </v-card-title>
                <v-card-text>
                    <img :src="`http://openweathermap.org/img/w/${city.icon}.png`" alt="">
                    <p>Feels like {{ city.temp }} <span>{{ city.description }}</span></p>
                    <div class="d-flex">
                        <v-icon class="mr-2" color="secondary" icon="mdi-weather-windy" /><span class="mr-5">{{ city.windSpeed }}m/s</span>
                        <v-icon class="mr-2" color="secondary" icon="mdi-thermostat" /><span>{{ city.pressure }}hPa</span>
                    </div>
                    <p>Humidity: {{ city.humidity }}%</p>
                    <p>Visibility: {{ city.visibility }}km</p>
                </v-card-text>
            </v-card>
        </v-carousel-item>
    </v-carousel>
</template>
<script lang="ts">
import { useWeather } from '../composables/weather';

export default {
    name: 'WeatherWidget',
    setup() {
        const { weather } = useWeather();

        return { weather };
    }
};
</script>
<style lang="scss" module></style>
