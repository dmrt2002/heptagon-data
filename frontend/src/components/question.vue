<template>
<div :class="currentClass">
      <div class="flex align-items-start flex-wrap">
      <div class="margin-left">
        <img :src="link[0]" class="logo" alt="" />
      </div>
    </div>
  <div class="grid  fadein animation-duration-2000">
    <div class="col-12 md:col-7 flex align-items-center justify-content-center">
      <img class="img-fluid" :src="imageUrl" alt="" />
    </div>
    <div class="col-12 md:col-5">
      <div class=" align-center">
        <div class="w">
          <div class="text-center text-large text-blue-700 font-bold mb-4"> 0{{ n }}</div>
          <div class="text-center q-size pb-4">{{ currentquestion }}</div>
          <div :class="{ active: option === '1' }" class="field-radiobutton cursor-pointer">
            <RadioButton
              id="city1"
              name="city"
              value="1"
              v-model="option"
              @click="select"
            />
            <label for="city1" class="options cursor-pointer"><span class="font-bold">A</span>.&nbsp;{{ option1 }}</label>
          </div>
          <div :class="{ active: option === '2' }" class="field-radiobutton cursor-pointer">
            <RadioButton
              id="city2"
              name="city"
              value="2"
              v-model="option"
              @click="select"
            />
            <label for="city2" class="options cursor-pointer"> <span class="font-bold">B</span>.&nbsp;{{ option2 }}</label>
          </div>
          <div :class="{ active: option === '3' }" class="field-radiobutton cursor-pointer">
            <RadioButton
              id="city3"
              name="city"
              value="3"
              v-model="option"
              @click="select"
            />
            <label for="city3" class="options cursor-pointer"><span class="font-bold">C</span>.&nbsp;{{ option3 }}</label>
          </div>
          <div :class="{ active: option === '4' }" class="field-radiobutton cursor-pointer">
            <RadioButton
              id="city4"
              name="city"
              value="4"
              v-model="option"
              @click="select"
            />
            <label for="city4" class="options cursor-pointer"><span class="font-bold">D</span>.&nbsp;{{ option4 }}</label>
          </div>
          <div class="flex justify-content-center align-items-center">
            <a  @click="back()" class="cta-back cursor-pointer">
              <span><i class="pi pi-arrow-left"></i> &nbsp;Back</span>
            </a>
            <a  @click="submit()" :class="{ invisible : !option }" class="cta cursor-pointer">
              <span>Next</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </a>
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
import questions from "../questions";
import axios from 'axios'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  props: ["currentQuestion", "opt1", "opt2", "opt3", "opt4"],
  components: {
    RadioButton,
  },
  setup(props, context) {
    let store = useStore();
    let router = useRouter();
    let currentClass = ref(store.getters.getClass)
    let link = [
      "https://raw.githubusercontent.com/dmrt2002/images/696ad09814061b0a6d1ff1653ac680969870b760/heptagon.svg",
    ];
    let selected = ref(false);
    let n = ref(store.getters.getQuestion);
    console.log(n.value)
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
        userId: store.getters.getId
      }
      let res = await axios.post('user/addAnswer', param)
      console.log(res)
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
      currentClass
    };
  },
};
</script>

<style scoped>
.bg-1, .bg-2, .bg-3, .bg-4 , .bg-5 {
  min-height: 100vh;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}
.bg-1 {
  background-color: rgba(241, 237, 246, 0.818);
}
.bg-2 {
  background-color: rgb(245, 245, 225);
}
.bg-3 {
  background-color: rgb(227, 245, 225) ;
}
.bg-4 {
  background-color: rgb(240, 216, 240) ;
}
.bg-5 {
  background-color: rgb(243, 232, 217);
}
.logo {
  height: 60px !important;
}
.field-radiobutton {
  padding: 10px;
}
.question-number {
  color: #2130b1;
  font-weight: 900;
  font-size: 5rem;
}
.center-item {
  margin-left: 35vw;
  margin-right: 35vw;
}
@media (max-width: 700px) {
  .center-item {
    margin-left: 10vw;
    margin-right: 10vw;
  }
}
.padding-a {
  padding-top: 5px;
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
.q-size {
  font-size: 25px;
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
@media(min-width:768px) {
.align-center {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
}
}
@media (max-width:768px) {
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

