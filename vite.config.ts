import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
      plugins: [
          vue({
              template: {
                  compilerOptions: {
                      isCustomElement: (tag) => tag.includes('weather-widget'),
                  }
              }
          })
      ],
    build: {
        lib: {
          entry: './src/main.ts',
          name: 'weather-widget',
          fileName: 'weather-widget'
        }
    }
  });
}
