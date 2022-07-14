<template>
  <div class="top">
    <sidebar-menu-akahon />
    <h2 class="margin-left-2 margin-bottom-2">
      <Button
        @click="back()"
        icon="pi pi-arrow-left"
        class="p-button-rounded p-button-text margin-left-1"
      />
      <span class="align-center">&nbsp;{{ eventDetails.Name }}</span>
    </h2>
    <div class="grid margin-left-1">
      <div class="col-3">
        Event Code: <br />
        {{ eventDetails.Code }}
      </div>
      <div class="col-3">
        Event Type <br />
        {{ eventDetails.Type }}
      </div>
      <div class="col-3">
        Event Date <br />
        {{ eventDetails.Date }}
      </div>
      <div class="col-3">
        Event Description <br />
        {{ eventDetails.Description }}
      </div>
    </div>
    <div class="flex justify-content-end flex-wrap margins">
      <Button
        @click="redirect()"
        icon="pi pi-plus"
        class="margin-auto"
        label="Create Participant"
      />
      <Button
        @click="upload()"
        icon="pi pi-file-excel"
        class="margin-auto"
        label="Bulk Upload"
      />
    </div>
    <DataTable
      :value="Events"
      v-model:filters="filters1"
      @rowSelect="onRowSelect"
      stateStorage="session"
      responsiveLayout="scroll"
      selectionMode="single"
      dataKey="id"
      :paginator="true"
      :rows="8"
    >
      <template #header id="bg">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters1['global'].value"
            placeholder="Global Search"
          />
        </span>
      </template>
            <template #empty>
                <span class="text-center">No partcipants found.</span>
            </template>
      <Column
        sortable
        :key="field"
        dataKey="id"
        field="index"
        header="Index"
      ></Column>
      <Column sortable :key="field" dataKey="id" field="name" header="Name">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
            :placeholder="`Search by name - ${filterModel.matchMode}`"
          /> </template
      ></Column>
      <Column
        sortable
        :key="field"
        dataKey="id"
        field="email"
        header="Email"
      ></Column>
      <Column
        sortable
        :key="field"
        dataKey="id"
        field="organization"
        header="Organization"
      ></Column>
      <Column
        :key="field"
        dataKey="id"
        field="assessment"
        header="Date Of Assessment"
      ></Column>
      <Column
        :key="field"
        dataKey="id"
        field="Actions"
        header="Event Date"
      ></Column>
    </DataTable>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import SidebarMenuAkahon from "../components/dashboard.vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import InputText from "primevue/inputtext";
import axios from "axios";
export default {
  components: {
    SidebarMenuAkahon,
    Button,
    DataTable,
    Column,
    InputText,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let obj = store.getters.getEventId;
    const Events = ref();
    const eventDetails = ref({});
    const filters1 = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    onMounted(async () => {
      retrieveEvents();
      let param = {
        id: obj["id"],
      };
      if (obj["id"] !== "") {
        let res = await axios.post("/admin/getEventDetails", param);
        res.data.Date = res.data.Date.toString().split("T")[0];
        let parameter = {
          id: res.data._id,
          code: res.data.Code,
          name: res.data.Name,
          description: res.data.Description,
        };
        console.log(parameter);
        store.dispatch("storeEventId", parameter);
        eventDetails.value = res.data;
        console.log(eventDetails.value);
      }
    });
    const YOUR_FILTER = ref("YOUR FILTER");
    const filters = ref({
      name: { value: null, matchMode: YOUR_FILTER.value },
      "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const matchModeOptions = ref([
      { label: "Your Equals", value: YOUR_FILTER.value },
      { label: "Starts With", value: FilterMatchMode.STARTS_WITH },
    ]);
    const retrieveEvents = async () => {
      let param = {
        id: obj["id"],
      }
      let res = await axios.post("/admin/getEventPartcipants", param);
      console.log(res)
      let events = res.data;
      console.log(res.data);
      const eventsProps = [];
      for (let i = 0; i <= events.length; i++) {
        eventsProps.push({
          index: eventsProps.length + 1,
          name: res.data[i].FirstName,
          email: res.data[i].Email,
          organization: res.data[i].Organization,
          assessment: "-",
          _id: res.data[i]._id,
          actions: "",
        });
        Events.value = eventsProps;
        console.log(Events.value);
      }
    };
    const back = () => {
      console.log("fuck you");
      router.push("/events");
    };
    const redirect = () => {
      router.push("/addparticipant");
    };
    const upload = () => {
      router.push("/upload");
    };
    return {
      eventDetails,
      back,
      filters1,
      filters,
      upload,
      matchModeOptions,
      Events,
      redirect,
    };
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.margin-left-1 {
  margin-left: 20px;
}
.margin-bottom-2 {
  margin-bottom: 20px;
}
.margin-auto {
  margin-left: 20px;
}
</style>
