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
          <div class="heading text-center">Login</div>
        </template>
        <template #content class="p-card-content">
          <div class="p-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-envelope"></i>
              </span>
              <InputText v-model="email" placeholder="Email" />
            </div>
            <span class="error pl-2" v-if="emaile">Enter valid Email</span>
          </div>
          <div class="p-2 center">
            <Password v-model="password" :feedback="false"> </Password>
          </div>
          <span class="error pl-3" v-if="passworde">Invalid Password</span>
          <span class="error pl-3 hover-effect" v-if="reset" @click="openConfirmation"
            >Reset Password</span
          >
          <span class="error pl-3 hover-effect" v-if="registerErr" @click="redirectRegister"
            >Register now</span
          >
          <br /><br />
          <div class="grid">
            <div class="col-12 md:col-12 w-full pt-1">
              <Button
                @click="redirect()"
                label="Submit"
                class="p-button-raised"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
    <Dialog
      header="Enter Valid Email"
      v-model:visible="displayConfirmation"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content">
        <InputText v-model="resetEmail" placeholder="Email" />
      </div>
      <template #footer>
        <Button
          label="Submit"
          icon="pi pi-check"
          @click="resetPass"
          class="p-button-text"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import axios from "axios";
import Dialog from "primevue/dialog";
import { reactive, ref, toRefs } from "vue";
export default {
  components: {
    Card,
    InputText,
    Password,
    Button,
    Toast,
    Dialog,
  },
  setup() {
    const toast = useToast();
    const displayConfirmation = ref(false);
    const reset = ref(false);
    let registerErr = ref(false)
    const resetEmail = ref("")
    let link = [
      "https://dqassessment.heptagon.tech/heptagon.svg",
    ];
    const errors = reactive({
      emaile: false,
      passworde: false,
    });
    const router = useRouter();
    const state = reactive({
      email: "",
      password: "",
    });
    let redirect = async () => {
      if (state.email === "") {
        errors.emaile = true;
      } else {
        errors.emaile = false;
      }
      if (state.password === "") {
        errors.passworde = true;
      } else {
        errors.passworde = false;
        try {
          let res = await axios.post("/user/login", state);
          if (res.status !== 401) {
            router.push("/landingpage");
          }
          errors.passworde = false;
          errors.emaile = false;
        } catch (e) {
          if (e.response.status === 401) {
            toast.add({
              severity: "error",
              summary: "Invalid credentials",
              life: 6000,
            });
            reset.value = true;
          } else {
            registerErr.value = true
            toast.add({
              severity: "info",
              summary: "Email not Registered",
              life: 6000,
            });
          }
        }
      }
    };
    const openConfirmation = () => {
      displayConfirmation.value = true;
    };
    const resetPass = async() => {
      let param = {
        email: resetEmail.value
      }
      let res = await axios.post("/user/resetPassword", param)
      if(res.status == 200) {
            toast.add({
              severity: "info",
              summary: "Password sent to mail sucessfully",
              life: 6000,
            });
             displayConfirmation.value = false;
      }
    }
    const redirectRegister = () => {
      router.push("/")
    }
    return {
      link,
      ...toRefs(state),
      ...toRefs(errors),
      redirect,
      reset,
      displayConfirmation,
      openConfirmation,
      resetEmail,
      resetPass,
      registerErr,
      redirectRegister
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
.p-button {
  padding: 0.5rem 2rem !important;
}
.heading,
.p-button-raised {
  font-family: "Raleway", sans-serif !important;
}
.logo {
  height: 60px !important;
  z-index: 999 !important;
}
.hover-effect {
  cursor: pointer;
}
::v-deep(.p-password input) {
  width: 30vw;
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
.p-input-icon-right > .p-inputtext {
  padding-left: 120px !important;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
