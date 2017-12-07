<template>
  <div>
    <div id="intents">
    <md-table md-card>
      <md-table-toolbar>
        <div id="intentHead">
        <h1 class="md-title">Intents</h1>
        </div>
        <div id="intentText">
        <md-field>
          <label>Type your Intent here</label>
          <md-input v-model="intent"></md-input>
        </md-field>
        </div>
        <div id="answer">
        <md-field>
          <label>Type your Answer here</label>
          <md-input v-model="message"></md-input>
          <span @click="addIntent" class="hover">
            <md-icon>add</md-icon>
          </span>
        </md-field>
        </div>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head>Intent</md-table-head>
        <md-table-head>Answer</md-table-head>
      </md-table-row>

      <md-table-row v-for="int in intentions" v-bind:key="int">
        <md-table-cell>
          <p>{{int.name}}</p>
        </md-table-cell>
        <md-table-cell>
          <p>{{int.message}}</p>
        </md-table-cell>
      </md-table-row>
    </md-table>

    </div>

    <div id="entities">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Entities</h1>
        <md-field>
          <md-input v-model="entity"></md-input>
          <span @click="addEntity" class="hover">
            <md-icon>add</md-icon>
          </span>
        </md-field>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head>Entity</md-table-head>
      </md-table-row>

      <md-table-row v-for="ent in entitys" v-bind:key="ent">
        <md-table-cell>
          <p>{{ent.name}}</p>
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
    intentions: [],
    entitys: [],
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
      this.intents = this.intentions
    },
    addEntity: function () {
      this.entities.push({name: this.entity})
      this.entities = this.entitys
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
