export default defineNuxtPlugin(() => {
  return {
    provide: {
      myPluginMethod: () => {
        console.log("This is my plugin method");
        
      }
    }
  }
})