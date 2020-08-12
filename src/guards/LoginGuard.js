import {store} from '../store/store';

export const LoginGuard = (to, from, next) => {
    if (store.getters.token) {
        next({name: 'home'});
    } else {
        next();
    }
}