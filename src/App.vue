<script setup>
import Footer from '@/components/layout/FooterWrapper.vue'
import Header from '@/components/layout/HeaderWrapper.vue'
import { RouterView } from 'vue-router'



</script>

<template>
  <div class="app-container">
    <div class="header-container">
      <Header />
    </div>
    <div class="router-container">
      <RouterView />
    </div>
    <div class="footer-container">
      <Footer />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  margin: 0 auto;
  padding: 0 0.5em;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-row-gap: 2em;
  max-width: 1200px;
  min-height: 100vh;
}
</style>
