import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      message
    }
  }
})