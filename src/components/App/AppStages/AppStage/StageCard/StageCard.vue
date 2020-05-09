<template>
    <article class="stage-card">
        <h2>{{ card.title }}</h2>
        <div
            v-show="showRefs"
            class="reference"
        >
            Ref:{{ card.reference }}
        </div>
        <div
            v-show="showColors"
            class="color"
            :style="{backgroundColor: card.color}"
        />
    </article>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      showColors: state=> state.ui.showColors,
      showRefs: state=> state.ui.showRefs,
    }),
  },
}
</script>
<style lang="scss" scoped>
.stage-card {
    border: solid 1px black;
    margin: 1rem auto;
}

.color {
    min-height: 1rem;
    width: 100%;
}
</style>