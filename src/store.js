import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      id: 0,
      role:'',
      status:'',
      taskId:0,
      parentId:0

    },
    mutations: {
      increment (state,data) {
        state.id=data.id,
        state.role=data.role,
        state.status=data.status

      },
      addTask (state,data){
        state.taskId=data.taskid
      },
      addCommentId (state,data){
        state.parentId=data.parentId
      }
    },
    getters:{
    loggedIn (state) {
      return state.status
    },
    getUserId (state){
      return state.id
    },
    getTaskId (state){
      return state.taskId
    },
    getParentId (state){
      return state.parentId
    }
    

  }
  })