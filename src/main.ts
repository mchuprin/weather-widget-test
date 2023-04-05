import { createApp, defineCustomElement } from 'vue';
import './assets/styles/main.scss';
import WeatherWidget from './WeatherWidget.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

const customTheme = {
    variables: {},
    dark: false,
    colors: {
        // background: '#88B5EE',
        surface: '#D8E8FF',
        primary: '#247AF5',
        secondary: '#A08DAB',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
};
const vuetify = createVuetify({
    theme: {
        defaultTheme: 'customTheme',
        themes: {
            customTheme
        }
    },
    defaults: {
        VBtn: {
            color: 'primary',
            variant: 'text'
        },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
          mdi
      }
    },
    components,
    directives,
});

createApp(WeatherWidget)
    .use(vuetify)
    .mount('#app');

const weatherWidget = defineCustomElement(WeatherWidget);
customElements.define('weather-widget', weatherWidget);


