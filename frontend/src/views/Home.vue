<template>
  <div class="background">
    <div class="flex align-items-start flex-wrap">
      <div class="margin-left">
        <img :src="link[0]" class="logo" alt="" />
      </div>
    </div>
    <div class="align-items-center flex justify-content-center align-center">
      <Card class="login-card">
        <template #title>
          <div class="heading text-center">Heptagon Technologies</div>
        </template>
        <template #content class="p-card-content">
            <div class=" p-2">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-user"></i>
                </span>
                <InputText placeholder="First Name" />
              </div>
            </div>
            <div class="p-2">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-user"></i>
                </span>
                <InputText placeholder="Last Name" />
              </div>
            </div>
            <div class="p-2">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-envelope"></i>
                </span>
                <InputText placeholder="Email" />
              </div>
            </div>
            <div class=" p-2">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-building"></i>
                </span>
                <InputText placeholder="Company" />
              </div>
            </div>
            <div class=" p-2">
              <Dropdown
                v-model="selectedCountry"
                :options="countries"
                optionLabel="name"
                optionValue="code"
                placeholder="Select a country"
              />
          </div>
          <br>
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
import { ref } from "vue";
export default {
  components: {
    Card,
    InputText,
    Dropdown,
    Button,
  },
  setup() {
    let link = [
      "https://raw.githubusercontent.com/dmrt2002/images/696ad09814061b0a6d1ff1653ac680969870b760/heptagon.svg",
    ];
    const selectedCountry = ref();
    const countries = ref(countrynames);
    const router = useRouter()
    let redirect = () => {
      router.push('/landingpage')
    }
    return { link, countries, selectedCountry, redirect };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
.p-button {
  padding: 0.5rem 2rem !important;
}
* {
  font-family: "Raleway", sans-serif;
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
</style>
