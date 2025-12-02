export default defineNuxtRouteMiddleware((to, from) => {
  // 判断用户是否登录
  if (import.meta.client) {
    let user = false; // 初始化未登录
    // 获取sessionStorage中的用户登录状态
    const userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
      user = true; // 已登录
    }
    
    if (!user && to.path !== '/login') {
      // 如果未登录且不是去登录页，则重定向到登录页
      return navigateTo('/login');
    }
    if (user && to.path === '/login') {
      // 如果已登录且去登录页，则重定向到首页
      return navigateTo('/');
    }
  }
})