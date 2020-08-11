import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import VueRouter from 'vue-router'
import {routes} from "./routes"
Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.use(Antd)


const router = new VueRouter({
  mode: 'history',
  routes
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
