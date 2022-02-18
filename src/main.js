import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSimpleAlert from "vue-simple-alert";
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false
import VuetifyMask from "vuetify-mask";
Vue.use(VuetifyMask);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
