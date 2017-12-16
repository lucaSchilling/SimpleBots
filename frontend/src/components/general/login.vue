<template>
  <div id="loginWrap">
    <!--@submit.prevent="validateUser"-->
    <form novalidate class="md-layout-row md-gutter" @submit.prevent="validateUser" id="inner">
      <md-card class="md-flex-50 md-flex-small-100">
        <md-card-header>
          <div id="logodiv">
            <img src="../../../assets/logo.jpg" width="400" id="logoPic">
          </div>
          <div class="md-title-primary"><h3>{{$t('login.login')}}</h3></div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-row md-layout-wrap md-gutter">
            <div class="md-flex md-flex-small-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">{{$t('login.username')}}</label>
                <md-input name="username" id="username" autocomplete="given-name" v-model="form.username" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.username.required">{{$t('login.usernameError')}}</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('password')" :md-toggle-password="false">
            <label for="password">{{$t('login.password')}}</label>
            <md-input type="password" name="password" id="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">{{$t('login.passwordError')}}</span>
          </md-field>

          
          <md-field>
            <label for="language">{{$t('login.language')}}</label>
            <md-select v-model="form.language" name="language" id="language">
            <md-option  id="de" value="de">{{$t('login.de')}}</md-option>
            <md-option id="en" value="en">{{$t('login.en')}}</md-option>
          
          </md-select>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending" >
          Login</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">{{$t('login.success')}}</md-snackbar>
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
        password: null,
        language: 'en'
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
        this.$i18n.set(localStorage.getItem(this.form.language))
        localStorage.setItem('username', this.form.username.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, ''))
        localStorage.setItem('lang', this.form.language)
        this.$router.push('/launch')
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
  .md-content {   
    width: 390px;
    height: 300px;
    margin: 10px;
    display: flex;
}
  #loginWrap {
    width: 700px;
    min-width: 700px;
    height: 344px;
    min-height: 344px;
    position: relative;
    left: calc(50vw - 200px);
    top: calc(50vh - 250px);
  }
  #logoPic {
    display: block;
    margin-left: auto;
    margin-right: auto
  }
  #logodiv {
    width: 100%;
  }

</style>