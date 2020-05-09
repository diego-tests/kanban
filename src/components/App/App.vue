<template>
    <div id="app">
        <h1>
            Canyon Kanban
        </h1>
        <AppStages
            v-if="initialData"
            :stages="initialData.stages"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { FETCH_APP_DATA } from '../../store/_actionTypes'
import AppStages from './AppStages/AppStages'

export default {
  name: 'App',
  components: {
    AppStages,
  },
  computed: {
    ...mapState({
      initialData: state=> state.initialData,
    }),
  },
  created() {
    this.fetchData()  
  },
  methods: {
    fetchData() {
      this.$store.dispatch(FETCH_APP_DATA)
    },
  },
}
</script>

<style lang="scss">
@use '../../scss/global';

#app {
    font-family: sans-serif;
}
</style>
