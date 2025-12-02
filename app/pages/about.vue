<script lang="ts" setup>
const handleMessage = () => {
  message.info("This is a normal message");
}
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
  </a-config-provider>
</template>