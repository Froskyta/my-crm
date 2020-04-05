import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VueMaterial from 'vue-material'
import VuePageTitle from 'vue-page-title';



import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial);
Vue.use(VuePageTitle);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
