<template>
    <div>
        <form>
            <div class="form-group">
                <label for="username">Login Id:</label>
                <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Login Id"
                        id="username"

                        v-model="login_id"
                >
            </div>
            <div class="form-group">
                <label for="pwd">Login Password:</label>
                <input
                        type="password"
                        class="form-control"
                        placeholder="Enter login password"
                        id="pwd"

                        v-model="login_password"
                >
            </div>

            <button
                    type="submit"
                    class="btn btn-primary"

                    @click.prevent="loginAction"
            >Login
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                login_id: '',
                login_password: '',
                error: null,
            }
        },
        methods: {
            async loginAction() {
                try {
                    await this.$store.dispatch('login', {
                        login_id: this.login_id,
                        login_password: this.login_password
                    })
                    await this.$router.push({name: 'home'});
                } catch (e) {
                    this.login_id = '';
                    this.login_password = '';
                }

            }
        }
    }
</script>

<style scoped>

</style>