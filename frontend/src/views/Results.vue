<template>
  <div class="background">
    <div v-if="!hideContent" class="flex align-items-start flex-wrap">
      <div class="margin-left">
        <img :src="link[0]" class="logo" alt="" />
      </div>
    </div>
    <div id="report">
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
                {{ score }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="align-items-center flex justify-content-center">
        <Knob v-model="score" :valueColor="color" :size="200" readonly />
      </div>
      <div class="persona-header">Persona Definition</div>
      <div class="align-items-center flex justify-content-center align-center">
        <div>
          <div class="grid">
            <div class="md:col-6 col-12">
              <div class="info-box">
                <div class="heading">Data Explorer</div>
                <p class="information">
                  Your daily job involves working with some numbers. You
                  occasionally use tool like excel sheet to create
                  surveys/lists/reports etc. You share data inputs to others and
                  the quality of that data is important for the department You
                  often hear terms like “Big Data” “Analytics” “Insights” etc
                  and curious to update yourself. You want to know how you can
                  become more efficient and avoid reworks in tasks involving
                  data
                </p>
              </div>
            </div>
            <div class="md:col-6 col-12">
              <div class="info-box-l">
                <div class="heading">Data Operator</div>
                <p class="information">
                  A significant part of your work involves collecting/collating
                  data from different sources. You may work with sources like
                  CRM / HRM / Supply ERP / Surveys etc. You make reports which
                  is then used by you or mostly by someone else for further
                  analysis. You make these data sheets in excel and often have a
                  set calendar to share with others
                </p>
              </div>
            </div>
          </div>
          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="info-box">
                <div class="heading">Data Interpreter</div>
                <p class="information">
                  Your work involves reading various data tables / reports /
                  graphs / dashboards. You often are looking at solving tactical
                  problems in business. You generate reports describing What has
                  happened in your line of work From a given data set you often
                  try to identify what is causing a trend and come up with call
                  to action / suggestions / recommendations based on your
                  analysis
                </p>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="info-box-l">
                <div class="heading">Data Influencer</div>
                <p class="information" id="lastp">
                  Your daily job involves working with some numbers. You
                  occasionally use tool like excel sheet to create
                  surveys/lists/reports etc. You share data inputs to others and
                  the quality of that data is important for the department You
                  often hear terms like “Big Data” “Analytics” “Insights” etc
                  and curious to update yourself. You want to know how you can
                  become more efficient and avoid reworks in tasks involving
                  data
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="things-to-do-header">Things to Improve your DQ Score</div>
    <div class="grid">
      <div class="col">
        <div class="sub-box-l">
          <div class="sub-header">Data Literacy</div>
          <div class="sub-para">
            Build your foundations and familiarize yoruself with the key
            terminologies associated with Data
          </div>
        </div>
      </div>
      <div class="col">
        <div class="sub-box">
          <div class="sub-header">Data Analytics</div>
          <div class="sub-para">
            Learn how to use the right tools to to mining insights from data
          </div>
        </div>
      </div>
      <div class="col">
        <div class="sub-box">
          <div class="sub-header">Data Visualisation</div>
          <div class="sub-para">Learn the art of presenting data visually.</div>
        </div>
      </div>
      <div class="col">
        <div class="sub-box">
          <div class="sub-header">Data 2 insights</div>
          <div class="sub-para">
            Learn the art of connecting the data from data to information,
            information to insights and insights to actions
          </div>
        </div>
      </div>
      <div class="col">
        <div class="sub-box-r">
          <div class="sub-header">Data Story telling</div>
          <div class="sub-para">
            learn how to use data and influence decisions by presenting insights
            in a compelling way
          </div>
        </div>
      </div>
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
    let color = ref("");
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
      color.value = "Blue"
      let user = store.getters.getUserObj;
      userObj.email = user.email;
      userObj.company = user.company;
      userObj.name = user.name;
    });
    const redirect = () => {
      router.push("/template");
    };
    return { link, redirect, userObj, score, color, hideContent };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
* {
  font-family: "Raleway", sans-serif;
}
.sub-header {
  font-size: 25px;
  margin-bottom: 15px;
  padding-left: 15px;
  padding-top: 15px;
}
.sub-para {
  font-size: 20px;
  padding-left: 15px;
}
.sub-box,
.sub-box-r,
.sub-box-l {
  background: rgb(227, 227, 244);
  height: 300px;
  margin-bottom: 5vh;
}
.my-button {
  padding: 10px 40px !important;
  font-size: 20px;
  margin-bottom: 5vh;
}
.sub-box-r {
  margin-right: 2vw;
}
.sub-box-l {
  margin-left: 2vw;
}
.persona-header,
.things-to-do-header {
  margin-left: 5vw;
  margin-bottom: 5vh;
  font-size: 35px;
  color: blue;
  font-weight: 800;
}
#lastp {
  margin-bottom: 10px;
}
.header {
  background: blue;
  margin: 30px 55px;
  padding: 5vh 5vw;
}
.info-box,
.info-box-l {
  background-color: rgb(227, 227, 244);
  padding-bottom: 5vh;
}
.info-box {
  margin-left: 2vw;
}
.info-box-l {
  margin-right: 2vw;
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
.heading {
  padding-top: 5vh;
  text-align: center;
  font-size: 30px;
  padding-bottom: 15px;
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
.information {
  margin-left: 5vw;
  margin-right: 5vw;
  font-size: 25px;
  padding-bottom: 15px;
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
.align-center {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.head {
  text-align: center;
  color: rgb(26, 26, 138);
  font-weight: 900;
  font-size: 35px;
  margin-bottom: 20px;
}
a {
  text-decoration: none;
  color: inherit;
}

.cta,
.cta-back {
  position: relative;
  margin: auto;
  padding: 19px 22px;
  transition: all 0.2s ease;
}
.cta:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 28px;
  background: rgba(10, 217, 240, 0.9);
  width: 56px;
  height: 56px;
  transition: all 0.3s ease;
}
.cta-back:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  border-radius: 28px;
  background: rgba(10, 217, 240, 0.9);
  width: 56px;
  height: 56px;
  transition: all 0.3s ease;
}
.cta span,
.cta-back span {
  position: relative;
  font-size: 14px;
  line-height: 18px;
  font-weight: 900;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  vertical-align: middle;
}
.cta svg,
.cta i {
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #111;
  stroke-width: 2;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}
.cta:hover:before,
.cta-back:hover:before {
  width: 100%;
  background: lightblue;
}
.cta:hover svg,
.cta-back i {
  transform: translateX(0);
}
.cta:active,
.cta-back:active {
  transform: scale(0.96);
}
@media( min-resolution: 150dpi) {
  .information {
    font-size: 15px;
  }
  .sub-header {
      font-size: 25px
  }
  .sub-para {
    font-size: 15px;
  }
  .header-one,.header-two,.header-three {
    font-size: 30px;
  }
}
</style>
