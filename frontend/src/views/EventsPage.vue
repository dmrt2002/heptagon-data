<template>
  <div>
    <sidebar-menu-akahon />
    <div class="flex justify-content-end flex-wrap margins">
      <Button @click="redirect()" icon="pi pi-plus" label="Create Event" />
    </div>
    <DataTable
      :value="Events"
      v-model:filters="filters1"
      filterDisplay="menu"
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
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by name"
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
        filterField="type"
        style="min-width:12rem"
      >
        <template #body="{ data }">
          {{ data.type }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="types"
            placeholder="Any"
            class="p-column-filter"
          >
            <template #value="slotProps">
              <span v-if="slotProps.value">{{ slotProps.value }}</span>
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <span>{{ slotProps.option }}</span>
            </template>
          </Dropdown>
        </template>
      </Column>
      <Column
        :key="field"
        filterField="date"
        dataType="date"
        dataKey="id"
        field="date"
        header="Event Date"
      >
        <template #body="{ data }">
          {{ data.date }}
        </template>
        <template #filter="{ filterModel }">
          <Calendar
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
          />
        </template>
      </Column>
      <Column
        :key="field"
        dataKey="id"
        field="created"
        header="Created-Date/Edited-Date"
      ></Column>
      <Column :key="field" dataKey="id" id="btn" field="Edit" header="">
        <template #body="{ data }">
          <div @click="currEvent(data)">
            <i
              class="pi pi-ellipsis-v"
              @click="toggle"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              type="button"
            >
            </i>
          </div>
          <Menu id="overlay_tmenu" ref="menu" :model="items" :popup="true" />
        </template>
      </Column>
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
import { useStore } from "vuex";
import Menu from "primevue/menu";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default {
  components: {
    DataTable,
    Column,
    SidebarMenuAkahon,
    Button,
    InputText,
    Menu,
    Calendar,
    Dropdown,
  },

  setup() {
    const currEventObj = ref();
    const menu = ref();
    const router = useRouter();

    const toggle = (event) => {
      menu.value.toggle(event);
    };
    const store = useStore();
    const Events = ref();
    const filters1 = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      type: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const types = ref([
     "New York",
      "Rome",
      "London",
     "Istanbul",
     "Paris" 
    ]);
    const items = ref([
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          let currEvent = currEventObj.value;
          let param = {
            id: currEvent._id,
            code: currEvent.code,
            name: currEvent.name,
            description: "",
          };
          store.dispatch("storeEventId", param);
          router.push("/editevent");
        },
      },
      {
        label: "View",
        icon: "pi pi-eye",
        command: () => {
          let currEvent = currEventObj.value;
          let param = {
            id: currEvent._id,
            code: currEvent.code,
            name: currEvent.name,
            description: "",
          };
          store.dispatch("storeEventId", param);
          router.push("/eventdetails");
        },
      },
    ]);
    onMounted(() => {
      retrieveEvents();
    });
    const retrieveEvents = async () => {
      let res = await axios.post(
        "/admin/retrieveAllEvents"
      );
      let events = res.data;
      console.log(res.data[0].Name);
      const eventsProps = [];
      for (let i = 0; i <= events.length; i++) {
        eventsProps.push({
          index: eventsProps.length + 1,
          name: res.data[i].Name,
          type: res.data[i].Type,
          date: res.data[i].Date.toString().split("T")[0],
          code: res.data[i].Code,
          _id: res.data[i]._id,
          Edit: "Edit",
          created: res.data[i].created.toString().split("T")[0],
        });
        Events.value = eventsProps;
        console.log(Events.value);
      }
    };
    const redirect = () => {
      router.push("/addevent");
    };
    const currEvent = (Data) => {
      currEventObj.value = Data;
    };
    const formatDate = (data) => {
      return data.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };
    return {
      Events,
      redirect,
      filters1,
      items,
      menu,
      toggle,
      currEvent,
      formatDate,
      types
    };
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
