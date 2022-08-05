import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    questionNumber: 1,
    options: [],
    classes: ["bg-1","bg-1","bg-1","bg-1","bg-1"],
    class: 0,
    userId: "",
    eventObj:{
      id:"",
      code:"",
      name:"",
      description:""
    },
    participantObj: {
      id:"",
      email:"",
      organization: "",
      department:"",
      gender: "",
      attempts: ""
    },
    userObj: {
      email:"",
      company:"",
      name:""
    }
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
    storeId(state, id) {
      state.userId = id
    },
    storeEventId(state,obj) {
      state.eventObj = obj
    },
    storeParticipantId(state,obj) {
      state.participantObj = obj
    },
    storeUserObj(state, obj) {
      state.userObj = obj
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
    },
    updateClass(context) {
      context.commit('updateClass')
    },
    degradeClass(context) {
      context.commit('degradeClass')
    },
    storeId(context, id) {
      context.commit('storeId', id)
    },
    storeEventId(context,id) {
      context.commit('storeEventId', id)
    },
    storeParticipantId(context,id) {
      context.commit('storeParticipantId', id)
    },
    storeUserObj(context,obj) {
      context.commit('storeUserObj', obj)
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
    }
  }
})
