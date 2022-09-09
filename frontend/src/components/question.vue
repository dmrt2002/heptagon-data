<template>
  <div class="bg-1">
    <div class="flex align-items-start flex-wrap">
      <div class="margin-left">
        <img :src="link[0]" class="logo" alt="" />
      </div>
    </div>
    <div class="grid fadein animation-duration-2000">
      <div
        class="col-12 md:col-7 flex align-items-center justify-content-center"
      >
        <img class="img-fluid" :src="imageUrl" alt="" />
      </div>
      <div class="col-12 md:col-5">
        <div class="align-center">
          <div class="w">
            <div class="text-center text-large text-blue-700 font-bold mb-4">
              0{{ n }}
            </div>
            <div class="text-center q-size pb-4">{{ currentquestion }}</div>
            <div
              :class="{ active: option === '1' }"
              class="field-radiobutton cursor-pointer"
            >
              <RadioButton
                id="city1"
                name="city"
                value="1"
                v-model="option"
                @click="select"
              />
              <label for="city1" class="options cursor-pointer"
                ><span class="font-bold">A</span>.&nbsp;{{ option1 }}</label
              >
            </div>
            <div
              :class="{ active: option === '2' }"
              class="field-radiobutton cursor-pointer"
            >
              <RadioButton
                id="city2"
                name="city"
                value="2"
                v-model="option"
                @click="select"
              />
              <label for="city2" class="options cursor-pointer">
                <span class="font-bold">B</span>.&nbsp;{{ option2 }}</label
              >
            </div>
            <div
              :class="{ active: option === '3' }"
              class="field-radiobutton cursor-pointer"
            >
              <RadioButton
                id="city3"
                name="city"
                value="3"
                v-model="option"
                @click="select"
              />
              <label for="city3" class="options cursor-pointer"
                ><span class="font-bold">C</span>.&nbsp;{{ option3 }}</label
              >
            </div>
            <div
              :class="{ active: option === '4' }"
              class="field-radiobutton cursor-pointer"
            >
              <RadioButton
                id="city4"
                name="city"
                value="4"
                v-model="option"
                @click="select"
              />
              <label for="city4" class="options cursor-pointer"
                ><span class="font-bold">D</span>.&nbsp;{{ option4 }}</label
              >
            </div>
            <div class="flex justify-content-center align-items-center">
              <Button
                @click="back()"
                label="Back"
                class="my-button pi-button-lg"
                icon="pi pi-arrow-left"
              />
              <div  :class="{ invisible: !option }">
              <Button
                @click="submit()"
                label="Next"
                iconPos="right"
                class="my-button pi-button-lg"
                icon="pi pi-arrow-right"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "primevue/radiobutton";
import { ref } from "vue";
import Button from "primevue/button";
import questions from "../questions";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  props: ["currentQuestion", "opt1", "opt2", "opt3", "opt4"],
  components: {
    RadioButton,
    Button,
  },
  setup(props, context) {
    let store = useStore();
    let router = useRouter();
    let link = [
      "https://raw.githubusercontent.com/dmrt2002/images/696ad09814061b0a6d1ff1653ac680969870b760/heptagon.svg",
    ];
    let selected = ref(false);
    let n = ref(store.getters.getQuestion);
    if (n.value === 11) {
      router.push("/results");
    }
    const option = ref();
    let select = () => {
      selected.value = true;
    };
    let currentquestion = questions[n.value - 1].question;
    let option1 = questions[n.value - 1].options[0].optText;
    let option2 = questions[n.value - 1].options[1].optText;
    let option3 = questions[n.value - 1].options[2].optText;
    let option4 = questions[n.value - 1].options[3].optText;
    let imageUrl = questions[n.value - 1].imageUrl;
    let submit = async () => {
      let value = option.value;
      let param = {
        optId: value,
        questionId: n.value,
        userId: store.getters.getId,
      };
      await axios.post("user/addAnswer", param);
      store.dispatch("saveOption", value);
      context.emit("submit", value);
    };
    let back = () => {
      context.emit("back");
    };
    return {
      currentquestion,
      option,
      option1,
      option2,
      option3,
      option4,
      submit,
      n,
      imageUrl,
      back,
      select,
      selected,
      link,
    };
  },
};
</script>

<style scoped>
.bg-1
 {
  min-height: 100vh;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}
.options {
  font-size: 25px;
}
.bg-1 {
  background-color: rgb(244, 242, 246);
}
.logo {
  height: 60px !important;
}
.my-button {
  padding: 10px 40px !important;
  font-size: 20px;
  margin-bottom: 5vh;
  margin-left: 3vw;
}
.field-radiobutton {
  padding: 10px;
}
.img-fluid {
  height: 70vh;
  width: 45vw;
  margin-bottom: 25px;
}
a {
  text-decoration: none;
  color: inherit;
}

.q-size {
  font-size: 35px;
}
.active {
  background: lightblue;
  transition: 2ms;
}
.w {
  width: 30vw;
}
.invisible {
  display: none;
  transition: 2s;
}
@media (min-width: 768px) {
  .align-center {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 100px);
  }
}
@media (max-width: 768px) {
  .w {
    width: 100vw;
  }
  .img-fluid {
    height: 300px;
    width: 300px;
  }
  .grid {
    margin-top: 10px;
  }
}
.text-large {
  font-size: 3rem;
}
</style>
