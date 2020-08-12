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
    import {apiService} from "../../services/api.service";

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
                await apiService.patch('users/' + this.$route.params.id,
                    data, {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token
                        }
                    }).then(async () => {
                    this.$notification.success({
                        message: 'Successfully',
                        description: 'Update Successfully',
                        placement: 'topRight',
                        duration: 1,
                        style: {
                            'background': "#ca7474",
                            'font-size': 'large',
                            'width': '50%'
                        }
                    });
                    await this.$router.push({name: 'userIndex'})
                }).catch(() => {
                    this.$notification.error({
                        message: 'Fail',
                        description: 'Update Fail',
                        placement: 'topRight'
                    })
                })
            },
            async create(data) {
                await apiService.post('users',
                    data, {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.getters.token
                        }
                    }).then(async () => {
                    this.$notification.success({
                        message: 'Successfully',
                        description: 'Create Successfully',
                        placement: 'topRight',
                        duration: 1,
                        style: {
                            'background': "#ca7474",
                            'font-size': 'large',
                            'width': '50%'
                        }
                    });
                    await this.$router.push({name: 'userIndex'})
                }).catch(() => {
                    this.$notification.error({
                        message: 'Fail',
                        description: 'Create Fail',
                        placement: 'topRight'
                    })
                })
            }

        }

    }
</script>

<style scoped>

</style>