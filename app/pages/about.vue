<script lang="ts" setup>
const handleMessage = () => {
  message.info("This is a normal message");
}
const route = useRoute();
</script>
<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#ea6f5a',
      },
    }"
  >
      <a-button @click="handleMessage" type="primary">
        关于
      </a-button>
      <nuxt-link to="/">返回首页</nuxt-link><br />
      <p v-if="Object.keys(route.query).length > 0">{{ route.query }}</p>
  </a-config-provider>
</template>