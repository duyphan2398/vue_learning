<template>
    <div>
        <hr>
        <router-link
                tag="button"
                :to="{name: 'userCreate'}"
                v-bind:class="{btn :true, 'btn-success' : true, 'mb-2': true}"
        >Create User
        </router-link>
        <table class="table table-striped">
            <thead>
            <td>ID</td>
            <td>LOGIN ID</td>
            <td>NICK NAME</td>
            <td>TEL</td>
            <td>Action</td>
            </thead>
            <tbody>
            <tr v-for="user in userList" :key="user.id">
                <td>
                    {{user.id}}
                </td>
                <td>
                    {{user.login_id}}
                </td>
                <td>
                    {{user.nickname}}
                </td>
                <td>
                    {{user.tel}}
                </td>
                <td>
                    <router-link
                            tag="button"
                            :to="{name : 'userEdit', params: { id: user.id}}"
                            exact
                            :class="'btn btn-success m-2'"
                    >Edit
                    </router-link>

                    <button
                            class="btn btn-danger m-2"
                            @click="handleDelete(user.id)"
                    >Delete
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {store} from "../../store/store";

    export default {
        name: "Index",
        data() {
            return {
                userList: []
            }
        },
        async beforeRouteEnter(to, from, next) {
            let response = await store.dispatch('getUser');
            to.meta['userList'] = response.data.data;
            return next()
        },
        created() {
            this.userList = this.$route.meta['userList']
        },
        methods: {
            async handleDelete(id) {
                try {
                    debugger
                    await store.dispatch('deleteUser', id)
                    let userList = await store.dispatch('getUser')
                    this.userList = userList.data.data
                } catch (e) {
                    throw new Error('Something Fail')
                }

            }
        }
    }
</script>

<style scoped>

</style>