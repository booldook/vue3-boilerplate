<template>
  <div class="item-wrapper">
    <i class="icon-wrap">
      <slot name="icon" />
    </i>
    <div class="content-wrap">
      <h3>
        <slot name="heading" />
      </h3>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-wrapper {
  margin-top: 2rem;
  display: flex;

  .icon-wrap {
    padding: 1em;
  }

  .content-wrap {
    margin-left: 1rem;
  }
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  i {
    @include border(w100, bottom);
    background-color: color(w100);
    border-radius: 4px;
    width: 56px;
    height: 56px;
    &:hover {
      background-color: color(w100);
    }
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
