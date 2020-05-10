<template>
    <div class="display-options">
        <button 
            class="visibility-toggle"
            :class="{'-active': showOptions}"
            @click="showOptions = !showOptions"
        >
            <VisibilitySvg class="eye" />
        </button>
        <div class="options">
            <button
                class="option"
                :class="{
                    '-visible': showOptions,
                    '-active': showColors
                }"
                data-testid="color"
                @click="toggleColorDisplay"
            >
                matter colors <CheckSvg class="check" />
            </button>
            <button
                class="option"
                :class="{
                    '-visible': showOptions,
                    '-active': showRefs
                }"
                data-testid="references"
                @click="toggleRefsDisplay"
            >
                matter references <CheckSvg class="check" />
            </button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { TOGGLE_SHOW_COLORS, TOGGLE_SHOW_REFS } from '../../../store/_mutationTypes'
import VisibilitySvg from '../../../svg/visibility.svg'
import CheckSvg from '../../../svg/check.svg'
export default {
  components: {
    VisibilitySvg,
    CheckSvg,
  },
  data() {
    return {
      showOptions: false,
    }
  },
  computed: {
    ...mapState({
      showColors: state=> state.ui.showColors,
      showRefs: state=> state.ui.showRefs,
    }),
    colorAction() {
      return this.showColors? 'Showing' : 'Hiding'
    },
    referenceAction() {
      return this.showRefs? 'Showing' : 'Hiding'
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
@use '../../../scss/color';

.visibility-toggle {
    transition: background-color 150ms ease-out;

    &.-active {
        background: color.$orange;
    }
}

.eye {
    fill: color.$orange;
    transition: fill 150ms ease-out;

    .-active & {
        fill: white;
    }
}

.display-options {
    display: flex;
    justify-content: space-between;
    margin: 1rem auto;
}

.options {
    flex-grow: 1;
}

.option {
    align-items: center;
    background: white;
    display: flex;
    flex-grow: 1;
    margin: 0 0.5rem;
    opacity: 0;
    pointer-events: none;
    transform: translate(100%);
    transition:
        border-color 150ms ease-out,
        background-color 150ms ease-out,
        color 150ms ease-out,
        transform 150ms ease-out,
        opacity 150ms ease-out 50ms;

    & + & {
        margin-top: 0.5rem;
    }

    &.-visible {
        opacity: 1;
        pointer-events: auto;
        transform: none;
    }

    &.-active {
        background: color.$orange;
        border-color: color.$orange;
        color: white;
    }
}

.check {
    fill: white;
    height: 1.2rem;
    margin: 0 0 0 0.5rem;
    transition: opacity 150ms ease-out;
    width: 1.2rem;

    .-active {
        opacity: 0;
    }
}
</style>