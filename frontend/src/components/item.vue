<template>
  <li>
    <div
      :class="{bold: isFolder}">
      <span v-if="isFolder" @click="toggle">[{{open ? '-' : '+'}}]</span>
          <md-input v-model="model.message"> </md-input>
            <span @click="changeType">
              <md-icon class="md-primary">
                add
                <md-tooltip md-direction="top">Add an option to this message</md-tooltip>
              </md-icon>
            </span>
            <span @click="deleteChild">
              <md-icon class="md-primary">delete</md-icon>
              <md-tooltip md-direction="top">Delete the options from this message</md-tooltip>
            </span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="model in model.options"
        :model="model"
        v-bind:key = "model">
        </item>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'item',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.options &&
        this.model.options.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'options', [])
        this.addChild()
        this.open = true
      }
    },
    deleteChild: function () {
      if (this.isFolder) {
        Vue.set(this.model, 'options', null)
      }
    },
    addChild: function () {
      this.model.options.push({
        message: ''
      })
    }
  }

}
</script>

<style>
ul {
  list-style-type: none;
}
input {
  width: 280px;
  height: 40px;
  padding: 5px;
  margin: 5px 0 10px;
  border-radius: 5px;
  border: 2px solid gray;
}
</style>
