<script setup>
import HelloWorld from '@/components/common/Logo.vue'

</script>

<template>
  <header class="header-wrapper">
    <hello-world msg="Vue3"/>
    <nav class="nav-wrapper">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/todo">Todo</RouterLink>
    </nav>
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
        content: "";
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
}
</style>
