<template>
  <div class="loader">
    <div class="loader__wrapper">
      <div class="loader__element">
        <div class="loader__base" ></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loader {
  $self: &;
  margin: 0 auto;
  &__base {
    height: 100px;
    width: 100px;
    background: #55BB06;
    background: linear-gradient(
            to right,
            #55BB06 10%,
            rgba(255, 255, 255, 0) 42%
    );
    border-radius: 50%;
    mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #fff 0);
    animation: spin 0.7s linear infinite;
    margin-left: auto;
    margin-right: auto;
    @media(max-width: 768px) {
      height: 60px;
      width: 60px;

    }
    &.small {
      width: 20px;
      height: 20px;
      margin: 0;
      background: linear-gradient(
              to right,
              #217aff 28%,
              rgba(255, 255, 255, 0) 42%
      );
      mask: radial-gradient(
              farthest-side,
              transparent calc(100% - 1.5px),
              #fff 0
      );
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
