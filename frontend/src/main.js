import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config";
import store from './store'

//themes css
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.min.css";



const app = createApp(App);
app.use(PrimeVue);

app.use(store).use(router).mount('#app')
