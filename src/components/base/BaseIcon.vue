<template>
  <svg class="ic-stroke-white">
    <use
        :xlink:href="require(`@/assets/sprite.svg`) + `#${$slots.default[0].text.replace(/\s/g, '')}`"
    />
  </svg>
</template>
<style lang="scss" scoped>
.ic {

  &-size {
    @for $size from 1 through 1000 {
      &-#{$size} {
        width: #{$size}px;
        height: #{$size}px;
        min-width: #{$size}px;
      }
    }
  }
  &-height{
    @for $height from 1 through 1000 {
      &-#{$height} {
        height: #{$height}px;
      }
    }
  }

  &-width{
    @for $width from 1 through 1000 {
      &-#{$width} {
        width: #{$width}px;
        min-width: #{$width}px;
      }
    }
  }
}
</style>
