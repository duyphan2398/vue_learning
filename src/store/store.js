import Vue from 'vue';
import Vuex from 'vuex';
import Cookie from 'js-cookie';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: Cookie.get('token')
    },
    getters: {
        token: state => state.token
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            Cookie.set('token', token);
        },
        LOG_OUT(state){
            state.token = null
            Cookie.remove('token')
        }
    }
})