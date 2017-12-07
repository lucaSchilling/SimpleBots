<template>
<div>
    <h2>Set Selection Menu
      <md-avatar>
        <img src="../../assets/hilfe.png" alt="Avatar">
        <md-tooltip md-direction="right">Bla</md-tooltip>
      </md-avatar>
    </h2>
    <div id="bla">
      {{treeData}}
      <ul id="demo">
        <item
            class="item"
            :model="treeData">
        </item>
      </ul>
  </div>
</div>
</template>

<script>
import item from './item.vue'

export default {
  name: 'optionStep',
  components: {
    item
  },
  computed: {
    template: {
      get () {
        return this.$store.state.template
      },
      set (val) {
        this.$store.commit('setTemplate', val)
      }
    },
    treeData: {
      get () {
        return this.$store.state.treeData
      },
      set (val) {
        this.$store.commit('setTreeData', val)
      }
    }
  }
}
</script>

<style>
#bla {
  display: block;
  height: 500px;
}
.md-avatar img {
    width: 50%;
    height: 50%;
    display: block;
}
.md-avatar {
    width: 40px;
    min-width: 40px;
    height: 40px;
    margin: auto;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    user-select: none;
    position: relative;
    border-radius: 40px;
    transition: .4s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: color, background-color;
    will-change: color, background-color;
    font-size: 24px;
    letter-spacing: -.05em;
    vertical-align: bottom;
}
h2 {
  text-align: center;
  color: gray;
}
</style>
