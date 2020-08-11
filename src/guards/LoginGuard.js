export const LoginGuard = async (to, from, next) => {
    if (localStorage.getItem('token')) {
        next({name : 'home'});
    }else {
        next();
    }
}