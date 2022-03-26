<template>
  <Carrousel  v-slot="{ currentSlide }" @changeSlide="getChangeSLide"  :getSlideCount="nbSlide">
    <CarrouselSlide v-for="(n, i) in slides" :key="n+i" v-show="currentSlide == i">
      <div>
        {{ n }}{{ i }}
      </div>
     
    </CarrouselSlide>
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
