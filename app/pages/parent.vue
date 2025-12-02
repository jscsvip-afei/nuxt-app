<template>
  <h1>Parent Page</h1>
  <NuxtPage />
  <h2>使用插件</h2>
  <p>{{ $myPluginMethod('World') }}</p>
  <a-button @click="handleMessage" type="primary">
    父级页面按钮
  </a-button>
</template>
<script setup>
// 匿名中间件
definePageMeta({
  middleware: defineNuxtRouteMiddleware((to, from) => {
    // 判断用户是否登录
    let user = false; // 初始化未登录
    // 获取sessionStorage中的用户登录状态
    const userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
      user = true; // 已登录
    }
    if (!user) {
      // 如果未登录且不是去登录页，则重定向到首页
      return navigateTo('/login');
    }

  })
});
const {$message} = useNuxtApp()
const handleMessage = () => {
  $message.info("This is a normal message from parent page");
}
</script>