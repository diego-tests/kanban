<template>
    <section class="stages">
        <div
            v-for="stage in stages"
            :key="stage.id"
            class="stage-wrapper"
        >
            <AppStage :stage="stage" />
        </div>
    </section>
</template>
<script>
import AppStage from './AppStage/AppStage'
export default {
  props: {
    stages: {
      type: Array,
      required: true,
    },
  },
  components: {
    AppStage,
  },
}
</script>
<style lang="scss" scoped>
@use '../../../scss/responsive' as *;

.stages {
    margin: auto;
    width: 100%;

    @include breakpoint($small) {
        display: flex;
        justify-content: space-between;
    }
}

.stage-wrapper {
    @include breakpoint($small) {
        width: calc((100% / 3) - 1rem);
    }
}
</style>