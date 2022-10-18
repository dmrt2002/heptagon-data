<template>
    <div>
       <sidebar-menu-akahon />
    <h2 class="margin-left-2 margin-bottom-2 margin-top-2">
      <Button @click="back()" icon="pi pi-arrow-left" class="p-button-rounded p-button-text" />
    </h2>
       <Results v-if="isTypeOne" admin="true" />
       <ResultsTwo v-else admin="true" />
    </div>
</template>

<script>
import { ref} from '@vue/runtime-core';
import SidebarMenuAkahon from "../components/dashboard.vue"; 
import Button from 'primevue/button';
import ResultsTwo from '../views/ResultsTwo.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';
import Results from "./Results.vue"
import { useStore } from 'vuex'

export default {
    components: {
        SidebarMenuAkahon,
        Results,
        ResultsTwo,
        Button
    },
    setup() {
      const isTypeOne = ref(false)
      onMounted(() => {
        const store = useStore()
        if(store.getters.getEventType == "Type-1") {
          isTypeOne.value = true
        }
        else {
          isTypeOne.value = false
        }
      })
        const router = useRouter();
        let hide = ref(true)
        const back = () => {
            router.go(-1)
        }
        return { back, hide, isTypeOne }
    },
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
.margin-left-2 {
  margin-left: 20px;
}
.margin-bottom-2 {
  margin-bottom: 20px;
}
.margin-auto {
  margin-left: 20px;
}
.margin-top-2 {
  margin-top: 20px;
}
.image {
    width: 20vw;
    height: 200px;
}
</style>