<template>
  <div class="allPrez">
    <div class="prez-add">
      <h2>View your presentations</h2>
      <button @click="uploadPrez">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="uploadIcon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      </button>
    </div>
    <div class="list-container">
      <div class="prez-items">
        <h1>pres</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
/* const { dialog } = require("electron"); */

function loadPrezInMemory() {}

function uploadPrez() {
  window.api.sayHelloInBrowser();
}
</script>
