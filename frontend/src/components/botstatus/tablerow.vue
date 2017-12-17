<template>
    <md-table-row>

      <md-table-cell><md-switch v-model="status" @change='postSwitch' class="md-primary switchBar"></md-switch></md-table-cell>
      <md-table-cell><div v-bind:class="[status ? 'circleGreen' : 'circleYellow']"></div></md-table-cell>
      <md-table-cell>{{ID}}</md-table-cell>
      <md-table-cell>{{template}}</md-table-cell>
      <md-table-cell>{{name}}</md-table-cell>
      <md-table-cell>{{lastedit}}</md-table-cell>
      <md-table-cell> 
        <md-button id="delete" class="md-icon-button deleteButton" v-on:click='show'>
          <md-icon>delete</md-icon>
        </md-button>

        <md-dialog v-if="status === false" :md-active.sync="isActive">
          <md-dialog-title>{{$t('tablerow.title')}}</md-dialog-title>

          <p id="content">{{$t('tablerow.content')}}</p>

          <md-dialog-actions>
            <md-button class="md-primary" @click="isActive = false">{{$t('tablerow.cancel')}}</md-button>
            <md-button class="md-primary" @click="deleteBot">{{$t('tablerow.confirm')}}</md-button>
          </md-dialog-actions>
        </md-dialog>

        <md-dialog v-if-else="status === true" :md-active.sync="showDialog">
          <md-dialog-title>{{$t('tablerow.titleOn')}}</md-dialog-title>

          <p id="content">{{$t('tablerow.contentOn')}}</p>

          <md-dialog-actions>
            <md-button class="md-primary" @click="showDialog = false">OK</md-button>
          </md-dialog-actions>
        </md-dialog>

      </md-table-cell>

    </md-table-row>
</template>

<script>
export default {
  name: 'tablerow',
  data: () => ({
    isActive: false,
    showDialog: false
  }),
  methods: {
    deleteBot: function () {
      this.$store.dispatch('undeploy', this.ID)
    },
    // get both bots and configurations for the status and the history
    getAll: function () {
      this.getBots()
      this.getConfigs()
    },
    postStatus: function () {
      this.$store.dispatch('postStatus', this.ID)
    },
    postSwitch (boolean) {
      let object = {id: this.ID,
        status: boolean}
      this.$store.dispatch('postStatus', object)
    },
    getBots: function () {
      this.$store.dispatch('getBots')
    },
    getConfigs: function () {
      this.$store.dispatch('getConfigs')
    },
    onCancel () {
      this.isActive = false
    },
    // Checks whether the bot is running or not, sets dialog variables
    show () {
      if (this.status === false) {
        this.isActive = true
      } else if (this.status === true) {
        this.showDialog = true
      }
    }
  },
  computed: {
    getStatus () {
      return this.$store.getters.getStatus(this.ID)
    }
  },
  props: ['ID', 'status', 'template', 'name', 'lastedit']
}
</script>

<style>
.circleYellow {
    background: #ffde00;
    width: 12px;
    height: 12px;
    border-radius: 50%;  
}
.circleGreen {
  background: #a7c613;
    width: 12px;
    height: 12px;
    border-radius: 50%;
}
#content {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
