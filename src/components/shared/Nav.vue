<template>
    <div>
        <template v-if="!!$store.getters.token">
            <router-link
                    tag="a"
                    :to="{name : 'home'}"
                    :active-class="'active'"
                    exact
            >Home
            </router-link>
            |
            <router-link
                    tag="a"
                    :to="{name: 'userIndex'}"
                    :active-class="'active'"
                    exact
            >User List
            </router-link>
            |

            <a href="#" @click.prevent="handelLogout">Logout</a>
        </template>

    </div>
</template>

<script>
    import {store} from "../../store/store";
    import notification from "../../mixins/noitice";

    export default {
        name: "Nav",
        methods: {
            async handelLogout() {
                try {
                    await store.dispatch('logout')
                        .then(() => {
                            notification.method.onSuccess('Successfully', 'Logout Successfully');
                            this.$router.push({name: 'login'})
                        })
                } catch (e) {
                    notification.method.onError('Fail', 'Logout Fail');
                    throw new Error('Something Wrong !')
                }
            }
        }
    }
</script>

<style scoped>
    .active {
        border: 2px solid aqua;
        background-color: coral;
        color: #931f22;
    }
</style>