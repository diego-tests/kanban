<template>
    <div class="display-options">
        <button
            class="button"
            data-testid="color"
            @click="toggleColorDisplay"
        >
            {{ colorAction }} matter colors
        </button>
        <button
            class="button"
            data-testid="references"
            @click="toggleRefsDisplay"
        >
            {{ referenceAction }} matter references
        </button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { TOGGLE_SHOW_COLORS, TOGGLE_SHOW_REFS } from '../../../store/_mutationTypes'
export default {
  computed: {
    ...mapState({
      showColors: state=> state.ui.showColors,
      showRefs: state=> state.ui.showRefs,
    }),
    colorAction() {
      return this.showColors? 'Hide' : 'Show'
    },
    referenceAction() {
      return this.showRefs? 'Hide' : 'Show'
    },
  },
  methods: {
    toggleColorDisplay() {
      this.$store.commit(TOGGLE_SHOW_COLORS)
    },
    toggleRefsDisplay() {
      this.$store.commit(TOGGLE_SHOW_REFS)
    },
  },
}
</script>
<style lang="scss" scoped>
.display-options {
    display: flex;
    justify-content: space-between;
    margin: 1rem auto;
}
</style>