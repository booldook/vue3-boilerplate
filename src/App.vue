<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import useStore from '@/stores/store'

import Footer from '@/components/layout/FooterWrapper.vue'
import Header from '@/components/layout/HeaderWrapper.vue'

const { getTheme } = useStore()

const appliedTheme = computed(() => 'theme--' + getTheme.value)
</script>

<template>
  <div class="theme-container" :class="appliedTheme">
    <div class="gnb-wrapper">
      <div class="app-container wrapper">
        <Header />
        <RouterView />
        <Footer />
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
  }

  .app-container {
    margin: 0 auto;
    padding: 0 0.5em;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-row-gap: 2em;
    min-height: 100vh;
  }
}
</style>
