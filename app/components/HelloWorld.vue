<template>
  <h1>{{ msg }}</h1>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
    required: true,
    default: 'Hello World'
  }
});
</script>