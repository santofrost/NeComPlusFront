<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>NeComPlus</span>
        <span class="font-weight-light">Template</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          v-if="userIsLogged"
          @click="viewbanks = true"
        >
          Gestión Entidades
        </v-btn>
        <v-btn
          flat
          v-if="userIsLogged"
          @click="viewbanks = false"
        >
          Gestión Grupos
        </v-btn>
        <v-btn
          icon
          v-if="userIsLogged"
          @click="logout($router)"
        >
        <v-icon>lock</v-icon>
      </v-btn>
    </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <Login v-if="!userIsLogged"/>

      <Banks v-else-if="viewbanks"/>

      <Groups v-else />
    </v-content>
  </v-app>
</template>

<script>
import Login from './components/Login'
import Groups from './components/Groups'
import Banks from './components/Banks'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Login, Groups, Banks
  },

  data: () => ({
    viewbanks: true
  }),

  computed: {
    ...mapGetters({
      userIsLogged: 'auth/userIsLogged'
    })
  },

  methods: {
    ...mapActions({
      loadUser: 'auth/loadUser',
      logout: 'auth/logout'
    })
  }
}
</script>
