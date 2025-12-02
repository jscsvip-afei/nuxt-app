<template>
  <div>
    <h1>User - {{ route.params.group }} - {{ route.params.id }}</h1>
    <h2>部门 - {{ route.params.group }}</h2>
    <h2>用户ID - {{ route.params.id }}</h2>
    <h2>感染者 - {{ counter }} </h2>
    <ClientOnly>
      <a-button @click="addCount">传染</a-button>
      <a-button @click="resetCount">清零</a-button>
    </ClientOnly>
    <h2>核酸消耗 - {{ findCounter }} </h2>
    <ClientOnly>
      <a-button @click="findCounter++">做核酸</a-button>
    </ClientOnly>
  </div>
</template>

<script setup>
const route = useRoute();
const counter = useCounter();
const addCount = () => {
  counter.value++;
}
const resetCount = () => {
  counter.value = 0;
}

const findCounter = useState('findCounter', () => 0);

const useInfoCookie = useCookie('userInfo',{maxAge:60*60*24});
useInfoCookie.value = {
  name: 'afei',
  age: 18
}
console.log("userInfoCookie:", useInfoCookie.value);
</script>
