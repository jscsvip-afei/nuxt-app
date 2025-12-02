<template>
  <div>
    <h1>登录页面</h1>
    <a-button type="primary" @click="login">登录</a-button>
  </div>
</template>

<script setup>

const login = () => {
  sessionStorage.setItem("userInfo", "{'name':'afei','age':18}");
  message.success("登录成功");
  navigateTo('/');
  // alert("模拟登录成功");
}
</script>
