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
          <img class="img-fluid ml-2" :src="url" alt="" />
        </div>
        <p class="text-align">{{ text }}</p>
        <div class="align-items-center flex justify-content-center">
          <Button
            @click="submit()"
            label="Download your Learning Pathway"
            class="p-button-raised center-button"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Button from "primevue/button";
import images from "../images";
export default {
  components: {
    Button,
  },
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
    return { url, text, link };
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
.options {
  font-size: 24px;
}
.text-align {
  margin-left: 20vw;
  margin-right: 20vw;
  margin-bottom: 4em;
  font-size: 20px;
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
</style>
