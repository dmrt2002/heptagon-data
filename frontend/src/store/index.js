import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    questionNumber: 1,
    options: [],
    classes: ["bg-1","bg-2","bg-3","bg-4","bg-5"],
    class: 0,
  },
  mutations: {
    saveQuestion(state,questNumb) {
      state.questionNumber = questNumb
    },
    saveOption(state,option) {
      state.options.push(option)
    },
    updateClass(state) {
      if(state.class > 4) {
        state.class = 0
      } else {
        state.class++
      }
    },
    degradeClass(state) {
      state.class--;
    },
    deleteOption(state) {
      state.options.shift()
      state.questionNumber = state.questionNumber - 1
    },
  },
  actions: {
    saveQuestion(context, questNumb) {
      context.commit('saveQuestion' , questNumb)
    },
    saveOption(context, option) {
      context.commit('saveOption', option)
    },
    deleteOption(context) {
      context.commit('deleteOption')
    },
    updateClass(context) {
      context.commit('updateClass')
    },
    degradeClass(context) {
      context.commit('degradeClass')
    }
  },
  getters: {
    getQuestion(state) {
      return state.questionNumber
    },
    getOptions(state) {
      return state.options
    },
    getClass(state) {
      return state.classes[state.class]
    }
  }
})
