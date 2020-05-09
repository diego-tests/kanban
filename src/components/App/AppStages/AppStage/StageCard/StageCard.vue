<template>
    <article class="stage-card">
        <h2>{{ card.title }}</h2>
        <div class="reference">
            Ref:{{ card.reference }}
        </div>
        <div
            class="color"
            :style="{backgroundColor: card.color}"
        />
    </article>
</template>
<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
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