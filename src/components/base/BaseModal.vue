<template>
  <div>
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  data() {
    return {
      show: false
    };
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1052;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2c3e50cc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
