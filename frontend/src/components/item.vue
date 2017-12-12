<template>
<div>
  <li>
    <div
      :class="{bold: isFolder}" v-show="!model.isRoot">
      <span v-if="(isFolder && open) || (isRedirect && open)" @click="toggle">
         <md-icon class="md-primary">expand_less</md-icon>  </span>
      <span v-if="(isFolder && !open) || (isRedirect && !open)" @click="toggle">
         <md-icon class="md-primary">expand_more</md-icon>  </span>

          <md-input v-model="model.message"> </md-input>

            <span @click="changeType">
              <md-icon class="md-primary" v-show="!isFolder && model.redirect === null">
                add
                <md-tooltip md-direction="top">{{$t('item.changeTooltip')}}</md-tooltip>
              </md-icon>
            </span>
            <span @click="deleteChild">
              <md-icon class="md-primary" >delete</md-icon>
              <md-tooltip md-direction="top">{{$t('item.deleteTooltip')}}</md-tooltip>
            </span>
             <span @click="addRedirect">
              <md-icon class="md-primary" v-show="(model.redirect === null) && (model.options === null)">trending_flat</md-icon>
              <md-tooltip md-direction="top">{{$t('item.redirectTooltip')}}</md-tooltip>
            </span>
    </div>
    <ul v-show="open || model.isRoot" v-if="isFolder">
      <item
        class="item"
        v-for="model in model.options"
        :model="model"
        v-bind:key = "model">
        </item>
      <li class="add" @click="addChild">
        <md-icon class="md-primary">add</md-icon> 
      </li>
    </ul>
    <ul v-show="open && model.redirect !== null" id="list">
      <md-select  class="redirect" v-model="model.redirect"> 
        <md-option value="faqbot">F.A.Q. Bot</md-option>
        <md-option value="welcomebot">Welcome Bot</md-option>        
      </md-select>
    </ul>
  </li>
  </div>
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
    },
    isRedirect: function () {
      return this.model.redirect !== null
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder || this.model.redirect !== null) {
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
        this.model.options = null
      }
      this.model.redirect = null
      this.open = false
    },
    addChild: function () {
      this.model.options.push({
        message: '',
        redirect: null,
        options: null
      })
    },
    addRedirect: function () {
      this.model.redirect = ''
      this.open = true
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
.redirect {
  width: 280px;
  height: 40px;
   margin: 0 0 13px;
}
</style>
