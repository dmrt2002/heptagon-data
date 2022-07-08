<template>
  <div>
    <sidebar-menu-akahon />
    <div class="flex justify-content-end flex-wrap margins">
      <Button @click="redirect()" icon="pi pi-plus" label="Create Event" />
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
      <Column
        sortable
        :key="field"
        dataKey="id"
        field="index"
        header="Index"
      ></Column>
      <Column
        sortable
        :key="field"
        dataKey="id"
        field="name"
        header="Event Name"
      >
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
        field="code"
        header="Event Code"
      ></Column>
      <Column
        sortable
        :key="field"
        dataKey="id"
        field="type"
        header="Event Type"
      ></Column>
      <Column :key="field" dataKey="id" field="date" header="Event Date">
      </Column>
      <Column
        :key="field"
        dataKey="id"
        field="created"
        header="Created-Date/Edited-Date"
      ></Column>
    </DataTable>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import SidebarMenuAkahon from "../components/dashboard.vue";
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import { FilterMatchMode, FilterService } from "primevue/api";
import { useStore } from 'vuex'

export default {
  components: {
    DataTable,
    Column,
    SidebarMenuAkahon,
    Button,
    InputText,
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    const Events = ref();
    const filters1 = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    onMounted(() => {
      retrieveEvents();
      FilterService.register(YOUR_FILTER.value, (value, filter) => {
        if (filter === undefined || filter === null || filter.trim() === "") {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.toString() === filter.toString();
      });
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
      let res = await axios.post(
        "http://localhost:5000/admin/retrieveAllEvents"
      );
      let events = res.data;
      console.log(res.data);
      const eventsProps = [];
      for (let i = 0; i <= events.length; i++) {
        eventsProps.push({
          index: eventsProps.length + 1,
          name: res.data[i].Name,
          type: res.data[i].Type,
          date: res.data[i].Date.toString().split("T")[0],
          code: res.data[i].Code,
          _id: res.data[i]._id,
          created: res.data[i].created.toString().split("T")[0],
        });
        Events.value = eventsProps;
        console.log(Events.value);
      }
    };
    const redirect = () => {
      router.push("/addevent");
    };
    const onRowSelect = (event) => {
      let param = {
        id: event.data._id,
        code: event.data.code
      }
      store.dispatch('storeEventId' , param)
     router.push("/eventdetails")
    }
    return { Events, redirect, filters1, filters, matchModeOptions, onRowSelect };
  },
};
</script>

<style>
#bg {
  background: white !important ;
}
.p-datatable .p-datatable-tbody > tr.p-highlight {
  color: black !important;
  background: white !important;
}
.red-color {
  background-color: rgba(163, 10, 10, 0.842) !important;
  border: 1px solid red !important;
}
.red-color:focus {
  box-shadow: 0 0 0 0.1rem rgb(202, 107, 107) !important;
}
.error-message {
  color: red;
  font-size: 15px;
  margin: 5px;
}
.margin-top {
  margin-top: 3vh;
}
.screen {
  color: white;
  width: 240px;
  height: 50px;
  text-align: center;
}
.margin-bottom {
  margin-bottom: 4px !important;
}
.dialog-box,
.content {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 2000 !important;
}
.p-dialog .p-dialog-header {
  background-color: white !important;
}
#btn {
  background-color: black;
}
.p-datatable .p-datatable-tbody > tr > td:nth-last-child(1) {
  color: red;
  border: 1px;
}
.p-dialog,
.p-dialog-header,
.p-dialog-title {
  margin: 0;
}
.align-center-text {
  text-align: center;
}
.margins {
  margin: 20px;
}
</style>
