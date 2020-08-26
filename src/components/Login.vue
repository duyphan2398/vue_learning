<template>
  <div class="container">
    <div class="row">
      <div class="col" id="login_form">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(loginAction)">


            <ValidationProvider rules="required"
                                v-slot="{ errors }"
                                name="Login Id">
              <div class="form-group">
                <label for="username">Login Id:</label>
                <input type="text"
                       class="form-control"
                       placeholder="Enter Login Id"
                       id="username"
                       v-model="login_id">
                <span class="text-danger font-size mt-1" v-if="errors.length"> {{ errors[0] }}</span>
              </div>
            </ValidationProvider>


            <ValidationProvider rules="required"
                                v-slot="{ errors }"
                                name="Login Password">
              <div class="form-group">
                <div class="form-group">
                  <label for="pwd">Login Password:</label>
                  <input
                      type="password"
                      class="form-control"
                      placeholder="Enter login password"
                      id="pwd"
                      v-model="login_password">
                  <span class="text-danger font-size mt-1" v-if="errors.length"> {{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>

            <button
                type="submit"
                class="btn btn-primary"
            >Login
            </button>

          </form>
        </ValidationObserver>

      </div>
    </div>
  </div>
</template>

<script>
  import notification from '../mixins/noitice'

  export default {
    name: 'Login',
    data () {
      return {
        login_id: '',
        login_password: '',
      }
    },
    methods: {
      async loginAction () {
        await this.$store.dispatch('login', {
          login_id: this.login_id,
          login_password: this.login_password,
        }).then((res) => {
          this.$store.commit('SET_TOKEN', res.data.token)
          notification.method.onSuccess('Successfully', 'Login Successfully')
          this.$router.push({ name: 'home' })
        }).catch(() => {
          notification.method.onError('Fail', 'Login Fail')
          this.login_id = ''
          this.login_password = ''
          this.$refs.observer.reset()
        })

      },
    },
  }
</script>

<style scoped>
  #login_form {
    background-color: blueviolet;
    border-radius: 5%;
    padding: 30px;
    color: #ffff99;
  }
</style>