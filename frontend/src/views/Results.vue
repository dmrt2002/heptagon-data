<template>
  <div class="background">
    <div v-if="!hideContent" class="flex align-items-start flex-wrap">
      <div class="margin-left">
        <img :src="link[0]" class="logo" alt="" />
      </div>
    </div>
      <div class="header">
        <div class="grid">
          <div class="md:col-8 col-12">
            <h2 class="header-two">
              {{ userObj.name }}
            </h2>
            <h3 class="header-one">
              {{ userObj.email }}
            </h3>
            <h3 class="header-three">
              {{ userObj.company }}
            </h3>
          </div>
          <div class="md:col-4 col-12">
            <div class="box">
              <div class="score">
                <div class="on-top">
                  DQ Score
                </div>
                <div class="score-board">
                  {{ score }}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="instruction">
      Click here to download the Learning Path Report
    </div>
    <div class="align-items-center flex justify-content-center">
      <Button
        @click="redirect()"
        label="Download Pdf"
        iconPos="right"
        class="my-button pi-button-lg"
        icon="pi pi-download"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Button from "primevue/button";
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "@vue/runtime-core";
export default {
  components: {
    Button,
  },
  props: ["admin"],
  setup(props) {
    let store = useStore();
    let score = ref(null);
    let propValue = ref(props.admin);
    let hideContent = ref(null);
    const router = useRouter();
    let options = store.getters.getOptions;
    const userObj = reactive({
      email: "",
      company: "",
      name: "",
    });
    const count = {};
    let link = [
      "https://raw.githubusercontent.com/dmrt2002/images/696ad09814061b0a6d1ff1653ac680969870b760/heptagon.svg",
    ];
    if (propValue.value == "true") {
      hideContent.value = true;
    }
    onMounted(async () => {
      if (propValue.value !== "true") {
        for (const element of options) {
          if (count[element]) {
            count[element] += 1;
          } else {
            count[element] = 1;
          }
        }
        for (let i = 1; i <= 4; i++) {
          if (count[i]) {
            score.value = score.value + count[i] * i;
          }
        }
        score.value = Math.ceil((score.value / 40) * 100);
        store.dispatch('updateScore', score.value)
        let param = {
          id: store.getters.getId,
          score: score.value,
        };
        axios.post("/user/updateScore", param);
      } else {
        let param = {
          id: store.getters.getId,
        };
        console.log(param.id)
        let res = await axios.post(
          "/user/getScore",
          param
        );
        score.value = res.data;
        store.dispatch("updateScore", score.value)
      }
      let user = store.getters.getUserObj;
      userObj.email = user.email;
      userObj.company = user.company;
      userObj.name = user.name;
    });
    const redirect = () => {
      router.push("/template");
    };
    return { link, redirect, userObj, score, hideContent };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
* {
  font-family: "Raleway", sans-serif;
}

.my-button {
  padding: 10px 40px !important;
  font-size: 20px;
  margin-bottom: 5vh;
}
#lastp {
  margin-bottom: 10px;
}
.header {
  background: #1850CF;
  margin: 30px 55px;
  padding: 5vh 5vw;
}
.score {
  color: black;
  text-align: center;
  font-size: 50px;
}
.box {
  background: whitesmoke;
  padding-top: 5vh;
  padding-bottom: 5vh;
  border-radius: 20px;
}
@media (min-width: 768px) {
  #grid-box {
    margin-left: 18vw;
    grid-gap: 2vw;
  }
}
.on-top {
  font-size: 30px;
  position: relative;
  bottom: 20px;
  font-weight: 900;
  color: #1850CF;
}
.instruction {
  text-align: center;
  font-size: 30px;
  margin-bottom: 5vh;
  color: #1850CF;
  font-weight: 800;
}
.score-board {
  color: #1850CF;
}
.header-one,
.header-two,
.header-three {
  text-align: left;
  font-weight: 900;
  padding-bottom: 5px;
  color: white;
}
@media (min-width: 768px) {
  .header-one,
  .header-two,
  .header-three {
    font-size: 35px;
    padding-left: 50px;
  }
}
.header-two {
  padding-top: 10px;
}
.header-three {
  padding-bottom: 10px;
}

.background {
  background-color: rgba(241, 237, 246, 0.818);
  min-height: 100vh;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}

.logo {
  height: 60px !important;
}
a {
  text-decoration: none;
  color: inherit;
}
@media( min-resolution: 150dpi) {
  .header-one,.header-two,.header-three {
    font-size: 30px;
  }
}
</style>
