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
        <div class="align-items-center flex justify-content-center">
          <img class="img-fluid ml-2" :src="require(`../assets/${url}`)" alt="" />
        </div>
        <h1 class="head">{{ title }}</h1>
        <p class="text-align font-bold">{{ text }}</p>
        <div class="align-items-center flex justify-content-center">
            <a :href="`https://hept-data.herokuapp.com//${pdfUrl}`" download="pathway.pdf" class="cta cursor-pointer">
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
export default {
  setup() {
    let store = useStore();
    let options = store.getters.getOptions;
    let length = options.length;
    console.log(options)
    let link = [
      "https://raw.githubusercontent.com/dmrt2002/images/696ad09814061b0a6d1ff1653ac680969870b760/heptagon.svg",
    ];
    const mostFrequent = (arr, n) => {
      arr.sort();

      // find the max frequency using linear
      // traversal
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
    let url = images[0].options[imageId - 1].imageUrl;
    let text = images[0].options[imageId - 1].text;
    let title = images[0].options[imageId - 1].title
    let pdfUrl = images[0].options[imageId - 1].pdfUrl
    let  publicPath = process.env.BASE_URL
    return { url, text, link, title, pdfUrl, publicPath};
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
* {
  font-family: "Raleway", sans-serif;
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

.text-align {
  margin-left: 20vw;
  margin-right: 20vw;
  margin-bottom: 4em;
  font-size: 16px;
}
.logo {
  height: 60px !important;
}
.align-center {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
}
.center-button {
    font-size: 1.5rem !important;
    margin-bottom: 10px;
}
.head {
  text-align: center;
  color: rgb(26, 26, 138);
  font-weight: 900;
}
a {
  text-decoration: none;
  color: inherit;
}

.cta  , .cta-back {
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
.cta span, .cta-back span {
  position: relative;
  font-size: 14px;
  line-height: 18px;
  font-weight: 900;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  vertical-align: middle;
}
.cta svg, .cta i {
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
.cta:hover:before, .cta-back:hover:before {
  width: 100%;
  background: lightblue;
}
.cta:hover svg, .cta-back i {
  transform: translateX(0);
}
.cta:active , .cta-back:active {
  transform: scale(0.96);
}
</style>
