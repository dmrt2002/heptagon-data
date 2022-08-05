<template>
  <div class="background">
    <div class="flex align-items-start flex-wrap">
      <div class="margin-left">
        <img :src="link[0]" class="logo" alt="" />
      </div>
    </div>
    <div
      class="align-items-center flex justify-content-center fadein animation-duration-1500 align-center"
    >
      <div>
        <h1 class="text-center main-head">Persona Blend</h1>
        <div class="grid" id="grid-box">
          <div class="md:col-2 col-12 box">
            <img
              :src="require('../assets/explorer.png')"
              alt="Image"
              class="image"
            />
            <div class="text-center persona">Data explorer</div>
            <div class="text-center perc">{{ personas.one }}%</div>
          </div>
          <div class="md:col-2 col-12 box">
            <img
              :src="require('../assets/operator.png')"
              alt="Image"
              class="image"
            />
            <div class="text-center persona">Data operator</div>
            <div class="text-center perc">{{ personas.two }}%</div>
          </div>
          <div class="md:col-2 col-12 box">
            <img
              :src="require('../assets/interpreter.png')"
              alt="Image"
              class="image"
            />
            <div class="text-center persona">Data interpreter</div>
            <div class="text-center perc">{{ personas.three }}%</div>
          </div>
          <div class="md:col-2 col-12 box">
            <img
              :src="require('../assets/influencer.png')"
              alt="Image"
              class="image"
            />
            <div class="text-center persona">Data influencer</div>
            <div class="text-center perc">{{ personas.four }}%</div>
          </div>
        </div>
        <div class="grid">
          <div class="md:col-6 col-12">
            <div class="heading">Data Explorer</div>
            <p class="information">
              Your daily job involves working with some numbers. You
              occasionally use tool like excel sheet to create
              surveys/lists/reports etc. You share data inputs to others and the
              quality of that data is important for the department You often
              hear terms like “Big Data” “Analytics” “Insights” etc and curious
              to update yourself. You want to know how you can become more
              efficient and avoid reworks in tasks involving data
            </p>
          </div>
          <div class="md:col-6 col-12">
            <div class="heading">Data Operator</div>
            <p class="information">
              A significant part of your work involves collecting/collating data
              from different sources. You may work with sources like CRM / HRM /
              Supply ERP / Surveys etc. You make reports which is then used by
              you or mostly by someone else for further analysis. You make these
              data sheets in excel and often have a set calendar to share with
              others
            </p>
          </div>
        </div>
        <div class="grid">
          <div class="col-12 md:col-6">
            <div class="heading">Data Interpreter</div>
            <p class="information">
              Your work involves reading various data tables / reports / graphs
              / dashboards. You often are looking at solving tactical problems
              in business. You generate reports describing What has happened in
              your line of work From a given data set you often try to identify
              what is causing a trend and come up with call to action /
              suggestions / recommendations based on your analysis
            </p>
          </div>
          <div class="col-12 md:col-6">
            <div class="heading">Data Influencer</div>
            <p class="information" id="lastp">
              Your daily job involves working with some numbers. You
              occasionally use tool like excel sheet to create
              surveys/lists/reports etc. You share data inputs to others and the
              quality of that data is important for the department You often
              hear terms like “Big Data” “Analytics” “Insights” etc and curious
              to update yourself. You want to know how you can become more
              efficient and avoid reworks in tasks involving data
            </p>
          </div>
        </div>
        <div class="align-items-center flex justify-content-center">
          <a
            :href="`https://hept-data.herokuapp.com/${pdfUrl}`"
            download="pathway.pdf"
            class="cta cursor-pointer"
          >
            <span>Dowload your learning pathway</span>
            <svg width="13px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import images from "../images";
import axios from "axios";
import { onMounted, reactive } from "@vue/runtime-core";
export default {
  setup() {
    let store = useStore();
    let options = store.getters.getOptions;
    let length = options.length;
    const personas = reactive({
      one: null,
      two: null,
      three: null,
      four: null,
    });
    const count = {};
    let link = [
      "https://raw.githubusercontent.com/dmrt2002/images/696ad09814061b0a6d1ff1653ac680969870b760/heptagon.svg",
    ];
    for (const element of options) {
      if (count[element]) {
        count[element] += 1;
      } else {
        count[element] = 1;
      }
    }
    personas.one = (count[1] / 10) * 100;
    personas.two = (count[2] / 10) * 100;
    personas.three = (count[3] / 10) * 100;
    personas.four = (count[4] / 10) * 100;
    console.log(personas.one);
    const mostFrequent = (arr, n) => {
      arr.sort();
      let max_count = 1,
        res = arr[0];
      let curr_count = 1;

      for (let i = 1; i < n; i++) {
        if (arr[i] == arr[i - 1]) curr_count++;
        else curr_count = 1;

        if (curr_count > max_count) {
          max_count = curr_count;
          res = arr[i - 1];
        }
      }

      return res;
    };
    let imageId = mostFrequent(options, length);
    const title = images[0].options[imageId - 1].title;
    let pdfUrl = images[0].options[imageId - 1].pdfUrl;
    onMounted(async () => {
      let param = {
        userId: store.getters.getId,
        role: title,
      };
      await axios.post("/user/role", param);
    });
    return { link, pdfUrl, personas };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
* {
  font-family: "Raleway", sans-serif;
}
#lastp {
  margin-bottom: 10px;
}
.main-head {
  margin-bottom: 20px;
  font-size: 40px;
}
@media (min-width:768px) {
.box {
  border: solid 1px rgb(13, 13, 13);
  border-radius: 50px;
} 
#grid-box {
  margin-left: 2vw;
  grid-gap: 10vw;
}
}
.persona {
  font-size: 25px;
  font-weight: 800;
  padding-top: 10px;
}
.perc {
  font-size: 25px;
  padding-top: 10px;
}
.heading {
  padding-top: 5vh;
  text-align: center;
  font-size: 35px;
  padding-bottom: 15px;
}

.information {
  margin-left: 5vw;
  margin-right: 5vw;
  font-size: 20px;
  padding-bottom: 15px;
}

.background {
  background-color: rgba(241, 237, 246, 0.818);
  min-height: 100vh;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}
.img-fluid {
  height: 200px;
  margin-bottom: 4em;
}
.image {
  width: 15vw;
  height: 200px;
}

@media (max-width: 768px) {
  .image {
    width: 75vw;
    margin-top: 10px;
  }
}
.text-center {
  text-align: left;
}
.p-tag {
  font-size: 25px;
}
.text-align {
  margin-left: 20vw;
  margin-right: 20vw;
  margin-bottom: 4em;
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
.center-button {
  font-size: 1.5rem !important;
  margin-bottom: 10px;
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
</style>
