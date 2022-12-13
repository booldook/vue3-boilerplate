<script setup>
import { useThemeStore } from '@/stores/themeStore'
import { storeToRefs } from 'pinia'

import HelloWorld from '@/components/common/LogoCp.vue'

const themeStore = useThemeStore()
const { getTheme } = storeToRefs(themeStore)
const { updateTheme } = themeStore
</script>

<template>
  <header class="header-wrapper">
    <HelloWorld msg="Vue3" />
    <nav class="nav-wrapper">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/todo">Todo</RouterLink>
    </nav>
    <ul class="theme-wrapper">
      <li>테마: </li>
      <li v-if="getTheme === 'default'" class="theme default" @click="updateTheme('dark')">기본</li>
      <li v-else class="theme dark" @click="updateTheme('default')">다크</li>
    </ul>
  </header>
</template>

<style scoped lang="scss">
.header-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 1em 0 0.5em 0;
  @include border(w80, bottom);
  .nav-wrapper {
    display: flex;
    margin-left: 3em;
    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 1em;
      text-decoration: none;
      &:after {
        display: block;
        content: '';
        width: 1px;
        height: 80%;
        margin-left: 1em;
        @include border(w100, bottom);
      }
      &:last-child {
        &:after {
          width: 0;
          height: 0;
        }
      }
    }
  }
  .theme-wrapper {
    display: flex;
    align-items: center;
    margin-left: auto;
    cursor: pointer;
    li:first-child {
      margin-right: .5em;
    }
    li:not(:first-child) {
      @include themed() {
        border: 1px solid t(border);
      }
      padding: gap-sm(xs) gap-sm(md);
    }
  }
}
</style>
