import {defineStore} from 'pinia';

export const useMyStore = defineStore('myStore', {
  state: () => ({
    
    likeCount: 0
  }),
  getters: {
    getLikeCount: (state) => state.likeCount
  },
  actions: {
 
    add(){
      this.likeCount++;
    }
  },
    persist: true,
  }
)