<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
console.log(router);
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <nav class="navBarMain">
    <h1>DevSlide</h1>
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="homeIcon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </button>
  </nav>

  <router-view />
</template>

<style lang="scss">
@import "./assets/style/main.scss";
</style>

<script>
function goToHome() {
  this.$router.push("/");
}
</script>
