<script setup></script>

<template>
  <footer class="footer-wrapper">footer</footer>
</template>

<style scoped lang="scss">
.footer-wrapper {
  @include border(w80, top);
  @include themed() {
    color: t(text);
    border-color: t(border);
  }
  text-align: center;
  padding: 10px 0;
}
</style>
