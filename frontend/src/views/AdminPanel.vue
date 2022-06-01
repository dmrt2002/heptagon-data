<template>
  <div>
    <div class="grid">
      <div class="col-6 justify-content-start flex">
        <img :src="link[0]" height="50" alt="" />
      </div>
    </div>
    <DataTable
      :value="products"
      responsiveLayout="scroll"
      v-model:selection="selectedProduct1"
      selectionMode="single"
      dataKey="id"
      :paginator="true"
      :rows="8"
    >
      <Column :key="field" dataKey="id" field="index" header="ID"></Column>
      <Column :key="field" dataKey="id" field="Name" header="Name"></Column>
      <Column :key="field" dataKey="id" field="email" header="Email"></Column>
      <Column :key="field" dataKey="id" field="company" header="Company"></Column>
      <Column :key="field" dataKey="id" field="country" header="Country"></Column>
      <Column :key="field" dataKey="id" field="role" header="Role">
      </Column>
      <Column
        :key="field"
        dataKey="id"
        id="btn"
        field="deleteButton"
        header="Delete"
      >
        <template #body="{ data }">
          <Button @click="openModal(data._id)" class="button-style red-color"
            >Delete</Button
          >
        </template>
      </Column>
    </DataTable>
    <Dialog
      header="Remove User"
      v-model:visible="displayBasic"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <p>Are you sure you want to delete the user?</p>
      <template #footer>
        <Button label="Yes" @click="deleteUser()" class="button-style" />
        <Button label="No" @click="closeBasic()" class="p-button-text" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button'

export default {
    components: {
        DataTable,
        Column,
        Dialog,
        Button
    },
  setup() {
    const displayResponsive = ref();
    const deleteUserId = ref();
    const displayBasic = ref();
    const openModal = (val) => {
      displayBasic.value = true;
      deleteUserId.value = val;
      console.log(displayBasic.value, val);
    };
    let link = [
      "https://raw.githubusercontent.com/dmrt2002/images/696ad09814061b0a6d1ff1653ac680969870b760/heptagon.svg",
    ];
    const closeBasic = () => {
      displayBasic.value = false;
    };
    const deleteUser = async() => {
      let param = {
        userId: deleteUserId.value
      }
      let res = await axios.post("/user/deleteUser", param)
      console.log(res)
      retrieveUsers();
      displayBasic.value = false;
    };
    const retrieveUsers = async() => {
      let res = await axios.post("/user/retrieveAllUsers");
      let users = res.data;
      const usersProps = [];
      for (let i = 0; i < users.length; i++) {
        usersProps.push({
          index: usersProps.length + 1,
          Name: res.data[i].firstName,
          email: res.data[i].email,
          company: res.data[i].company,
          country: res.data[i].country,
          role: res.data[i].role,
          _id: res.data[i]._id,
          deleteButton: "delete",
        });
        if (users[i].lastQuestionAttempted === "27") {
          usersProps[i].details = "Complete";
        } else {
          usersProps[i].details = "Incomplete";
        }
        products.value = usersProps;
        console.log(usersProps);
    }
    }
    onMounted(() => {
      retrieveUsers();
    })
    const products = ref();
    const selectedProduct1 = ref();

    return {
      products,
      selectedProduct1,
      displayResponsive,
      openModal,
      deleteUser,
      closeBasic,
      displayBasic,
      link
    };
  },
}
</script>

<style>
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
.p-dialog, .p-dialog-header, .p-dialog-title {
  margin: 0;
}
</style>