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
        <v-toolbar-title>Gestion Entidades</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="50%">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Nueva Entidad</v-btn>
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
                  <v-text-field v-model="editedItem.address" label="Dirección"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.town" label="Población"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.city" label="Provincia"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.cp" label="Código Postal"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.phonenumber" label="Teléfono"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" label="Mail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.logo" label="Logo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.country" label="País"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                  v-model="editedItem.group"
                    :items="groups"
                    item-text="name"
                    item-value="id"
                    label="Grupo"
                  />
                </v-flex>
                <v-flex xs12 sm6 md4>
                <v-checkbox v-model="editedItem.activeStatus" label="Activada"></v-checkbox>
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
          :items="banks"
          class="elevation-1"
        >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.town }}</td>
        <td class="text-xs-left">{{ props.item.cp }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.country }}</td>
        <td class="text-xs-left">{{ props.item.group.name }}</td>
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
      { text: 'Población', value: 'town' },
      { text: 'Código Postal', value: 'cp' },
      { text: 'Email', value: 'email' },
      { text: 'País', value: 'country' },
      { text: 'Grupo', value: 'group' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    groups: [],
    banks: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      address: '',
      town: '',
      city: '',
      cp: '',
      phonenumber: '',
      email: '',
      logo: '',
      country: '',
      activeStatus: true,
      group: null
    },
    defaultItem: {
      id: '',
      name: '',
      address: '',
      town: '',
      city: '',
      cp: '',
      phonenumber: '',
      email: '',
      logo: '',
      country: '',
      activeStatus: true,
      group: null
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nueva Entidad' : 'Editar Entidad'
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
      this.fetchBanks()
    },

    fetchBanks () {
      this.axios.get('http://localhost:4000/api/banks/', {
      }).then(response => {
        this.banks = response.data
      }).catch(e => {
        if (e.response.status === 401) {
          alert('No está logueado')
        } else {
          alert('Error en la carga de los datos. Error ' + e.response.status)
        }
      })
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
      this.editedIndex = this.banks.indexOf(item)
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
      if (confirm('¿Estás seguro de borrar esta entidad?')) {
        this.axios.delete('http://localhost:4000/api/banks/' + item.id)
          .then(response => {
            alert('Borrado correctamente')
            this.fetchBanks()
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
      this.axios.post('http://localhost:4000/api/banks', this.createJSON())
        .then(response => {
          alert('Creado correctamente')
          this.fetchBanks()
          this.dialog = false
        }).catch(e => {
          if (e.response.status === 401) {
            alert('Las credenciales introducidas no son correctas')
          }
        })
    },

    editar () {
      this.axios.put('http://localhost:4000/api/banks/' + this.editedItem.id, this.createJSON())
        .then(response => {
          this.fetchBanks()
        }).catch(e => {
          if (e.response.status === 401) {
            alert('Las credenciales introducidas no son correctas')
          }
        })
    },

    createJSON () {
      if (isNaN(this.editedItem.group)) {
        return {
          'name': this.editedItem.name,
          'address': this.editedItem.address,
          'town': this.editedItem.town,
          'city': this.editedItem.city,
          'cp': this.editedItem.cp,
          'phonenumber': this.editedItem.phonenumber,
          'email': this.editedItem.email,
          'logo': this.editedItem.logo,
          'country': this.editedItem.country,
          'activeStatus': this.editedItem.activeStatus,
          'groupId': this.editedItem.group.id
        }
      } else {
        return {
          'name': this.editedItem.name,
          'address': this.editedItem.address,
          'town': this.editedItem.town,
          'city': this.editedItem.city,
          'cp': this.editedItem.cp,
          'phonenumber': this.editedItem.phonenumber,
          'email': this.editedItem.email,
          'logo': this.editedItem.logo,
          'country': this.editedItem.country,
          'activeStatus': this.editedItem.activeStatus,
          'groupId': this.editedItem.group
        }
      }
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
