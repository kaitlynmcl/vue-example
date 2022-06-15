<template>
  <div class="ripple">
    <div class="ripple__circle"></div>
    <div class="ripple__circle ripple__inner-circle"></div>
  </div>
</template>

<style lang="scss" scoped>
.ripple {
  display: inline-block;
  text-align: center;
  position: absolute;
  margin-left: -18rem;
  margin-top: 4rem;
  width: 100px;
  height: 100px;

  @media screen and (max-width: 600px) {
    display: none;
  }

  &__circle {
    position: absolute;
    border: 4px solid #41b883;
    opacity: 1;
    border-radius: 50%;
    animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    z-index: 0;
  }

  &__inner-circle {
    animation-delay: -0.5s;
  }
}

@keyframes ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}
</style>

