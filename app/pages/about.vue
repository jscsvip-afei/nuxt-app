<script lang="ts" setup>
import { useMyStore } from '../stores/myStore';

// 设置具名中间件
definePageMeta({
  title: '关于页面',
  meta: [
    { name: 'keywords', content: '关于,about' },
    { name: 'description', content: '这是关于页面的描述' }
  ],
  middleware: 'auth'
});

const handleMessage = () => {
  message.info("This is a normal message");
}
const store = useMyStore();
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
      <p>点赞数：{{ store.likeCount }}</p>
      <a-button @click="store.add">点赞</a-button>
      <nuxt-link to="/">返回首页</nuxt-link><br />
      <p v-if="Object.keys(route.query).length > 0">{{ route.query }}</p>
  </a-config-provider>
</template>