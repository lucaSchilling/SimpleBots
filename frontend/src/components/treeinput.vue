<template>
  <div>
      <input :id="index" v-model="options">
      </input>
  </div>
</template>

<script>
export default {
  name: 'treeinput',
  computed: {
    index: {
      get () {
        return this.$store.state.i
      },
      set (val) {
        this.$store.commit.setI(val)
      }
    },
    options: {
      get () {
        return this.$store.state.options
      },
      set (val) {
        this.$store.commit('setOptions', val)
      }
    }
  }
}
</script>

<style>
input {
  width: 280px;
  height: 40px;
  padding: 5px;
  margin: 20px 0 10px;
  border-radius: 5px;
  border: 4px solid #e47e25;
}
</style>
