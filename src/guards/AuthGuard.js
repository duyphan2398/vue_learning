import {store} from '../store/store';

export const AuthGuard = (to, from, next) => {
    if (store.getters.token) {
        next();
    } else {
        next({name: 'login'});
    }
}