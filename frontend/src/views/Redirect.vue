<template>
  <div class="align-items-center flex justify-content-center align-center">
    <ProgressSpinner />
  </div>
</template>

<script>
import ProgressSpinner from "primevue/progressspinner";
import { useStore } from "vuex";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useRouter } from "vue-router";
export default {
  components: {
    ProgressSpinner,
  },
  setup() {
    let store = useStore();
    const router = useRouter();
    let color = ref("");
    let score = ref(null);
    const userObj = reactive({
      email: "",
      company: "",
      name: "",
    });
    let link = [
      "https://dqassessment.heptagon.tech/heptagon.svg",
    ];
    score.value = store.getters.getScore;
    color.value = "Blue";
    const savePdf = async () => {
      const url = "https://hept-data.herokuapp.com/Data_Explorer.pdf";
      const imageUrl =
        "data:image/png;base64,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";
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer()
      );
      const pngImageBytes = await fetch(imageUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pngImage = await pdfDoc.embedPng(pngImageBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      firstPage.drawText(userObj.name, {
        x: width / 10,
        y: height - height / 9,
        size: 36,
        font: helveticaFont,
        color: rgb(0.953, 0.954, 0.955),
        rotate: degrees(0),
      });
      firstPage.drawText(userObj.email, {
        x: width / 10,
        y: height - height / 7.25,
        size: 32,
        font: helveticaFont,
        color: rgb(0.953, 0.954, 0.955),
        rotate: degrees(0),
      });
      firstPage.drawText(userObj.company, {
        x: width / 10 ,
        y: height - height / 6.2,
        size: 28,
        font: helveticaFont,
        color: rgb(0.953, 0.954, 0.955),
        rotate: degrees(0),
      });
      firstPage.drawImage(pngImage, {
        x: width/12.5 + width * 1/124.5 * score.value,
        y: height - height / 3.65,
        width: 40,
        height: 40,
      });
      firstPage.drawText("You are Here", {
        x: width/12.5 + width * 1/124.5 * score.value - 0.10 * width,
        y: height - height / 3.8,
        size: 18,
        font: helveticaFont,
        color: rgb(0, 0, 1),
        rotate: degrees(0),
      });
      let num = score.value;
      let text = num.toString();
      firstPage.drawText(text, {
        x: width / 1.48,
        y: height - height / 6.65,
        size: 55,
        font: helveticaFont,
        color: rgb(0, 0, 1),
        rotate: degrees(0),
      });
      const pdfBytes = await pdfDoc.save();
      require("downloadjs")(pdfBytes, "Results.pdf", "application/pdf");
      router.go(-1)
    };
    onMounted(async () => {
      let user = store.getters.getUserObj;
      userObj.email = user.email;
      userObj.company = user.company;
      userObj.name = user.name;
      savePdf();
    });
    return { link, savePdf, userObj, score, color };
  },
};
</script>

<style scoped>
.align-center {
  height: 99vh;
}
</style>
