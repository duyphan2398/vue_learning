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
                    <button
                            class="btn btn-success m-2"
                            @click="handleEdit(user.id)"
                    >Edit
                    </button>

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
    import Request from "../../services/api.service";
    import {store} from "../../store/store";

    export default {
        name: "Index",
        data() {
            return {
                userList: []
            }
        },
        async beforeRouteEnter(to, from, next) {
            await Request.get('users', {
                per_page: 0,
                'include': 'prefecture',
                'sortBy[updated_at]': 'desc'
            }).then((res) => {
                return next((vm) => {
                    vm.userList = res.data.data
                })
            })
        },
        methods: {
            handleEdit(id) {
                this.$router.push('user/' + id)
            },
            async handleDelete(id) {
                await Request.delete('users/' + id)
                    .then(async () => {
                        this.$notification.success({
                            message: 'Successfully',
                            description: 'Delete Successfully',
                            placement: 'topRight'
                        });
                        return await Request.get('users', {
                            per_page: 0,
                            'include': 'prefecture',
                            'sortBy[updated_at]': 'desc'
                        })
                    }).then((res) => {
                        this.userList = res.data.data
                    })
                    .catch(() => {
                        this.$notification.error({
                            message: 'Fail',
                            description: 'Delete Fail',
                            placement: 'topRight'
                        });
                    })
            }
        }
    }
</script>

<style scoped>

</style>