<template>
  <div>
    <sidebar-menu-akahon />
    <Toast position="top-right" />
    <h2 class="margin-left-2 margin-bottom-2 margin-top-2">
      <Button
        @click="back()"
        icon="pi pi-arrow-left"
        class="p-button-rounded p-button-text"
      />
      {{ EventName }}
    </h2>
    <div class="grid margin-left-2">
      <div class="col-8">
        <InputText placeholder="Event Name" type="text" v-model="EventName" />
      </div>
      <div class="col-8">
        <InputText
          :value="EventCode"
          placeholder="Event Code"
          type="text"
          v-model="EventCode"
        />
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
import { ref, onMounted } from "vue";
import Dropdown from "primevue/dropdown";
import SidebarMenuAkahon from "../components/dashboard.vue";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
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
    let currObj;
    const store = useStore();
    let obj = store.getters.getEventId;
    const router = useRouter();
    const EventName = ref("");
    const EventDescription = ref("");
    const EventCode = ref("");
    const EventDate = ref("");
    const EventType = ref("");
    const cities = ref([
      { name: "Type-1", code: "T1" },
      { name: "Type-2", code: "T2" },
    ]);
    onMounted(async () => {
      EventName.value = obj["name"];
      let param = {
        id: obj["id"],
      };
      let res = await axios.post("/admin/getEventDetails", param);
      currObj = res.data;
      EventName.value = res.data.Name;
      EventCode.value = res.data.Code;
      EventType.value = res.data.Type;
      EventDate.value = res.data.Date;
      EventDescription.value = res.data.Description;
    });
    const back = async () => {
      router.push("/events");
    };
    const submit = async () => {
      if (EventType.value === null) {
        toast.add({
          severity: "error",
          summary: "PLease update Event Type",
          life: 3000,
        });
      } else {
        let param = {
          _id: obj["id"],
          name: EventName.value,
          code: EventCode.value,
          type: EventType.value,
          date: EventDate.value,
          description: EventDescription.value,
          created: currObj.created,
        };
        await axios.post("/admin/updateEvent", param);

        toast.add({
          severity: "success",
          summary: "updated Successfully",
          life: 3000,
        });
        router.push("/events");
      }
    };
    return {
      cities,
      submit,
      back,
      EventName,
      EventCode,
      EventType,
      EventDate,
      EventDescription,
    };
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
.error {
  color: red;
}
</style>
