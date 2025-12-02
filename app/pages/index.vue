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
        首页
      </a-button>
      <hello-world msg="Welcome to the Home Page!" />
      <nuxt-link to="/about">关于</nuxt-link> <br />
      <nuxt-link to="/parent">父级</nuxt-link><br />
      <nuxt-link to="/parent/child">子级</nuxt-link><br />
      <nuxt-link to="/users-web/afei">动态路由1</nuxt-link><br />
      <nuxt-link to="/users-ai/jscs">动态路由2</nuxt-link><br />
  </a-config-provider>
</template>