<template>
  <div class="top">
    <sidebar-menu-akahon />
    <Toast position="top-right" />
    <h2 class="margin-left-2 margin-bottom-2 margin-top-2">
      <Button @click="back()" icon="pi pi-arrow-left" class="p-button-rounded p-button-text" />
    </h2>
    <div class="flex align-items-center justify-content-center h-90">
      <div class="group">
        <div class="header">Participant Bulk Upload</div>
        <div class="grid">
          <div class="col-6">
            <i class="pi pi-file-excel font-size"></i>
            <br />
            <a href="https://hept-data.herokuapp.com/template.xlsx" download="template.xlsx" class="cta cursor-pointer">
            <span class="block" @click="template()">Download Template</span>
            </a>
          </div>
          <div class="col-4 col-offset-2">
            <i class="pi pi-save font-size"></i>
            <br />
            <span class="block" @click="attach()">Attach file</span>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      v-model:visible="displayBasic"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
    >
      <input type="file" @change="onUpload()" />
    </Dialog>
  </div>
</template>

<script>
var XLSX = require("xlsx");
import axios from "axios";
import SidebarMenuAkahon from "../components/dashboard.vue";
import Dialog from "primevue/dialog";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  components: {
    SidebarMenuAkahon,
    Dialog,
    Toast,
    Button
  },
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const param = ref({})
    const displayBasic = ref(false);
    let myObj = ref([]);
    const attach = () => {
      displayBasic.value = true;
    };
    const onUpload = () => {
      let file = event.target.files[0];
      if (file) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
          var data = event.target.result;

          var workbook = XLSX.read(data, {
            type: "binary",
          });

          workbook.SheetNames.forEach((sheet) => {
            let rowObject = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheet]
            );
            for(let i = 0; i< rowObject.length ; i++) {
              rowObject[i].PassCode = "1"
            }
            myObj.value = rowObject;
            try {
              axios.post("/admin/eventBulkUpdate", param.value)
              axios.post("/admin/bulkUpload", myObj.value);
            } catch (e) {
              console.log(e);
            }
            toast.add({
              severity: "success",
              summary: "Uploaded Successfully",
              life: 3000,
            });
             router.go(-1)
          });
        };
        fileReader.readAsBinaryString(file);
      }
    };
    const back = () => {
      router.go(-1)
    }
    onMounted(() => {
      let obj = store.getters.getEventId;
      let parameter = {
        name: obj['name'],
        description: obj['description']
      }
      param.value = parameter
    })
    return { displayBasic, attach, onUpload, back };
  },
};
</script>

<style scoped>
.h-90 {
  height: 90vh;
}
.header {
  margin-bottom: 10vh;
  font-size: 1.5em;
}
.font-size {
  font-size: 3em;
}
.block {
  display: inline-block !important;
  font-size: 20px;
  margin-right: 40px;
  color: blue;
  cursor: pointer;
}
</style>
