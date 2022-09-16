<template>
  <div class="background">
    <div class="flex align-items-start flex-wrap">
      <div class="margin-left">
        <img :src="link[0]" class="logo" alt="" />
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-5 align-text-center">
        <h1 class="l-heading md:pl-6 lg:pl-8 pl-2 pr-4">
          Know Your DQ - Data Quotient
        </h1>
        <p class="md:pl-6 lg:pl-8 pl-2 p-text">
          This is an entry level assessment for data literacy. It is designed to
          help a person understand their relative position when it comes to
          understanding Data and Analytics.
        </p>
        <p class="md:pl-6 lg:pl-8 pl-2 p-text">
          Please read each question carefully and choose the best option which
          mirrors your behavior/skills when it comes to dealing with data. The
          final report will be customized basis your inputs and hence any random
          responses may lead to an inaccurate recommendation for you.
        </p>
        <p class="md:pl-6 lg:pl-8 pl-2 p-text" id="lastp">
          Thanks again for taking time out to participate in the DQ survey.
        </p>
        <br />
        <div class="md:pl-6 lg:pl-8 pl-2 mb-2">
          <Button @click="redirect();" label="Next" iconPos="right" class="my-button pi-button-lg" icon="pi pi-arrow-right" />
        </div>
      </div>
      <div class="col-12 md:col-7">
        <div
          class="align-items-center flex justify-content-center align-center"
        >
          <img class="img-fluid" src="../assets/landingpage.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { useStore } from 'vuex'
export default {
  components: {
    Button,
  },
  setup() {
    let store = useStore();

    store.dispatch("updateScore", null);
    store.dispatch('saveQuestion', 1)
    store.dispatch("removeOptions")
    let link = [
      "https://dqassessment.heptagon.tech/heptagon.svg",
    ];
    let router = useRouter();
    const redirect = () => {
      router.push("/questions");
    };
    return { link, redirect };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
* {
  font-family: "Raleway", sans-serif;
}
#lastp {
  padding-bottom: 3vh;
}
.my-button {
  padding: 10px 40px !important;
  font-size: 20px;
}
.background {
  background-color: rgba(241, 237, 246, 0.818);
  min-height: 100vh;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}
.img-fluid {
  width: 100vw;
  height: 60vh;
}

@media (max-width: 768px) {
  .img-fluid {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
}
.align-center {
  min-height: calc(100vh - 100px);
}
.align-text-center {
  margin-top: auto;
  margin-bottom: auto;
}
.p-text {
  font-weight: 800 !important;
  font-size: 25px;
}
.l-heading {
  font-size: 40px !important;
  padding-bottom: 3vh;
  font-weight: 1200 !important;
}
.logo {
  height: 60px !important;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
