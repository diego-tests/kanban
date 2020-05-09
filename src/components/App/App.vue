<template>
    <div id="app">
        Canyon Kanban
    </div>
</template>

<script>
import { FETCH_APP_DATA } from '../../store/actionTypes'
export default {
  name: 'App',
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
