<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useStores } from '@/stores'

import Footer from '@/components/layout/FooterWrapper.vue'
import Header from '@/components/layout/HeaderWrapper.vue'

const stores = useStores()
const { getTheme } = storeToRefs(stores)
const { updateTheme } = stores

const appliedTheme = computed(() => 'theme--' + getTheme.value)

// console.log('%c ===== stores =====', 'background: #222; color: #ea6947')
// console.log(stores)
</script>

<template>
  <div class="theme-container" :class="appliedTheme">
    <div class="gnb-wrapper">
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.gnb-wrapper {
  width: 100%;
  @include themed() {
    background: t(root-bg);
    color: t(text);
    border: 1px solid t(border);
  }
  .app-container {
    margin: 0 auto;
    padding: 0 0.5em;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-row-gap: 2em;
    max-width: 1200px;
    min-height: 100vh;
  }
}
</style>
