<template>
  <div class="align-items-center flex justify-content-center fadein animation-duration-1500 align-center">
    <div>
      <div class="question-number text-center">
        <span>0</span><span class="padding-a">{{ n }}</span>
      </div>
      <div class="align-items-center flex justify-content-center">
        <img class="img-fluid" :src="imageUrl" alt="" />
      </div>
      <h1 class="text-center q-size">{{ currentquestion }}</h1>
      <div class="field-radiobutton center-item">
        <RadioButton id="city1" name="city" value="1" v-model="city" @click="select" />
        <label for="city1" class="options">{{ option1 }}</label>
      </div>
      <div class="field-radiobutton center-item" >
        <RadioButton id="city2" name="city" value="2" v-model="city" @click="select"/>
        <label for="city2" class="options">{{ option2 }}</label>
      </div>
      <div class="field-radiobutton center-item">
        <RadioButton id="city3" name="city" value="3" v-model="city" @click="select"/>
        <label for="city3" class="options">{{ option3 }}</label>
      </div>
      <div class="field-radiobutton center-item" >
        <RadioButton id="city4" name="city" value="4" v-model="city" @click="select"/>
        <label for="city4" class="options">{{ option4 }}</label>
      </div>
  <div class="align-items-center flex justify-content-center">
    <Button
      @click="submit()"
      label="Next"
      class="p-button-raised"
    />
  </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import { ref } from "vue";
import questions from "../questions";
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
    let selected = ref(false)
    let n = ref(store.getters.getQuestion);
    if (n.value === 11) {
      router.push("/results");
    }
    const city = ref();
    let select = () => {
      selected.value = true
    }
    let currentquestion = questions[n.value - 1].question;
    let option1 = questions[n.value - 1].options[0].optText;
    let option2 = questions[n.value - 1].options[1].optText;
    let option3 = questions[n.value - 1].options[2].optText;
    let option4 = questions[n.value - 1].options[3].optText;
    let imageUrl = questions[n.value - 1].imageUrl;
    let submit = () => {
      let value = city.value;
      store.dispatch("saveOption", value);
      context.emit("submit", value);
    };
    let back = () => {
      context.emit("back")
    }
    return {
      currentquestion,
      city,
      option1,
      option2,
      option3,
      option4,
      submit,
      n,
      imageUrl,
      back,
      select,
      selected
    };
  },
};
</script>

<style scoped>
.align-center {
  min-height: calc(100vh - 100px);
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
  height: 200px;
}
.options {
  font-size: 24px;
  margin-top: 10px;
}

</style>
