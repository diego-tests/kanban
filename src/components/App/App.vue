<template>
    <section id="app">
        <h1>
            Canyon Kanban
        </h1>
        <div class="content">
            <DisplayOptions />
            <AppStages
                v-if="stagesData"
                :stages="stagesData"
            />
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import { FETCH_APP_DATA } from '../../store/_actionTypes'
import AppStages from './AppStages/AppStages'
import DisplayOptions from './DisplayOptions/DisplayOptions'

export default {
  name: 'App',
  components: {
    AppStages,
    DisplayOptions,
  },
  computed: {
    ...mapState({
      stagesData: state=> state.api.stagesData,
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
</style>
<style lang="scss" scoped>
@use '../../scss/fonts';

#app {
    margin: auto;
    max-width: 120rem;
    padding: 1rem;
}

h1 {
    font-size: 4rem;
    font-weight: 900;
}

</style>
