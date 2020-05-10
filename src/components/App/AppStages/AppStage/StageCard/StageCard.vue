<template>
    <article 
        :class="{'-no-color': !showColors}"
        class="stage-card"
    >
        <h2>{{ card.title }}</h2>
        <div
            :class="{'-hidden': !showRefs}"
            class="reference"
        >
            Ref:{{ card.reference }}
        </div>
        <div
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
    box-shadow: 0 0 2px black;
    margin: 1rem auto;
    padding: 0.5rem 0.5rem 1rem;
    position: relative;
    transition: padding 150ms ease-out;

    &.-no-color {
        padding-bottom: 0;
    }
}

.color {
    bottom: 0;
    left: 0;
    min-height: 1rem;
    position: absolute;
    right: 0;
    transform-origin: center bottom;
    transition: transform 150ms ease-out, height 150ms ease-out;
    width: 100%;

    .-no-color & {
        transform: scale(1, 0.01);
    }
}

.reference {
    align-items: center;
    display: flex;
    font-size: 1.2rem;
    height: 3rem;
    margin: 0.2rem 0;
    transform-origin: left center;
    transition: transform 150ms ease-out, height 150ms ease-out;

    &.-hidden {
        height: 0;
        transform: scale(0);
    }
}
</style>