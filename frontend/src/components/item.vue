<template>
  <li>
    <div
      :class="{bold: isFolder}"
      @click="toggle">
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
          <input v-model="model.message"> </md-input>
          <md-button class ="md-primary md-raised" @click="changeType">Change</md-button>
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
  border: 4px solid #e47e25;
}
</style>
