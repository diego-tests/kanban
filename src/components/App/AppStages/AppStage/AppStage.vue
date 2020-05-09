<template>
    <section class="app-stage">
        <h2>{{ stage.title }}</h2>
        <StageCard
            v-for="card in stage.cards"
            :key="card.id"
            :card="card"
        />
    </section>
</template>
<script>
import StageCard from './StageCard/StageCard'
export default {
  props: {
    stage: {
      type: Object,
      required: true,
    },
  },
  components: {
    StageCard,
  },
}
</script>
<style lang="scss" scoped>
.app-stage {
    border: solid 1px black;
    margin: 20px;
    max-width: 100%;
    min-height: 10rem;
    padding: 0.5rem;
}
</style>