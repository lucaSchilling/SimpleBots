<template>
  <div>
    <li>
      <div :class="{bold: isFolder}" v-show="!model.isRoot">

        <span v-if="(isFolder && isOpen) || (isRedirect && isOpen)" @click="toggle">
          <md-icon class="md-primary">expand_less</md-icon>
        </span>

        <span v-if="(isFolder && !isOpen) || (isRedirect && !isOpen)" @click="toggle">
          <md-icon class="md-primary">expand_more</md-icon>  
        </span>

        <input v-model="model.message" :placeholder="this.$t('item.placeholder')"></input>
        <span id="addSpan">
          <md-menu md-direction="bottom-start" v-show="!isFolder && model.redirect === null">
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

      <ul v-show="isOpen || model.isRoot" v-if="isFolder">
        <item
          class="item"
          v-for="model in model.options"
          :model="model"
          v-bind:key = "model">
        </item>

        <li class="add">
          <span @click="addChild"><md-icon class="md-primary">add</md-icon></span> 
        </li>
      </ul>

      <ul v-show="isOpen && model.redirect !== null" id="list">
        <md-select class="redirect" v-model="model.redirect"> 
          <md-option id="faqRedirect" value="999352232">F.A.Q. Bot</md-option>
          <md-option id="humanRedirect" value="-1">Human Agent</md-option>  
          <md-option id="wbRedirect" value="1008076832">Welcome Bot</md-option>      
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
      isOpen: false
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
        return this.$store.state.welcomeBot.treeData
      }
    },
    itemID: {
      get () {
        return this.$store.state.welcomeBot.itemID
      },
      set (val) {
        this.$store.commit('setitemID', val)
      }
    }
  },
  methods: {
    // Opens or closes the folder
    toggle: function () {
      if (this.isFolder || this.model.redirect !== null) {
        this.isOpen = !this.isOpen
      }
    },
    // Adds a child if the node is not a folder
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'options', [])
        this.addChild()
        this.isOpen = true
      }
    },
    // Deletes the node
    deleteThis (id) {
      this.delete(this.treeData.options, id)
    },
    // Recursive function in order to search the correct node and to call deleteThis(id)
    delete (array, id) {
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
    // Adds a child to the node
    addChild: function () {
      this.model.options.push({
        message: '',
        redirect: null,
        options: null
      })
    },
    // Adds a redirect selection menu to the node
    addRedirect: function () {
      this.model.redirect = ''
      this.isOpen = true
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
