import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import Request from '../services/api.service'
import notification from "../mixins/noitice";


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
                .then((res) => {
                    commit('SET_TOKEN', res.data.token);
                    notification.method.onSuccess('Successfully', 'Login Successfully');
                })
                .catch(() => {
                    notification.method.onError('Fail', 'Login Fail');
                });
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
                .then(() => {
                    notification.method.onSuccess('Successfully', 'Update Successfully');
                })
                .catch(() => {
                    notification.method.onError('Fail', 'Update Fail');
                })
        },
        updateUser({commit}, userId, data) {
            return Request.patch('users/' + userId, data)
                .then(() => {
                    notification.method.onSuccess('Successfully', 'Update Successfully');
                })
                .catch(() => {
                    notification.method.onError('Fail', 'Update Fail');
                })
        },
        deleteUser({commit}, userId) {
            return Request.delete('users/' + userId)
                .then(() => {
                    notification.method.onSuccess('Successfully', 'Delete Successfully')
                })
                .catch(() => {
                    notification.method.onError('Fail', 'Delete Fail');
                });
        }
    }
})
