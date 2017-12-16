<template>
  <div id="faqWrap">
     <md-dialog-prompt
      :md-active.sync="activeEntity"
      v-model="entity"
      :md-title="this.$t('faq.titleEntity')"
      md-input-maxlength="30"
      :md-input-placeholder="this.$t('faq.typeEntity')"
      :md-confirm-text="this.$t('faq.add')"
      @md-confirm="addEntity"/>
     <md-dialog :md-active.sync="activeEntity">
        <md-dialog-title>Add an Intent</md-dialog-title>

        <div id="fielddiv">
          <md-field :class="messageClass">
            <label>{{$t('faq.typeIntent')}}</label>
            <md-input v-model="entity" required maxlength="30"></md-input>
            <span class="md-error">{{$t('faq.error')}}</span>
          </md-field>
        </div>

        <md-dialog-actions>
          <md-button class="md-primary" @click="clearError">Close</md-button>
          <md-button class="md-primary" @click="addEntity">Add</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="activeIntent">
      <md-dialog-title>{{$t('faq.titleIntent')}}</md-dialog-title>

      <div id="fielddiv">
        <md-field :class="messageClass">
          <label>{{$t('faq.typeIntent')}}</label>
          <md-input id="intentWord" v-model="intent" required maxlength="30"></md-input>
          <span class="md-error">{{$t('faq.error')}}</span>
        </md-field>

        <md-field :class="messageClass">
          <label>{{$t('faq.typeAnswer')}}</label>
          <md-input id="intentAnswer" v-model="message" required maxlength="150"></md-input>
          <span class="md-error">{{$t('faq.error')}}</span>
        </md-field>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="clearError">{{$t('faq.close')}}</md-button>
        <md-button class="md-primary" @click="addIntent">{{$t('faq.add')}}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-table md-card class="table">
      <md-table-toolbar>
          <h1 class="md-title">{{$t('faq.intents')}}</h1>
          <span @click="activeIntent = true" class="hover">
            <md-icon>add</md-icon>
          </span>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head>{{$t('faq.intent')}}</md-table-head>
        <md-table-head>{{$t('faq.answer')}}</md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>

      <md-table-row v-for="int in intents" v-bind:key="int">

        <md-table-cell>
          <p>{{int.name}}</p>
        </md-table-cell>

        <md-table-cell>
          <p>{{int.message}}</p>
        </md-table-cell>

        <md-table-cell>
          <md-button @click="editObject('intent', int)" class="md-icon-button buttonRight">
            <md-icon>create</md-icon>
          </md-button>

          <md-button @click="deleteObject('intent', int)" class="md-icon-button buttonRight">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>

      </md-table-row>
    </md-table>


    <md-table md-card class="table">
      <md-table-toolbar>
        <h1 class="md-title">{{$t('faq.entities')}}</h1>
          <span @click="activeEntity = true" class="hover">
            <md-icon>add</md-icon>
          </span>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head>{{$t('faq.entity')}}</md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>

      <md-table-row v-for="ent in entities" v-bind:key="ent">
        <md-table-cell>
          <p>{{ent.name}}</p>
        </md-table-cell>
        <md-table-cell>
          <md-button @click="editObject('entity', ent)" class="md-icon-button buttonRight">
            <md-icon>create</md-icon>
          </md-button>
          <md-button @click="deleteObject('entity', ent)" class="md-icon-button buttonRight">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: 'faq',
  data: () => ({
    intent: null,
    entity: null,
    message: null,
    activeEntity: false,
    activeIntent: false,
    hasInput: false
  }),
  computed: {
    entities: {
      get () {
        return this.$store.state.faqBot.entities
      },
      set (val) {
        this.$store.commit('setEntities', val)
      }
    },
    intents: {
      get () {
        return this.$store.state.faqBot.intents
      },
      set (val) {
        this.$store.commit('setIntents', val)
      }
    },
    messageClass () {
      return {
        'md-invalid': this.hasInput
      }
    }
  },
  methods: {
    // Pushes into the intent table and clears the inputs
    addIntent: function () {
      // Checks if the strings are empty or only contain white spaces
      if (this.intent !== null && this.intent !== '' &&
       this.intent.replace(/\s/g, '').length &&
       this.message !== null && this.message !== '' &&
        this.message.replace(/\s/g, '').length) {
        this.activeIntent = false
        this.intents.push({name: this.intent,
          message: this.message})
        this.intent = null
        this.message = null
      // Throws error is the fields are empty
      } else {
        this.hasInput = true
      }
    },
    // Pushes into the entity table and clears the inputs
    addEntity: function () {
      if (this.entity !== null && this.entity !== '' && this.entity.replace(/\s/g, '').length) {
        this.activeEntity = false
        this.entities.push({name: this.entity})
        this.entity = null
      } else {
        this.hasInput = true
      }
    },
    clearError () {
      this.activeEntity = false
      this.activeIntent = false
      this.hasInput = false
    },
    // Removes an intent or an entity from the table
    deleteObject: function (name, object) {
      if (name === 'intent') {
        this.intents.pop(object)
      } else if (name === 'entity') {
        this.entities.pop(object)
      }
    },
    // Pops the intent or the entity from the table and sets the input fields correctly
    editObject: function (name, object) {
      this.hasInput = false
      if (name === 'intent') {
        this.intent = object.name
        this.message = object.message
        this.activeIntent = true
        this.intents.pop(object)
      } else if (name === 'entity') {
        this.entity = object.name
        this.activeEntity = true
        this.entities.pop(object)
      }
    },
    setDone (object) {
      this.$store.commit('setDone', object)
    }
  }
}
</script>

<style>
#intents {
  width: 90vw;
}
#entities {
  width: 90vw;
}
#intentText {
  width: 42%;
}
#answer {
  padding-left: 3%;
  width: 54vw;
  float: right;
}
#intentHead {
  width: 100%;
}
.hover {
  cursor: pointer;
}
.hover:hover {
  font-weight: bold;
}
#fielddiv {
  width: 50vw;
  margin-right: 30px;
  margin-left: 30px;
}
.buttonRight {
  float: right;
}
.table {
  margin-bottom: 40px;
  width: 48.5vw;
  margin-left: 24vw;
}
#faqWrap {
  height: 60vh;
  overflow: auto;
}
</style>
