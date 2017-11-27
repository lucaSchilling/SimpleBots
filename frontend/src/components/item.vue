<template>
  <li>
    <div
      :class="{bold: isFolder}"
      @click="toggle"
      @dblclick="changeType">
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
      <md-field >
          <md-input v-model="model.name"> </md-input>
        </md-field>
    </div>
    <ul v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="model in model.children"
        :model="model"
        v-bind:key = "model">
        </item>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<script>
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
      return this.model.children &&
        this.model.children.length
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
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }

}
</script>

<style>
ul {
  list-style-type: none;
}
</style>
