<template>
  <div class="align-items-center flex justify-content-center align-center">
    <ProgressSpinner />
  </div>
</template>

<script>
import ProgressSpinner from "primevue/progressspinner";
import {  PDFDocument } from "pdf-lib";
import { onMounted } from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  components: {
    ProgressSpinner,
  },
  setup() {
    onMounted(async () => {
      const router = useRouter();
      const store = useStore();
      const url = "https://hept-data.herokuapp.com/Data_Explorer_2.pdf";
      const imageUrl = "https://hept-data.herokuapp.com/dot.png"
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer()
      );
      const pngImageBytes = await fetch(imageUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pngImage = await pdfDoc.embedPng(pngImageBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      console.log(width);
      let x = store.getters.getCatOneScore
      let y = store.getters.getCatTwoScore
      console.log(x,y)
      firstPage.drawImage(pngImage, {
        x: width - width/2.40 + width/40 * 2.25 * x,
        y: height - height / 1.97 + height/50 * 2 * y,
        width: 40,
        height: 40,
      });
      const pdfBytes = await pdfDoc.save();
      require("downloadjs")(pdfBytes, "Results.pdf", "application/pdf");
      router.go(-1)
    });
  },
};
</script>

<style scoped>
.align-center {
  height: 100vh;
}
</style>
