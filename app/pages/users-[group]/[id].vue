<template>
  <div>
    <h1>User - {{ route.params.group }} - {{ route.params.id }}</h1>
    <h2>部门 - {{ route.params.group }}</h2>
    <h2>用户ID - {{ route.params.id }}</h2>
  </div>
</template>

<script setup>
const route = useRoute();
</script>
