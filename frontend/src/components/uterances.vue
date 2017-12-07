<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <div id="dialog">
        <md-dialog-title>Set an Entity for "{{selected}}"</md-dialog-title>
      <div id="intents">
        <p class="pHover" v-for="intent in intents" v-bind:key="intent" @click="setIntent(intent.name)">{{intent.name}}</p>
      </div>
        <div id="entities">
          <p class="pHover" v-for="entity in entities" v-bind:key="entity" @click="setEntity(sentence, selected, entity.name)">{{entity.name}}</p>
        </div>

      </div>
     </md-dialog>
     <h2>Add your Questions here!</h2>
      <input v-model="uterance" v-on:keyup.enter="addUterance"></input>
      <h2>Set your Entities here!</h2>
      <ol>
    <div v-for="(ut, index) in uterances" v-bind:key="ut">
      <li><span class="span" v-for="word in ut" v-bind:key="word" @click="openDialog(sentences[index], word)">
        {{word}}
      </span>
      </li>
    </div>
    </ol>
    <md-button class="md-primary md-raised" @click="deploy">Deploy</md-button>
  </div>
</template>

<script>
export default {
  name: 'uterances',
  data: () => ({
    showDialog: false,
    uterances: [],
    uterance: null,
    selected: null,
    sentences: [],
    sentence: null,
    start: null,
    end: null,
    example: {text: null, intentName: null, entityLabels: []}
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
    },
    examples: {
      get () {
        return this.$store.state.examples
      },
      set (val) {
        this.$store.commit('setExamples', val)
      }
    }
  },
  methods: {
    addUterance: function () {
      this.sentences.push(this.uterance)
      this.uterances.push(this.uterance.split(' '))
    },
    openDialog (satz, word) {
      this.showDialog = true
      this.selected = word
      this.sentence = satz
    },
    setIntent (intent) {
      this.example.intentName = intent
    },
    setEntity (uterance, word, entity) {
      this.start = uterance.indexOf(word)
      this.end = uterance.indexOf(word) + word.length - 1
      this.example.text = uterance
      this.example.entityLabels.push({entityName: entity, startCharIndex: this.start, endCharIndex: this.end})
      this.examples.push(this.example)
      alert(JSON.stringify(this.example))
      this.example = {text: null, intentName: null, entityLabels: []}
      this.showDialog = false
    },
    deploy: function () {
      this.$store.dispatch('deploy')
    }
  }
}
</script>

<style>
.span, .pHover {
  cursor: pointer;
}
.span:hover, .pHover:hover {
    font-weight: bold;
}
#dialog {
  width: 300px;
  height: 300px;
}
#intents, #entities {
  width: 50%;
  float: left;
}
</style>
