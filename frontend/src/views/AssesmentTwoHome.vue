<template>
    <div class="background">
      <Toast position="top-right" />
      <div class="flex align-items-start flex-wrap">
        <div class="margin-left">
          <img :src="link[0]" class="logo" alt="" />
        </div>
      </div>
      <div class="align-items-center flex justify-content-center align-center">
        <Card class="login-card">
          <template #title>
            <div class="heading text-center">Know Your Data Quotient</div>
          </template>
          <template #content class="p-card-content">
              <div class=" p-2">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                  </span>
                  <InputText v-model="firstName" placeholder="First Name" />
                </div>
                <span class="error pl-2" v-if="firstNamee">Enter firstName</span>
              </div>
              <div class="p-2">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                  </span>
                  <InputText  v-model="lastName" placeholder="Last Name" />
                </div>
                <span class="error pl-2" v-if="lastNamee">Enter lastName</span>
              </div>
              <div class="p-2">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-envelope"></i>
                  </span>
                  <InputText v-model="email" placeholder="Email" />
                </div>
                <span class="error pl-2" v-if="emaile">Enter valid Email</span>
              </div>
              <div class=" p-2">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-building"></i>
                  </span>
                  <InputText v-model="company" placeholder="Company" />
                </div>
                <span class="error pl-3" v-if="codee">Enter valid Code</span>
              </div>
              <div class=" p-2">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-hashtag"></i>
                  </span>
                  <InputText v-model="code" placeholder="Event Code" />
                </div>
              </div>
              <div class=" p-2">
                <Dropdown
                  v-model="selectedCountry"
                  :options="countries"
                  optionLabel="name"
                  optionValue="name"
                  placeholder="Select a country"
                />
            </div>
            <span class="error pl-3" v-if="countrye">Enter valid Country</span>
            <br><br>
            <div class="grid">
              <div class="col-12 md:col-12 w-full pt-1">
                <Button @click="redirect()" label="Submit" class="p-button-raised" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </template>
  
  <script>
  import Card from "primevue/card";
  import InputText from "primevue/inputtext";
  import Dropdown from "primevue/dropdown";
  import Button from "primevue/button";
  import { countrynames } from '../countries'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import { useStore } from 'vuex'
  import { useToast } from "primevue/usetoast";
  import Toast from "primevue/toast";
  import { reactive, ref, toRefs } from "vue";
  export default {
    components: {
      Card,
      InputText,
      Dropdown,
      Button,
      Toast,
    },
    setup() {
      let link = [
        "https://dqassessment.heptagon.tech/heptagon.svg",
      ];
      const countries = ref(countrynames);
      const store = useStore()
      const toast = useToast()
      const errors =  reactive({
        emaile: false,
        firstNamee: false,
        lastNamee: false,
        countrye: false,
        companye: false,
      })
      const router = useRouter()
        const state = reactive({
          firstName: "",
          lastName:"",
          email:"",
          company:"",
          selectedCountry:"",
          code:""
        })
      let redirect = async () => {
        if(state.firstName === "") {
          errors.firstNamee = true
        }
        else {
          errors.firstNamee = false
        }
        if(state.lastName === "") {
          errors.lastNamee = true
        }
        else {
          errors.lastNamee = false
        }
        if(state.email === "") {
          errors.emaile = true
        }
        else {
          errors.emaile = false
        }
         if(state.company === "") {
          errors.companye = true
        }
        else {
          errors.companye = false
        }
        if(state.selectedCountry === "") {
          errors.countrye = true
        }
        else if(state.selectedCountry !== "") {
          errors.countrye = false
        if(state.code === "") {
          state.code = "GENERAL-2"
        }
        try {
        let res = await axios.post('user/register', state)
        let id = res.data._id
        store.dispatch('storeId', id)
        let user = {
          email: state.email,
          company: state.company,
          name: state.firstName
        }
        store.dispatch("storeUserObj", user)
        router.push('/assesment')
        errors.firstNamee = false
        errors.lastNamee = false
        errors.emaile = false
        errors.companye = false
        errors.countrye = false
        } catch(e) {
          toast.add({
                severity: "info",
                summary: "Email already in use",
                life: 6000, 
              });
          state.firstName = ""
          state.lastName = ""
          state.company = ""
          state.code = ""
          state.email = ""
        }
        }
      }
      return { link, countries, ...toRefs(state),  ...toRefs(errors), redirect};
    },
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
  .p-button {
    padding: 0.5rem 2rem !important;
  }
  .heading , .p-button-raised{
    font-family: "Raleway", sans-serif !important;
  }
  .logo {
    height: 60px !important;
    z-index: 999 !important;
  }
  .login-card {
    background: white;
    min-width: 35vw;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  .align-center {
    min-height: calc(100vh - 100px);
  }
  .background {
     background-color: rgba(241, 237, 246, 0.818);
     min-height: 100vh;
  }
  .p-inputtext {
      font-size: 1.2rem !important;
  }
  .p-button {
    font-size: 1.2rem !important;
    padding: 0.5rem 2rem;
  }
  
  .w-full {
    align-items: center;
    justify-content: center;
    align-content: center;
    display: flex;
  }
  .p-dropdown {
    width: 35vw;
    font-size: 1.2rem !important;
  }
  .heading {
    font-size: 1.8rem !important;
  }
  .error {
    color: red;
  }
  </style>