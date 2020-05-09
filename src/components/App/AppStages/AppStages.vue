<template>
    <section class="stages">
        <AppStage
            v-for="stage in stages"
            :key="stage.id"
            :stage="stage"
        />
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