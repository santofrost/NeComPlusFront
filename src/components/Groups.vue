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
        ></v-img>
      </v-flex>
      <v-flex xs12>
    <v-toolbar flat color="white">
        <v-toolbar-title>Gestion Grupos</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="50%">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Grupo</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.color" label="Color"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="groups"
          class="elevation-1"
        >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.color }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Nombre', value: 'name' },
      { text: 'Color', value: 'color' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    groups: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      color: ''
    },
    defaultItem: {
      id: '',
      name: '',
      color: ''

    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Grupo' : 'Editar Grupo'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.fetchGroups()
    },

    fetchGroups () {
      this.axios.get('http://localhost:4000/api/groups/', {
      }).then(response => {
        this.groups = response.data
      }).catch(e => {
        if (e.response.status === 401) {
          alert('No está logueado')
        } else {
          alert('Error en la carga de los datos. Error ' + e.response.status)
        }
      })
    },

    editItem (item) {
      this.editedIndex = this.groups.indexOf(item)

      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    deleteItem (item) {
      if (confirm('¿Estás seguro de borrar este grupo?')) {
        this.axios.delete('http://localhost:4000/api/groups/' + item.id)
          .then(response => {
            alert('Borrado correctamente')
            this.fetchGroups()
            this.dialog = false
          })
          .catch(e => {
            if (e.response.status === 401) {
              alert('Las credenciales introducidas no son correctas')
            }
          })
      }
    },

    save () {
      if (this.editedIndex > -1) {
        this.editar()
      } else {
        this.guardar()
      }
      this.close()
    },

    guardar () {
      this.axios.post('http://localhost:4000/api/groups', { Name: this.editedItem.name, Color: this.editedItem.color })
        .then(response => {
          alert('Creado correctamente')
          this.fetchGroups()
          this.dialog = false
        }).catch(e => {
          if (e.response.status === 401) {
            alert('Las credenciales introducidas no son correctas')
          }
        })
    },

    editar () {
      this.axios.put('http://localhost:4000/api/groups/' + this.editedItem.id, { Id: this.editedItem.id, Name: this.editedItem.name, Color: this.editedItem.color })
        .then(response => {
          this.fetchGroups()
        }).catch(e => {
          if (e.response.status === 401) {
            alert('Las credenciales introducidas no son correctas')
          }
        })
    }
  }
}
</script>

<style lang="scss">
  .form {
    max-width: 30% !important;
    text-align: center;
  }
</style>
