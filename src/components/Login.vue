<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-flex>
      <v-flex
        xs12
      >
        <v-form
          ref="form"
          lazy-validation
          @submit.prevent="login"
          class="form"
        >
          <v-text-field
            v-model="email"
            name="email"
            data-vv-as="Email"
            outline
            label="Email"
            type="email"
            prepend-inner-icon="person"
            required
          />
          <v-text-field
            v-model="password"
            name="password"
            data-vv-as="Contraseña"
            outline
            label="Contraseña"
            type="password"
            prepend-inner-icon="vpn_key"
            required
          />
          <v-btn
            class="mt-4"
            type="submit"
            :loading="loading"
            block
            color="primary"
          >
            Login
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: '',
      loading: false
    }
  },

  methods: {
    ...mapActions({
      authLogin: 'auth/login'
    }),

    async login () {
      let vthis = this
      this.loading = true
      try {
        await this.authLogin({
          email: vthis.email,
          password: vthis.password
        })
      } catch (err) {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
  .form {
    max-width: 30% !important;
    margin-left: 35%;
    padding-top: 4rem;
    text-align: center;
  }
</style>
