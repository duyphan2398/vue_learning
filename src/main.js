import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import VueRouter from 'vue-router'
import {routes} from "./routes"
import {store} from "./store/store"


import './plugins/validation/index.js'


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Antd)

export const router = new VueRouter({
    mode: 'history',
    routes
})
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
