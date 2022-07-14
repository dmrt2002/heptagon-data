<template>
  <div class="top">
    <sidebar-menu-akahon />
    <ConfirmDialog></ConfirmDialog>
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
      :value="Partcipants"
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
      <Column sortable :key="field" dataKey="id" field="name" header="Name">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
      </Column>
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
        filterField="organization"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.organization }}
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
        dataKey="id"
        field="assessment"
        header="Date Of Assessment"
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
import SidebarMenuAkahon from "../components/dashboard.vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import axios from "axios";
import Dropdown from "primevue/dropdown";
import Menu from "primevue/menu";
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';
export default {
  components: {
    SidebarMenuAkahon,
    Button,
    DataTable,
    Column,
    InputText,
    Menu,
    Dropdown,
    ConfirmDialog
  },
  setup() {
    const router = useRouter();
    const currParticipantObj = ref();
    let types = ref()
    const Partcipants = ref();
    const confirm = useConfirm();
    const toggle = (event) => {
      menu.value.toggle(event);
    };
    const menu = ref();
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
      organization: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
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
      },
    ]);
    onMounted(async () => {
      retrieveEvents();
      let resp = await axios.post("http://localhost:5000/admin/getCompanies");
      types.value = resp.data.filter((c, index) => {
        return resp.data.indexOf(c) === index
      })
      console.log(types.value)
    });
    const retrieveEvents = async () => {
      let res = await axios.post("/admin/retrieveAllParticipants");
      const partcipantProps = [];
      for (let i = 0; i <= res.data.length; i++) {
        partcipantProps.push({
          index: partcipantProps.length + 1,
          name: res.data[i].FirstName,
          email: res.data[i].Email,
          organization: res.data[i].Organization,
          assessment: "-",
          _id: res.data[i]._id,
          Edit: "Edit",
        });
        Partcipants.value = partcipantProps;
      }
    };
    const back = () => {
      router.push("/events");
    };
    const redirect = () => {
      router.push("/addparticipant");
    };
    const upload = () => {
      router.push("/upload");
    };
    const currParticipant = (Data) => {
      currParticipantObj.value = Data;
    };
    return {
      filters1,
      items,
      toggle,
      menu,
      back,
      upload,
      Partcipants,
      redirect,
      types,
      currParticipant,
    };
  },
};
</script>

<style scoped>
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
