<template>
  <div>
    <sidebar-menu-akahon />
    <Toast position="top-right" />
    <h2 class="margin-left-2 margin-bottom-2 margin-top-2">
      <Button @click="back()" icon="pi pi-arrow-left" class="p-button-rounded p-button-text" />
      Add Event
    </h2>
    <div class="grid margin-left-2">
      <div class="col-8">
        <InputText placeholder="Event Name" type="text" v-model="EventName" />
      </div>
      <div class="col-8">
        <InputText placeholder="Event Code" type="text" v-model="EventCode" />
      </div>
      <div class="col-8">
        <Dropdown
          v-model="EventType"
          :options="cities"
          optionLabel="name"
          placeholder="Event Type"
        />
      </div>
      <div class="col-8">
        <Calendar
          id="icon"
          placeholder="Event Date"
          v-model="EventDate"
          :showIcon="true"
        />
      </div>
      <div class="col-8">
        <Textarea
          placeholder="Event Description"
          v-model="EventDescription"
          rows="5"
          cols="30"
        />
      </div>
      <div class="col-8">
        <Button label="Submit" @click="submit()" class="margin-right-2" />
        <Button class="p-button-danger" label="Cancel" />
      </div>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import { ref, toRefs, reactive } from "vue";
import Dropdown from "primevue/dropdown";
import SidebarMenuAkahon from "../components/dashboard.vue";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";
import { useRouter } from 'vue-router';
import axios from 'axios'
export default {
  components: {
    InputText,
    SidebarMenuAkahon,
    Dropdown,
    Calendar,
    Button,
    Textarea,
    Toast,
  },
  setup() {
    const toast = useToast();
    const router = useRouter();
    const cities = ref([
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ]);
    const state = reactive({
      EventName: "",
      EventCode: "",
      EventType: "",
      EventDate: "",
      EventDescription: "",
    });
    const back = async () => {
      router.push('/events')
    }
    const submit = async () => {
       let res = await axios.post('/admin/addEvent' , state)
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
