<template>
  <div>
    <form novalidate class="md-layout-row md-gutter" @submit.prevent="validateUser">
      <md-card class="md-flex-50 md-flex-small-100">
        <md-card-header>
          <div class="md-title-primary">Login</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-row md-layout-wrap md-gutter">
            <div class="md-flex md-flex-small-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">Username</label>
                <md-input name="username" id="username" autocomplete="given-name" v-model="form.username" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.username.required">The username is required</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('password')" :md-toggle-password="false">
            <label for="password">Password</label>
            <md-input type="password" name="password" id="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { validationMixin } from 'vuelidate'
  import {required} from 'vuelidate/lib/validators'
  Vue.use(validationMixin)

  export default {
    name: 'login',
    mixins: [validationMixin],
    data: () => ({
      form: {
        username: null,
        password: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        username: {
          required
        },
        password: {
          required
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.username = null
        this.form.password = null
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, we can call our API
        window.setTimeout(() => {
          this.lastUser = `${this.form.username} ${this.form.password}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<style scoped>
  .md-content{   
    width: 390px;
    height: 300px;
    margin: 10px;
    display: flex;
}

</style>