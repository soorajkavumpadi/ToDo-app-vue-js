import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {store} from './store'

Vue.config.productionTip = false
Vue.component('Navbar',require('./components/Navbar.vue').default);
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
