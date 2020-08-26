import axios from 'axios';
import {store} from "../store/store";
import {router} from "../main.js"
import Cookie from 'js-cookie'
const apiService = axios.create();

apiService.interceptors.request.use(
    (config) => {
        config.baseURL = 'http://applican.thanhtu150.top/api/cms';
        config.headers['Accept'] = '*/*';
        config.headers['Content-Type'] = 'application/json';
        if (Cookie.get('token')) {
            config.headers['Authorization'] = `Bearer ${Cookie.get('token')}`;

        }
        return config;
    }
)

apiService.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        let {status} = error.response;
        if (status === 401) {

            store.commit('LOG_OUT')
            await router.push({name: 'login'});
        }
        if ([403, 404, 429].includes(status)) {
            await router.push({name: 'error404'});
        }
        return Promise.reject(error);
    }
);


export default Request = {
    get(path, params) {
        return apiService.get(path, {params});
    },
    post(path, params) {
        return apiService.post(path, params);
    },
    patch(path, params) {
        return apiService.patch(path, params);
    },
    delete(path) {
        return apiService.delete(path);
    }
};

