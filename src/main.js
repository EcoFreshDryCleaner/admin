import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import router from './router'
import firebaseApp from './firebase/config'

/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})

app.mount('#app')
