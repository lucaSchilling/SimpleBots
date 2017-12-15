<template>
  <div>
    <div id="intents">
    <md-table md-card>
      <md-table-toolbar>
        <div id="intentHead">
          <h1 class="md-title">{{$t('faq.intents')}}</h1>
        </div>
        <div id="intentText">
          <md-field>
            <label>{{$t('faq.typeIntent')}}</label>
            <md-input v-model="intent"></md-input>
        </md-field>
        </div>
        <div id="answer">
        <md-field>
          <label>{{$t('faq.typeAnswer')}}</label>
          <md-input v-model="message"></md-input>
          <span @click="addIntent" class="hover">
            <md-icon>add</md-icon>
          </span>
        </md-field>
        </div>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head>{{$t('faq.intent')}}</md-table-head>
        <md-table-head>{{$t('faq.answer')}}</md-table-head>
        <md-table-head></md-table-head>
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
          <md-button @click="editObject('intent', int)" class="md-icon-button">
            <md-icon>create</md-icon>
          </md-button>
        </md-table-cell>

        <md-table-cell>
          <md-button @click="deleteObject('intent', int)" class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>

      </md-table-row>
    </md-table>

    </div>

    <div id="entities">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">{{$t('faq.entities')}}</h1>
        <md-field>
          <label>{{$t('faq.typeEntity')}}</label>
          <md-input v-model="entity"></md-input>
          <span @click="addEntity" class="hover">
            <md-icon>add</md-icon>
          </span>
        </md-field>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head>{{$t('faq.entity')}}</md-table-head>
        <md-table-head></md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>

      <md-table-row v-for="ent in entities" v-bind:key="ent">
        <md-table-cell>
          <p>{{ent.name}}</p>
        </md-table-cell>
        <md-table-cell>
          <md-button @click="editObject('entity', ent)" class="md-icon-button">
            <md-icon>create</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell>
          <md-button @click="deleteObject('entity', ent)" class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'faq',
  data: () => ({
    intent: null,
    entity: null,
    message: null
  }),
  computed: {
    entities: {
      get () {
        return this.$store.state.entities
      },
      set (val) {
        this.$store.commit('setEntities', val)
      }
    },
    intents: {
      get () {
        return this.$store.state.intents
      },
      set (val) {
        this.$store.commit('setIntents', val)
      }
    }
  },
  methods: {
    addIntent: function () {
      this.intents.push({name: this.intent,
        message: this.message})
    },
    addEntity: function () {
      this.entities.push({name: this.entity})
    },
    deleteObject: function (name, object) {
      if (name === 'intent') {
        this.intents.pop(object)
      } else if (name === 'entity') {
        this.entities.pop(object)
      }
    },
    editObject: function (name, object) {
      if (name === 'intent') {
        this.intent = object.name
        this.message = object.message
        this.intents.pop(object)
      } else if (name === 'entity') {
        this.entity = object.name
        this.entities.pop(object)
      }
    }
  }
}
</script>

<style>
#intents {
  width: 45%;
  float: left;
}
#entities {
  width: 45%;
  float: right;
}
#intentText {
  width: 42%;
  float: left;
}
#answer {
  padding-left: 3%;
  width: 45%;
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
</style>
