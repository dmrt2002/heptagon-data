<template>
  <div class="main">
    <Toast position="top-right" />
    <div class="grid">
      <div class="col-12 md:col-3">
        <div class="ml-1 mt-1">
        <img :src="link[0]" class="logo" alt="" />
      </div>
      </div>
      <div class="col-12 md:col-9">
        <h1 class="center-text">Data Assessment</h1>
      </div>
    </div>
    <h3 class="sub-header">Data Availability </h3>
    <div v-for="question in Questions_1" :key="question._id" class="questions">
      <div class="question border">
        {{ question._id }}. &nbsp;{{ question.question }}
      </div>
      <div class="grid mt-2">
        <div class="col-4">
          <div class="grid">
            <div class="col-2 col-offset-4 md:col-offset-5 md:col-1">
              <input type="radio"
                @click="selectOne(question._id, 1)"
                value="1"
                v-model="selectedOption[question._id]"
              />
            </div>
            <div class="col-6">
              <label>Yes</label>
            </div>
          </div>
        </div>
        <div class="col-4 md:col-2">
          <div class="grid">
            <div class="col-2 col-offset-4 md:col-offset-4 md:col-2">
              <input type="radio"
                @click="selectOne(question._id, 0)"
                value="0"
                v-model="selectedOption[question._id]"
              />
            </div>
            <div class="col-6">
              <label>No</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 class="sub-header">Data Availability </h3>
    <div v-for="question in Questions_2" :key="question._id" class="questions">
      <div class="question border">
        {{ question._id }}. &nbsp;{{ question.question }}
      </div>
      <div class="grid mt-2">
        <div class="col-4">
          <div class="grid">
            <div class="col-2 col-offset-4 md:col-offset-5 md:col-1">
              <input type="radio"
                @click="selectTwo(question._id, 1)"
                value="1"
                v-model="selectedOption[question._id]"
              />
            </div>
            <div class="col-6">
              <label>Yes</label>
            </div>
          </div>
        </div>
        <div class="col-4 md:col-2">
          <div class="grid">
            <div class="col-2 col-offset-4 md:col-offset-4 md:col-2">
              <input type="radio"
                @click="selectTwo(question._id, 0)"
                value="0"
                v-model="selectedOption[question._id]"
              />
            </div>
            <div class="col-6">
              <label>No</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="align-items-center flex justify-content-center">
      <Button
        @click="redirect()"
        label="Submit"
        class="mb-4 pi-button-lg"
      />
    </div>
  </div>
</template>

<script>
import Questions from "../AssesmentTwo";
import Button from "primevue/button"
import { useRouter } from 'vue-router'
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { useStore } from 'vuex'
export default {
  components: {
    Button,
    Toast
  },
  setup() {
    let link = [
      "https://dqassessment.heptagon.tech/heptagon.svg",
    ];
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    let Questions_1 = Questions.slice(0, 5);
    let Questions_2 = Questions.slice(5, 10);
    const answerSheetOne = ref([]);
    const answerSheetTwo = ref([]);
    let countOne = 0;
    let countTwo = 0;
    const selectOne = (question, val) => {
      answerSheetOne.value[question] = val;
    };
    const selectTwo = (question, val) => {
      answerSheetTwo.value[question] = val;
    };
    const redirect = () => {
      if(answerSheetOne.value.length < 5 || answerSheetTwo.value.length < 5) {
        toast.add({
        severity: "error",
        summary: "Please attend all the questions",
        life: 3000,
      });
      }
      else {
        for(let answer of answerSheetOne.value) {
            if(answer == 1) {
                countOne = countOne + 1
            }
        }
        for(let answer of answerSheetTwo.value) {
            if(answer == 1) {
                countTwo = countTwo + 1
            }
        }
        store.dispatch('updateCatOneScore', countOne)
        store.dispatch('updateCatTwoScore', countTwo )
        router.push('/assesmentresults')
      }
    }
    const selectedOption = ref([]);
    return {
      link,
      Questions,
      selectedOption,
      selectOne,
      selectTwo,
      Questions_1,
      Questions_2,
      redirect
    };
  },
};
</script>

<style scoped>
* {
  overflow-x: hidden;
}
.logo {
  height: 60px;
}

.center-text {
  text-align: left;
  margin-left: 18vw;
  margin-top: 1.25rem;
  font-size: 24px;
  color: blue;
}
@media (max-width:768px) {
  .logo {
    height: 50px;
  }
  .center-text {
    text-align: center;
    font-size: 1.4em;
    margin-left: 0;
  }
}
.border {
  margin-left: 6vw;
  font-size: 18px;
}
.p-radiobutton {
  display: block !important;
}
.sub-header {
  margin-left: 3vw;
  margin-bottom: 1vw;
  color: blue;
}
</style>
