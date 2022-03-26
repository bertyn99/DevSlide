<script setup>
import { ref } from "vue";

const currentSlide = ref(0);
const prop = defineProps({
  getSlideCount: Number,
});
const emits = defineEmits(["changeSlide"]);

function nextSlide() {
  if (currentSlide.value+1 === prop.getSlideCount ) {
    console.log("ici")
    currentSlide.value = 0;
     console.log(currentSlide.value)
    emits("changeSlide", currentSlide.value);
    return;
  }

  currentSlide.value += 1;
  emits("changeSlide", currentSlide.value);
}

function prevSlide() {
  if (currentSlide.value === 0) {
    currentSlide.value = prop.getSlideCount -1;
    emits("changeSlide", currentSlide.value);
    return;
  }

  currentSlide.value -= 1;
  emits("changeSlide", currentSlide.value);
}
</script>

<template>
  <div class="carrousel__container">
    <div class="carrousel_nav">
      <button @click="prevSlide" class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="carrousel_svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        </svg>
      </button>
       <button @click="nextSlide" class="left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="carrousel_svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
    <slot :currentSlide="currentSlide" />
   
  </div>
</template>

<style lang="scss">
.carrousel__container{
  position:relative;
  max-width:100%;
  max-height: calc(100vh - 50px);
  height:100vh;

  .carrousel_nav{
    position:absolute;
    top:50%;
    left:0;
    right:0;
    max-width:100%;
    display: flex;
    justify-content: space-between;

    & button{
      z-index:2;
      cursor: pointer;
      width:2rem;
      background: transparent;
      border:none;
    }
    &.left{
    
   
    }
  }
}
</style>