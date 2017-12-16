<template>
  <div id="utteranceWrap">

    <md-dialog :md-active.sync="active">

      <md-dialog-title>{{$t('uterances.title')}}</md-dialog-title>
      <p class="padding">{{$t('uterances.content')}}</p>

      <md-dialog-actions>
        <md-button class="md-primary" @click="active = false">{{$t('tablerow.cancel')}}</md-button>
        <md-button class="md-primary" @click="deleteUterance(uteranceIndex)">{{$t('tablerow.confirm')}}</md-button>
      </md-dialog-actions>

    </md-dialog>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>{{$t('uterances.setEntity')}}</md-dialog-title>
        <div class="margin">
          <h3>Intents:</h3>
          <md-field>
            <md-select v-model="example.intentName">
              <md-option v-for="intent in intents" v-bind:key="intent" :value="intent.name">{{intent.name}}</md-option>
            </md-select>
          </md-field>
        
          <h3>Entities:</h3>
          <md-field>
            <md-select v-model="entityName">
              <md-option v-for="entity in entities" v-bind:key="entity" :value="entity.name">{{entity.name}}</md-option>
            </md-select>
          </md-field>
        </div>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">{{$t('tablerow.cancel')}}</md-button>
          <md-button class="md-primary" @click="createExample(sentence, selected, entityName)">{{$t('uterances.set')}}</md-button>
        </md-dialog-actions>
        
    </md-dialog>

     
    <h3>{{$t('uterances.addQuestion')}}</h3>
    <input v-model="uterance" v-on:keyup.enter="addUterance" :placeholder="this.$t('uterances.placeholder')"></input>
    <span @click="addUterance">
      <md-icon class="md-primary" >add</md-icon>
    </span>

    <h3>{{$t('uterances.setEntities')}}</h3>
    <ol>
      <div v-for="(ut, index) in uterances" v-bind:key="ut">
        <li>
          <span class="span" v-for="word in ut" v-bind:key="word" @click="openDialog(sentences[index], word)">
            {{word}}
          </span>

          <span class="span" @click="triggerDialog(index)">
            <md-icon>delete</md-icon>
          </span>
        </li>
      </div>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'uterances',
  data: () => ({
    showDialog: false,
    active: false,
    uterance: null,
    selected: null,
    sentences: [],
    sentence: null,
    start: null,
    end: null,
    entityName: null,
    example: {text: null, intentName: null, entityLabels: []},
    uteranceIndex: null
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
    examples: {
      get () {
        return this.$store.state.faqBot.examples
      },
      set (val) {
        this.$store.commit('setExamples', val)
      }
    },
    uterances: {
      get () {
        return this.$store.state.faqBot.uterances
      },
      set (val) {
        this.$store.commit('setUterances', val)
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
    // Creates the correct exampe JSON structure
    createExample (uterance, word, entity) {
      this.start = uterance.indexOf(word)
      this.end = uterance.indexOf(word) + word.length - 1
      this.example.text = uterance
      this.example.entityLabels.push({entityName: entity, startCharIndex: this.start, endCharIndex: this.end})
      this.examples.push(this.example)
      this.example = {text: null, intentName: null, entityLabels: []}
      this.showDialog = false
    },
    deploy: function () {
      this.$store.dispatch('deploy')
      this.clear()
      this.setUndone('first')
      this.$router.push('/status')
    },
    clear: function () {
      this.$store.commit('clear')
    },
    setDone (object) {
      this.$store.commit('setDone', object)
    },
    setUndone (index) {
      this.$store.commit('setUndone', index)
    },
    deleteUterance (index) {
      this.uterances.splice(index, 1)
      this.active = false
    },
    triggerDialog (index) {
      this.active = true
      this.uteranceIndex = index
    }
  }
}
</script>

<style>
.span, .pHover {
  cursor: pointer;
}
#intents, #entities {
  width: 50%;
  float: left;
}
h3 {
  color: gray;
}
.buttonRight {
  float: right;
}
.padding {
  padding-left: 20px;
  padding-right: 20px;
}
.md-menu-content {
  z-index: 111;
}
.margin {
  width: 50vw;
  margin-right: 30px;
  margin-left: 30px;
}
#utteranceWrap {
  height: 60vh;
  overflow: auto;
}
</style>
