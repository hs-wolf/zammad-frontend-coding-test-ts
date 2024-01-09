import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './assets/css/tailwind.css'
import './assets/css/main.css'
import App from './App.vue'
import initializeRouter from './router'
import { usePokeapiStore } from './stores'

const app = createApp(App)
const pinia = createPinia()

initializeRouter(app)
app.use(pinia)
usePokeapiStore().fetchPokemons()
app.mount('#app')
