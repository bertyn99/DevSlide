<template>
  <Carrousel
    v-slot="{ currentSlide }"
    @changeSlide="getChangeSLide"
    :getSlideCount="nbSlide"
  >
    <div v-html="st"></div>
    <CarrouselSlide
      v-for="(n, i) in slides"
      :key="n + i"
      v-show="currentSlide == i"
    >
      <section v-html="n"></section>
    </CarrouselSlide>
  </Carrousel>
</template>

<script setup>
import { onMounted, ref, computed, inject } from "vue";
import Carrousel from "../components/carrousel/index.vue";
import CarrouselSlide from "../components/carrousel/Slide.vue";

const { state, setStateProp } = inject("state");
state.listPres;
let page = ref(0);
let slides = ref([]);
let stringStyle = ref("");
let st = computed(() => {
  return (stringStyle.value = !""
    ? stringStyle.value.replace(/^/, "<style>").replace(/$/, "</style>")
    : "");
});

const nbSlide = computed(() => slides.value.length);
function getChangeSLide(slide) {
  page.value = slide;
}

async function loadFilePrez() {
  try {
    //load markdown
    let markdown = await window.api.getContentFile(state.currentPres, "md");

    let tmp = await window.api.splitSlide(markdown);
   for (const slide of tmp) {
     let transformSlide=await window.api.replaceUrlAssetsSlide(slide, state.currentPres)
  
      slides.value.push(
        window.api.markedDownToHtml(transformSlide)    
      );
   }
    // slides.value= tmp.map(elm=>window.api.markedDownToHtml(elm)) */
    //
    //load css
    stringStyle.value = await window.api.getContentFile(
      state.currentPres,
      "css"
    );
    //load config
    let config = await window.api.getContentFile(state.currentPres, "json");
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await loadFilePrez();
});
</script>
