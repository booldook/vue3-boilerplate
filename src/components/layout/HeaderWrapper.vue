<script setup>
import useStore from '@/stores/store'

import HelloWorld from '@/components/common/LogoCp.vue'

const { updateTheme, getTheme } = useStore()
</script>

<template>
  <header class="header-wrapper">
    <HelloWorld msg="Vue3" />
    <nav class="nav-wrapper">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/todo">Todo</RouterLink>
    </nav>
    <div class="theme-wrapper">
      <div>테마: </div>
      <FormButton
        class-name="info"
        padding="0.25em 0.5em"
        @click="updateTheme(getTheme === 'dark' ? 'default' : 'dark')">
        {{ getTheme === 'dark' ? '다크' : '기본' }}
      </FormButton>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 1em 0 0.5em 0;
  @include border(w80, bottom);
  @include themed() {
    border-bottom-color: t(border);
  }
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
    span {
      margin-right: 0.5em;
    }
  }
}
</style>
