import axios from 'axios';
import {store} from "../store/store";

const apiService = axios.create();

apiService.interceptors.request.use(
    (config) => {
        config.baseURL = 'http://applican.thanhtu150.top/api/cms';
        config.headers['Accept'] = '*/*';
        config.headers['Content-Type'] = 'application/json';
        if (store.getters.token) {
            config.headers['Authorization'] = `Bearer ${store.getters.token}`;

        }
        return config;
    }
)

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

