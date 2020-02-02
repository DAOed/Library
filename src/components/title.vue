<template>
  <div class="title-view justified">
    <div
      class="title-text"
      style="display: flex; align-items: center;"
    >
      <span> {{ title }} </span>
    </div>
    <slot name="extra" />
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>
.title-view {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #fafafa;
}
.title-text {
  font-size: 120%;
  font-weight: 700;
}
</style>
