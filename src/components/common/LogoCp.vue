<script setup>
const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="logo-wrapper">
    <RouterLink to="/">
      <img src="@/assets/img/logo.svg" class="logo-img" alt="logo" />
      <h1 class="logo-txt">{{ props.msg }}</h1>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.logo-wrapper {
  a {
    display: flex;
    align-items: center;
    user-select: none;
    .logo-img {
      width: 40px;
      margin-right: 1em;
    }
    .logo-txt {
      text-align: center;
      font-weight: 500;
      font-size: 2em;
    }
  }
}
</style>
