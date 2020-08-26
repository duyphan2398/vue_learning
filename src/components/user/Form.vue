<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submit)" class="w-50">

      <ValidationProvider rules="required"
                          v-slot="{ errors }"
                          name="Login Id">
        <div class="form-group">
          <label for="login_id">Login ID</label>
          <input type="text" class="form-control" id="login_id" v-model="newUser.login_id">
          <span class="text-danger font-size mt-1" v-if="errors.length"> {{ errors[0] }}</span>
        </div>
      </ValidationProvider>


      <ValidationProvider rules="required"
                          v-slot="{ errors }"
                          name="Nickname">
        <div class="form-group">
          <label for="nickname">Nickname</label>
          <input type="text" class="form-control" id="nickname" v-model="newUser.nickname">
          <span class="text-danger font-size mt-1" v-if="errors.length"> {{ errors[0] }}</span>
        </div>
      </ValidationProvider>


      <ValidationProvider rules="required|email"
                          v-slot="{ errors }"
                          name="Mail">
        <div class="form-group">
          <label for="mail">Mail</label>
          <input type="email" class="form-control" id="mail" v-model="newUser.mail">
          <span class="text-danger font-size mt-1" v-if="errors.length"> {{ errors[0] }}</span>
        </div>
      </ValidationProvider>


      <template v-if="$route.name === 'userCreate'">
        <ValidationProvider rules="required|half_alphabet"
                            v-slot="{ errors }"
                            name="Password">
          <div class="form-group">
            <label for="password">Pasword</label>
            <input type="password" class="form-control" id="password" v-model="newUser.login_password">
            <span class="text-danger font-size mt-1" v-if="errors.length"> {{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required|confirmed:Password"
                            v-slot="{ errors }"
                            name="Password Confirmation">
          <div class="form-group">
            <label for="password_confirmation">Password Confirmation</label>
            <input type="password"
                   class="form-control"
                   id="password_confirmation"
                   v-model="newUser.login_password_confirmation">
            <span class="text-danger font-size mt-1" v-if="errors.length"> {{ errors[0] }}</span>
          </div>
        </ValidationProvider>
      </template>

      <template v-else>
        <ValidationProvider rules=""
                            v-slot="{ errors }"
                            name="Password">
          <div class="form-group">
            <label for="password">Pasword</label>
            <input type="password" class="form-control" id="password_edit" v-model="newUser.login_password">
            <span class="text-danger font-size mt-1" v-if="errors.length"> {{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider :rules="{confirmed:'Password', required_if: newUser.login_password !== ''}"
                            v-slot="{ errors }"
                            name="Password Confirmation">
          <div class="form-group">
            <label for="password_confirmation">Password Confirmation</label>
            <input type="password"
                   class="form-control"
                   id="password_confirmation_edit"
                   v-model="newUser.login_password_confirmation">
            <span class="text-danger font-size mt-1" v-if="errors.length"> {{ errors[0] }}</span>
          </div>
        </ValidationProvider>
      </template>

      <div class="form-group">
        <button type="submit" class="btn btn-outline-primary"> Submit</button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
  import { store } from '../../store/store'
  import notification from '../../mixins/noitice'

  export default {
    name: 'Form',
    data () {
      return {
        newUser: {
          login_id: '',
          nickname: '',
          mail: '',
          login_password: '',
          login_password_confirmation: '',
        },
      }
    },
    created () {
      if (this.$route.meta['user']) {
        let user = this.$route.meta['user']
        this.newUser = Object.assign(this.newUser, user)
      }
    },
    methods: {
      submit () {
        let data = this.newUser
        data.gender = 1
        data.is_active = 1
        if (this.$route.name === 'userEdit') {
          this.update(data)
        } else {
          this.create(data)
        }
      },
      async update (data) {
        let userId =  this.$route.params.id
        await store.dispatch('updateUser', {userId, data}).then(() => {
          notification.method.onSuccess('Successfully', 'Update Successfully')
          this.$router.push({ name: 'userIndex' })
        }).catch((error) => {
          notification.method.onError('Fail', 'Update Fail')
        })

      },
      async create (data) {
        await store.dispatch('createUser', data).then(() => {
          notification.method.onSuccess('Successfully', 'Update Successfully')
          this.$router.push({ name: 'userIndex' })
        }).catch(() => {
          notification.method.onError('Fail', 'Update Fail')
        })

      },
    },
  }
</script>

<style scoped>

</style>