import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
import Index from "./components/user/Index.vue";
import Edit from "./components/user/Edit.vue";
import {AuthGuard} from "./guards/AuthGuard";
import {LoginGuard} from "./guards/LoginGuard";
import Create from "./components/user/Create";

export const routes = [
    //login
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: LoginGuard
    },

    //homepage
    {
        path: '',
        name: 'home',
        component: Home,
        beforeEnter: AuthGuard
    },

    //user
    {
        path: '/user',
        name: 'userIndex',
        component: Index,
        beforeEnter: AuthGuard,
    },
    {
        path: '/user/:id',
        name: 'userEdit',
        component: Edit,
        beforeEnter: AuthGuard,
    },
    {
        path: '/user',
        name: 'userCreate',
        component: Create,
        beforeEnter: AuthGuard,
    },

    {path: '*', redirect: '/'}

];