import { createStore } from 'vuex'


export default createStore({
  state: {
    questionNumber: 1,
    options: [],
  },
  mutations: {
    saveQuestion(state,questNumb) {
      state.questionNumber = questNumb
    },
    saveOption(state,option) {
      state.options.push(option)
    },
    deleteOption(state) {
      state.options.shift()
    }
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
    }
  },
  getters: {
    getQuestion(state) {
      return state.questionNumber
    },
    getOptions(state) {
      return state.options
    }
  }
})
