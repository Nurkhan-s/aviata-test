<template>
  <div class="checkbox-block">
    <div class="checkbox-block__group">
      <label :for="fakeHash" :class="{ active: value }">
        <BaseIcon class="ic-size-6">doneIcon</BaseIcon>
      </label>
      <input
          type="checkbox"
          :id="fakeHash"
          :value="value"
          @change="changed(value)"
          class="checkbox-appearance"
      />
    </div>
    <div class="checkbox-block__text">
      {{ text }}
    </div>
  </div>
</template>
<script>
import BaseIcon from "./BaseIcon";

export default {
  components: {BaseIcon},
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    }
  },
  computed: {
    fakeHash: function () {
      return `${this.id}_${this.text}_checkbox`;
    }
  },
  methods: {
    changed() {
      this.$emit("input", !this.value);
      this.$emit("onchange", this.value);
    }
  },
};
</script>
<style lang="scss" scoped>
.checkbox-block {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  cursor: pointer;
  &:hover{
    background: #EBEBEB;
  }

  &__group {
    label {
      border: 1px solid #9da3ac;
      border-radius: 2px;
      width: 12px;
      height: 12px;
      cursor: pointer;
      margin-right: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;

      &.active {
        background: #55BB06;
        border: 1px solid transparent;
      }
    }
    input {
      display: none;
    }
  }

  &__text {
    font-size: 12px;
    line-height: 16px;
    color: #202123;
  }
}
</style>
