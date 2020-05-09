<template>
    <div id="app">
        <h1>
            Canyon Kanban
        </h1>
        <AppStages
            v-if="stagesData"
            :stages="stagesData"
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
      stagesData: state=> state.stagesData,
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
