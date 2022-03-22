<template>
  <div class="homePage">
    <div>
      <h1 class="homePage__title"></h1>
    </div>
    <div>
      <CreatePres />
      <ListPres />
    </div>
  </div>
</template>

<script setup>
import CreatePres from "../components/CreatePres.vue";
import ListPres from "../components/ListPres.vue";
</script>
