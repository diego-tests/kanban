<template>
    <section class="app-stage">
        <h2>{{ stage.title }}</h2>
        <draggable 
            v-model="draggableCards"
            group="stages"
        >
            <StageCard
                v-for="card in draggableCards"
                :key="card.id"
                :card="card"
            />
        </draggable>
    </section>
</template>
<script>
import draggable from 'vuedraggable'
import StageCard from './StageCard/StageCard'
import { CHANGE_STAGE_CARDS_ORDER } from '../../../../store/_actionTypes'

export default {
  props: {
    stage: {
      type: Object,
      required: true,
    },
  },
  components: {
    draggable,
    StageCard,
  },
  computed: {
    draggableCards: {
      get() {
        return this.stage.cards
      },
      set(cards) {
        this.$store.dispatch(CHANGE_STAGE_CARDS_ORDER, { stageId: this.stage.id, cards })
      },
    },
  },
  methods: {
    // onPull(val) {
        
    //   console.log(val)
    // },
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