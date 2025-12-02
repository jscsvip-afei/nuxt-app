// 全局路由中间件
export default defineNuxtRouteMiddleware((to, from) => {
  console.log("全局中间件执行",`路由 ${to.path} 正在被访问，从 ${from.path} 来`);
})