<template>
    <form @submit.prevent="submit" class="w-50">
        <div class="form-group">
            <label for="login_id">Login ID</label>
            <input type="text" class="form-control" id="login_id" v-model="newUser.login_id">
        </div>
        <div class="form-group">
            <label for="nickname">Nickname</label>
            <input type="text" class="form-control" id="nickname" v-model="newUser.nickname">
        </div>
        <div class="form-group">
            <label for="mail">Mail</label>
            <input type="email" class="form-control" id="mail" v-model="newUser.mail">
        </div>

        <template v-if="$route.name === 'userCreate'">
            <div class="form-group">
                <label for="password">Pasword</label>
                <input type="password" class="form-control" id="password" v-model="newUser.login_password">
            </div>
            <div class="form-group">
                <label for="password_confirmation">Password Confirmation</label>
                <input type="password"
                       class="form-control"
                       id="password_confirmation"
                       v-model="newUser.login_password_confirmation">
            </div>
        </template>

        <div class="form-group">
            <button type="submit" class="btn btn-outline-primary"> Submit</button>
        </div>
    </form>
</template>

<script>
    import {store} from "../../store/store";

    export default {
        name: "Form",
        data() {
            return {
                newUser: {
                    login_id: '',
                    nickname: '',
                    mail: '',
                    login_password: '',
                    login_password_confirmation: ''
                }
            }
        },
        created() {
            if (this.$route.meta['user']) {
                let user = this.$route.meta['user'];
                this.newUser = Object.assign({}, user);
            }
        },
        methods: {
            submit() {
                let data = this.newUser;
                data.gender = 1;
                data.is_active = 1;
                if (this.$route.name === 'userEdit') {
                    this.update(data);
                } else {
                    this.create(data);
                }
            },
            async update(data) {
                await store.dispatch('updateUser',this.$route.params.id ,data)
                await this.$router.push({name: 'userIndex'})
            },
            async create(data) {
                await store.dispatch('createUser', data)
                await this.$router.push({name: 'userIndex'})
            }
        }
    }
</script>

<style scoped>

</style>