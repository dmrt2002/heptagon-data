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
        field="EventDate"
        header="Event Date"
      ></Column>
      <Column :key="field" dataKey="id" id="btn" field="Edit" header="">
        <template #body="{ data }">
          <div @click="currParticipant(data)">
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
import { useConfirm } from "primevue/useconfirm";
import Menu from "primevue/menu";
export default {
  components: {
    SidebarMenuAkahon,
    Button,
    DataTable,
    Column,
    InputText,
    Menu
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let obj = store.getters.getEventId;
    const Events = ref();
    const eventDetails = ref({});
    const currParticipantObj = ref();
    const filters1 = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const confirm = useConfirm();
    const toggle = (event) => {
      menu.value.toggle(event);
    };
    const menu = ref();
    const items = ref([
      {
        label: "Delete",
        icon: "pi pi-trash",
        command : () => {
            confirm.require({
                message: 'Are you sure you want to proceed?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: async() => {
                  let param = {
                       id : currParticipantObj.value._id
                      }
                  let res = await axios.post("/admin/removePartcipant",param)
                   if(res.status === 200) {
                        location.reload()
                   }
                  },
                reject: () => {

                }
            });
        }
      },
      {
        label: "View",
        icon: "pi pi-eye",
        command : () => {
          let currParticipant = currParticipantObj.value;
          let param = {
            name: currParticipant.name,
            company: currParticipant.organization,
            email:currParticipant.email
          };
          store.dispatch("storeUserObj", param);
          let id =  currParticipant._id
          store.dispatch("storeId", id)
          router.push("/participantdetails");       
        }
      },
    ]);
    onMounted(async () => {
      retrieveEvents();
      let param = {
        id: obj["id"],
      };
      if (obj["id"] !== "") {
        let res = await axios.post("/admin/getEventDetails", param);
        if(res.data.Date !== null )
           res.data.Date = res.data.Date.toString().split("T")[0];
        let parameter = {
          id: res.data._id,
          code: res.data.Code,
          name: res.data.Name,
          type: res.data.Type,
          description: res.data.Description,
        };
        console.log({parameter})
        store.dispatch("storeEventId", parameter);
        eventDetails.value = res.data;
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
      let events = res.data;
      const eventsProps = [];
      for (let i = 0; i <= events.length; i++) {
        eventsProps.push({
          index: eventsProps.length + 1,
          name: res.data[i].FirstName,
          email: res.data[i].Email,
          organization: res.data[i].Organization,
          assessment: res.data[i].Date,
          _id: res.data[i]._id,
          EventDate: eventDetails.value['Date'],
          Score: res.data[i].Score
        });
        Events.value = eventsProps;
      }
    };
    const currParticipant = (Data) => {
      currParticipantObj.value = Data;
      store.dispatch("updateScore", Data.Score);
    };
    const back = () => {
      router.push("/events");
    };
    const redirect = () => {
      router.push({path:"/addparticipant", params: eventDetails});
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
      currParticipant,
      items,
      menu,
      toggle
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
