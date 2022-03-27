<template>


  <Carrousel  v-slot="{ currentSlide }" @changeSlide="getChangeSLide"  :getSlideCount="nbSlide">
    <CarrouselSlide v-for="(n, i) in slides" :key="n+i" v-show="currentSlide == i">
      <div v-html="n">
      
      </div>
     
    </CarrouselSlide>
  </Carrousel>
</template>

<script setup>
import { onMounted, ref, computed,inject } from "vue";
import Carrousel from "../components/carrousel/index.vue";
import CarrouselSlide from "../components/carrousel/Slide.vue";


const { state, setStateProp } = inject("state");
state.listPres;
let page = ref(0);
let slides = ref([]);

const nbSlide = computed(() => slides.value.length);
function getChangeSLide(slide) {
  page.value = slide;
}

async function loadFilePrez(){
 try {
   //load arkdown
  let markdown= await window.api.getContentFile(state.currentPres,'md')
  
  let tmp=await window.api.splitSlide(markdown)
  slides.value= tmp.map(elm=>window.api.markedDownToHtml(elm))
 //load css
  let style=await window.api.getContentFile(state.currentPres,'css')

  //load config
  let config=await window.api.getContentFile(state.currentPres,'json')

 } catch (error) {
   console.log(error)
 }

} 


onMounted(async ()=>{

  await loadFilePrez()
})
</script>
