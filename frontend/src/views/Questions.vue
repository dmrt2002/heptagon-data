<template>
  <div class="background">
    <div class="flex align-items-start flex-wrap">
      <div class="margin-left">
        <img :src="link[0]" class="logo" alt="" />
      </div>
    </div>
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
    let n = ref(store.getters.getQuestion)
    if(n.value === 11) {
      questionval.value = false
      router.push('/results')
    }
    let submit = () => {
      let value = n.value  + 1
      store.dispatch('saveQuestion', value)
      n.value++;
      if(n.value === 11) {
        router.push('/results')
      } else {
        questionval.value = true
         refresh.value++
      }
    }
    let back = () => {
      store.dispatch('deleteOption')
      refresh.value++
    }
    let link = [
      "https://raw.githubusercontent.com/dmrt2002/images/696ad09814061b0a6d1ff1653ac680969870b760/heptagon.svg",
    ];
    return { submit, refresh, link, questionval, back };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
* {
  font-family: "Raleway", sans-serif;
}
.background {
  background-color: rgba(241, 237, 246, 0.818);
  min-height: 100vh;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}
.logo {
  height: 60px !important;
}
</style>
