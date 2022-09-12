<template>
  <div>
    <question v-if="questionval" @submit=submit @back=back :key= refresh /> 
  </div>
</template>

<script>

import question from '../components/question'
import { useStore } from 'vuex'
import { ref } from "vue";
import { useRouter } from 'vue-router'
export default {
  components : {
    question
  },
  setup() {
    let store = useStore();
    let router = useRouter();
    let refresh = ref(0)
    let questionval = ref(true)
    let ne = ref(store.getters.getQuestion)
    if(ne.value === 11 && store.getters.getScore !== null) {
      questionval.value = false
      router.push('/results')
    }
    let submit = () => {
      let n = ref(store.getters.getQuestion)
      let value = n.value  + 1
      store.dispatch('saveQuestion', value)
      n.value++;
      if(n.value === 11 && store.getters.getScore !== "") {
        router.push('/results')
      } else {
        questionval.value = true
         refresh.value++
      }
    }
    let back = () => {
      let n = ref(store.getters.getQuestion)
      if(n.value == 1) {
        router.push('/landingpage')
      }
      else {
      store.dispatch('deleteOption')
      refresh.value++
      }
    }
    return { submit, refresh, questionval, back};
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
* {
  font-family: "Raleway", sans-serif;
}
</style>
