<template>
<div>
  <li>
    <div
      :class="{bold: isFolder}" v-show="!model.isRoot">
      <span v-if="(isFolder && open) || (isRedirect && open)" @click="toggle">
         <md-icon class="md-primary">expand_less</md-icon>  </span>
      <span v-if="(isFolder && !open) || (isRedirect && !open)" @click="toggle">
         <md-icon class="md-primary">expand_more</md-icon>  </span>

          <input v-model="model.message" :placeholder="this.$t('item.placeholder')"></input>
          <span id="addSpan">
            <md-menu md-direction="bottom-start" class="menu" v-show="!isFolder && model.redirect === null">
                    <md-icon class="md-primary" md-menu-trigger>
                add
                <md-tooltip md-direction="top">{{$t('item.changeTooltip')}}</md-tooltip>
              </md-icon>
              <md-menu-content>
                <md-menu-item><span class="span" @click="changeType">option</span></md-menu-item>
                <md-menu-item><span class="span" @click="addRedirect">redirect</span></md-menu-item>
              </md-menu-content>
            </md-menu>
          </span>

            <span @click="deleteThis(model.id)" v-show="!(model.isDeletable === false)">
              <md-icon class="md-primary" >delete</md-icon>
              <md-tooltip md-direction="top">{{$t('item.deleteTooltip')}}</md-tooltip>
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
  mounted () {
    this.model.id = this.itemID++
  },
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
    },
    treeData: {
      get () {
        return this.$store.state.treeData
      }
    },
    itemID: {
      get () {
        return this.$store.state.itemID
      },
      set (val) {
        this.$store.commit('setitemID', val)
      }
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
        this.treeData.options[0].options[0].options.splice(0, 1)
      }
      this.model.redirect = null
      // this.open = false
    },
    deleteThis (id) {
      this.delete(this.treeData.options, id)
    },
    delete (array, id) {
      // this.$store.state.treeData.options
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          array.splice(i, 1)
          return
        } else {
          if (array === null) {
            return
          }
          if (array[i].options !== null) {
            this.delete(array[i].options, id)
          }
        }
      }
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
.span:hover, .pHover:hover {
  cursor: pointer;
  font-weight: bold;
  color: #f68b1f
}
</style>
