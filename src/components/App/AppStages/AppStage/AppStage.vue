<template>
    <section
        class="app-stage"
        :class="{'-dragging': isDragging}"
    >
        <h2>{{ stage.title }}</h2>
        <div
            class="counter"
            data-testid="counter"
        >
            {{ draggableCards.length }}
        </div>
        <CreateCard 
            :stage-id="stage.id" 
        />
        <draggable 
            v-model="draggableCards"
            group="stages"
            :move="onMove"
            class="drop-zone"
            @end="onEnd"
            @start="onStart"
        >
            <StageCard
                v-for="card in draggableCards"
                :key="card.id"
                :card="card"
                :stage-id="stage.id"
            />
        </draggable>
    </section>
</template>
<script>
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import StageCard from './StageCard/StageCard'
import CreateCard from './CreateCard/CreateCard'
import { SET_LAST_DRAGGED_CARD } from '../../../../store/_mutationTypes'
import { CHANGE_STAGE_CARDS_ORDER, UPDATE_CARD_POSITION } from '../../../../store/_actionTypes'

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
    CreateCard,
  },
  data() {
    return{
      updatedCard: null,
    }
  },
  computed: {
    ...mapState({
      lastDraggedCard: state=> state.api.lastDraggedCard,
      isDragging: state=> state.ui.isDragging,
    }),
    draggableCards: {
      get() {
        return this.stage.cards
      },
      set(cards) {
        const isCardInCurrentStage = this.draggableCards.length <= cards.length
        this.$store.dispatch(CHANGE_STAGE_CARDS_ORDER, { stageId: this.stage.id, cards })

        if (!isCardInCurrentStage || !this.lastDraggedCard) {
          return
        }

        this.$store.dispatch(UPDATE_CARD_POSITION, { stageId: this.stage.id, card: this.lastDraggedCard })
      },
    },
  },
  methods: {
    onMove({ draggedContext }) {
      this.updatedCard = { ...draggedContext.element, order: draggedContext.futureIndex }
      this.$store.commit(SET_LAST_DRAGGED_CARD, this.updatedCard)
    },
    onStart() {
      this.$store.commit(SET_IS_DRAGGING, true)
    },
    onEnd() {
      this.$store.commit(SET_IS_DRAGGING, false)
    },
  },
}
</script>
<style lang="scss" scoped>
@use '../../../../scss/responsive' as *;
@use '../../../../scss/color';

.app-stage {
    box-shadow: 0 0 3px color.$black;
    margin: 1rem auto;
    max-width: 100%;
    min-height: 10rem;
    padding: 1rem;
    width: 100%;
}

h2 {
    font-weight: 800;
}

.drop-zone {
    min-height: 6rem;

    .-dragging & {
        border: dotted 0.3rem color.$orange;
    }

    @include breakpoint($small) {
        min-height: calc(100vh - 28rem);
    }
}
</style>