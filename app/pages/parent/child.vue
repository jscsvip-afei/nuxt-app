<template>
  <div>
    <h2>Child Page</h2>
    <!--  -->
    useFetch 组合式 API 示例：
  </div>
</template>

<script setup>
import {userInfoFetch} from '~/composables/useHttpFetch'
const { data, pending, error, refresh } = await useFetch('https://api.nuxt.com/modules?param1=value1&param2=value2', {
  pick: ['modules','stats'],  // 只获取 modules 和 stats 字段
  // server: false    // 仅在客户端运行 , 注释掉之后是不会在浏览器中看到网络请求 是因为它默认在服务端运行 ,如果开启 刷新的时候会有水合错误 ,如果在parent嵌套 ClientOnly中使用就不会有水合错误 这时候相当于在客户端运行 server:false
});
console.log("Fetched data:", data.value);

// 使用自定义的 useHttpFetch 组合式函数
const {data: userInfoData} = await userInfoFetch();
console.log("userInfoFetch data:", userInfoData.value);
</script>
