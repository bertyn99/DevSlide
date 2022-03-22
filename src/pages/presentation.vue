<template>
  <Carrousel @changeSlide="getChangeSLide" :getSlidesCount="nbSlide">
    <Slide v-for="(n, i) in slides" :key="n" v-show="currentSlide == n">
      {{ n }}{{ i }}
    </Slide>
  </Carrousel>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Carrousel from "../components/carrousel/index.vue";
import CarrouselSlide from "../components/carrousel/Slide.vue";

let page = ref(0);
let slides = ref(["slide ", "slide ", "slide "]);

const nbSlide = computed(() => slides.value.length);
function getChangeSLide(slide) {
  page.value = slide;
}
</script>
