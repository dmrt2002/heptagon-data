import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    questionNumber: 1,
    options: [],
    userId: "",
    eventObj:{
      id:"",
      code:"",
      name:"",
      description:""
    },
    userObj: {
      email:"",
      company:"",
      name:""
    },
    catOneScore: null,
    catTwoScore: null,
    score: null
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
      state.questionNumber = state.questionNumber - 1
    },
    storeId(state, id) {
      state.userId = id
    },
    storeEventId(state,obj) {
      state.eventObj = obj
    },
    storeUserObj(state, obj) {
      state.userObj = obj
    },
    updateScore(state,score) {
      state.score = score
    },
    removeOptions(state) {
      state.options = []
    },
    updateCatOneScore(state, score) {
      state.catOneScore = score
    },
    updateCatTwoScore(state, score) {
      state.catTwoScore = score
    }
  },
  actions: {
    saveQuestion(context, questNumb) {
      context.commit('saveQuestion' , questNumb)
    },
    removeOptions(context) {
      context.commit('removeOptions')
    },
    saveOption(context, option) {
      context.commit('saveOption', option)
    },
    deleteOption(context) {
      context.commit('deleteOption')
    },
    storeId(context, id) {
      context.commit('storeId', id)
    },
    storeEventId(context,id) {
      context.commit('storeEventId', id)
    },
    storeUserObj(context,obj) {
      context.commit('storeUserObj', obj)
    },
    updateScore(context, score) {
      context.commit('updateScore', score)
    },
    updateCatOneScore(context, score) {
      context.commit('updateCatOneScore', score)
    },
    updateCatTwoScore(context, score) {
      context.commit('updateCatTwoScore', score)
    }
  },
  getters: {
    getQuestion(state) {
      return state.questionNumber
    },
    getOptions(state) {
      return state.options
    },
    getId(state) {
      return state.userId
    },
    getEventId(state) {
      return state.eventObj
    },
    getParticipantId(state) {
      return state.participantObj
    },
    getUserObj(state) {
      return state.userObj
    },
    getScore(state) {
      return state.score
    },
    getCatOneScore(state) {
      return state.catOneScore
    },
    getCatTwoScore(state) {
      return state.catTwoScore
    } 
  }
})
