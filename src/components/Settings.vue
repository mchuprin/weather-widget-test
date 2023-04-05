//TODO: добавтьб опций для draggable
<template>
    <v-card title="Settings" :class="$style.Settings" class="pa-3 h-100">
        <v-list>
            <draggable v-model="weather" ghost-class="ghost" group="settings" item-key="weather">
                <template #item="{ element }">
                    <v-list-item class="mb-2" variant="tonal">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-menu" />
                        </template>
                        <v-list-item-title>{{ element.city + ', ' + element.country }}</v-list-item-title>
                        <template v-slot:append>
                            <v-icon icon="mdi-delete" @click="deleteCity(element.city)"/>
                        </template>
                    </v-list-item>
                </template>
            </draggable>
        </v-list>
        <v-text-field label="Enter the city" variant="outlined" v-model.trim="cityValue" @keydown.enter="inputCity" :error-messages="cityError" />
    </v-card>
</template>
<script>
import draggable from 'vuedraggable'
import { useWeather } from '../composables/weather';
import { ref, onBeforeUnmount, watch } from 'vue';

export default {
    name: 'Settings',
    components: { draggable },
    setup() {
        const { weather, addCity, deleteCity } = useWeather();
        const cityValue = ref('');
        const cityError = ref('');
        const errorTimeout = ref();
        const inputCity = async (event) => {
            try {
                await addCity(event.target.value);
                cityValue.value = '';
            } catch (e) {
                const error = e.response.data.message.split(' ');
                error[0] = error[0].charAt(0).toUpperCase() + error[0].slice(1);
                cityError.value = error.join(' ');
                cityValue.value = '';
                errorTimeout.value = setTimeout(() => cityError.value = '', 2000);
            }
        }

        onBeforeUnmount(() => {
            clearTimeout(errorTimeout.value);
        });

        watch(weather, () => {
            if (weather.value === []) {
                weather.value.length === 0 ? localStorage.clear() : localStorage.weather = JSON.stringify(weather.value);
            }
        });

        return { weather, addCity, deleteCity, inputCity, cityValue, cityError }
    }
};
</script>
<style lang="scss" module></style>
