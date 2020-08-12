<template>
    <div>
        <template v-if="this.$store.getters.token ? (true) : (false)" >
            <router-link
                    tag="a"
                    :to="{name : 'home'}"
                    :active-class="'active'"
                    exact
            >Home
            </router-link>  |
            <router-link
                    tag="a"
                    :to="{name: 'userIndex'}"
                    :active-class="'active'"
                    exact
            >User List
            </router-link> |

            <a href="#" @click.prevent="handelLogout">Logout</a>
        </template>

    </div>
</template>

<script>
    import {apiService} from "../../services/api.service";

    export default {
        name: "Nav",
        methods : {
            async handelLogout() {
                let self = this;
                await apiService.delete('auth/admin/logout', {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.getters.token
                    }
                }).then(async (res) => {
                    await self.$store.commit('LOG_OUT');
                    self.$notification.success({
                        message: 'Successfully',
                        description: 'Logout Successfully',
                        placement: 'topRight',
                        duration: 1,
                        style: {
                            'background': "#ca7474",
                            'font-size': 'large',
                            'width': '50%'
                        }
                    });
                    await self.$router.push({name: 'login'})
                })

            }
        }
    }
</script>

<style scoped>
    .active {
        background-color: red;
        color: #931f22;
    }
</style>