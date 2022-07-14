<template>
  <div>
    <sidebar-menu-akahon />
    <Toast position="top-right" />
    <h2 class="margin-left-2 margin-bottom-2 margin-top-2">
      <Button @click="back()" icon="pi pi-arrow-left" class="p-button-rounded p-button-text" />
      <span class="align-center">Add Participant</span>
    </h2>
    <div class="grid margin-left-2">
      <div class="col-4 col-offset-2">
        <InputText placeholder="First Name" type="text" v-model="FirstName" />
      </div>
      <div class="col-6">
        <InputText placeholder="Last Name" type="text" v-model="LastNmae" />
      </div>
      <div class="col-4 col-offset-2">
        <InputText placeholder="Email" type="text" v-model="Email" />
      </div>
      <div class="col-6">
        <InputText placeholder="Organisation" type="text" v-model="Organization" />
      </div>
      <div class="col-4 col-offset-2">
        <InputText placeholder="Department" type="text" v-model="Department" />
      </div>
      <div class="col-6">
        <Dropdown
          v-model="Gender"
          :options="cities"
          optionLabel="name"
          placeholder="Gender"
        />
      </div>
      <div class="col-4 col-offset-2">
         <InputText placeholder="No Of Attempts" type="number" v-model="Attempts" />
      </div>
      <div class="col-6">
         <InputText placeholder="Event Code" type="text" v-model="EventCode" />
      </div>
      <div class="col-8 col-offset-4">
        <Button label="Save" @click="submit()" class="margin-right-2" />
        <Button class="p-button-danger" label="Cancel" />
      </div>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import { ref, toRefs, reactive } from "vue";
import Dropdown from "primevue/dropdown";
import SidebarMenuAkahon from "../components/dashboard.vue";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { useRouter } from 'vue-router';
import axios from 'axios'
export default {
  components: {
    InputText,
    SidebarMenuAkahon,
    Dropdown,
    Button,
    Toast,
  },
  setup() {
    const toast = useToast();
    const router = useRouter();
    const cities = ref([
      { name: "Male", code: "NY" },
      { name: "Female", code: "RM" },
    ]);
    const state = reactive({
      FirstName: "",
      LastNmae: "",
      Email: "",
      Organization: "",
      Department: "",
      Gender:"",
      Attempts:"",
      EventCode:""
    });
    const back = async () => {
      router.go(-1)
    }
    const submit = async () => {
       let res = await axios.post('/admin/addParticipant' , state)
       console.log(res)
      toast.add({
        severity: "success",
        summary: "Created Successfully",
        life: 3000,
      });
    };
    return { cities, ...toRefs(state), submit, back };
  },
};
</script>

<style scoped>
.margin-left-2 {
  margin-left: 20px;
}
.margin-bottom-2 {
  margin-bottom: 20px;
}
.margin-top-2 {
  margin-top: 10px;
}
.margin-right-2 {
  margin-right: 10vw;
}
</style>
