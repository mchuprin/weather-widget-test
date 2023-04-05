<template>
    <v-app class="Settings" >
        <v-theme-provider theme="customTheme">
            <div v-if="isSet">
                <v-btn
                    color="primary"
                    icon="mdi-window-close"
                    class="Settings__nav"
                    @click="changeIsSet" />
                <Settings />
            </div>
            <div v-else>
                <v-btn
                    color="primary"
                    icon="mdi-cog"
                    class="Settings__nav"
                    @click="changeIsSet"/>
                <Weather/>
            </div>
        </v-theme-provider>
    </v-app>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import Weather from "./components/Weather.vue";
import Settings from './components/Settings.vue';
import { useWeather } from "./composables/weather";

export default {
    name: 'WeatherWidget',
    components: { Weather, Settings },
    setup() {
        const isSet = ref(false);

        const { getWeather } = useWeather();
        onMounted(async() => {
            await getWeather();
        });

        const changeIsSet = () => isSet.value = !isSet.value;

        return { isSet, changeIsSet };
    }
};

</script>

<style lang="scss" scoped>
.Settings {
    position: relative;
    max-width: 400px;
    max-height: 400px;

    &__nav {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1000;
    }
}
</style>
