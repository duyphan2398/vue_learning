import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import Request from '../services/api.service'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: Cookie.get('token')
    },
    getters: {
        token: state => state.token
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
            Cookie.set('token', token)
        },
        LOG_OUT(state) {
            state.token = null
            Cookie.remove('token')
        }
    },
    actions: {
        login({commit}, data) {
            return Request.post('/auth/admin/login', data)
        },
        logout({commit}) {
            return Request.delete('auth/admin/logout')
                .then(() => {
                    return commit('LOG_OUT')
                })
        },
        getUser({commit}) {
            return Request.get('users', {
                per_page: 0,
                'include': 'prefecture',
                'sortBy[updated_at]': 'desc'
            });
        },
        getSpecialUser({commit}, userId) {
            return Request.get('users/' + userId, {
                include: 'roles',
            });
        },
        createUser({commit}, data) {
            return Request.post('users', data)
        },
        updateUser({commit}, {userId, data}) {
            return Request.patch('users/' + userId, data)
        },
        deleteUser({commit}, userId) {
            return Request.delete('users/' + userId)
        }
    }
})
