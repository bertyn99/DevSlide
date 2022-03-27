<template>
  <transition name="slide">
    <div class="carrousel_slide">
      <slot />
    </div>
  </transition>
</template>

<style lang="scss">
.slide-enter-active,
.slide-leave-active{
  transition:  opacity 0.7s ease-in-out;
}

.slide-enter-form,
.slide-leave-to{
  opacity:0;
}

.carrousel_slide{
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  max-height: 100%;
  height:100%;
}
</style>