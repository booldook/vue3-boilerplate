<script setup>
import { defineProps, defineEmits, onMounted } from 'vue'

const props = defineProps({
  pager: Object,
})
defineEmits(['updatePage'])

</script>

<template>
  <div class="pager-wrapper">
    <ul class="pager-wrap">
      <li class="pager" @click="$emit('updatePage', 1)">←</li>
      <li class="pager" @click="$emit('updatePage', pager.pagerPrev)">《</li>
      <li class="pager" @click="$emit('updatePage', pager.pagePrev)">〈</li>
      <li v-for="(v, k) in pager.pagerArr" :key="k" :class="{ active: v === pager.page }" class="pager" @click="$emit('updatePage', v)">
        {{ v }}
      </li>
      <li class="pager" @click="$emit('updatePage', pager.pageNext)">〉</li>
      <li class="pager" @click="$emit('updatePage', pager.pagerNext)">》</li>
      <li class="pager" @click="$emit('updatePage', pager.pageTotal)">→</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.pager-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0;

  .pager-wrap {
    display: flex;
    justify-content: center;

    .pager {
      cursor: pointer;
      user-select: none;
      text-align: center;
      width: 30px;
      height: 30px;
      line-height: 28px;
      border: 1px solid #eee;
      @include themed() {
        border-color: t(border)
      }

      &:not(:last-child) {
        border-right: none;
      }

      &.active {
        background-color: darkslategray;
        color: white;
      }
    }
  }
}
</style>
