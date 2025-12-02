<script lang="ts" setup>
const router = useRouter();
const handleMessage = () => {
  message.info("This is a normal message");
}
const toAbout1 = () => {
  navigateTo('/about');
}

const userInfo = ref({
  name: 'afei',
  age: 18
});
const toAbout2 = () => {

  router.push({
    path: '/about',
    query: {
      name: userInfo.value.name,
      age: userInfo.value.age
    }
  });
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
      <a-button @click="toAbout1">路由跳转1</a-button>
      <a-button @click="toAbout2">路由跳转2</a-button>
      <nuxt-link :to="{path:'/about',query:{name:userInfo.name,age:userInfo.age}}">路由跳转3</nuxt-link><br />
  </a-config-provider>
</template>