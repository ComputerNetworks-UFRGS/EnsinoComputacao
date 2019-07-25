<template>
  <div
    class="component-sidenav-wrapper"
    :style="{
        'transform': translateStateWrapper,
        'left': isRight ? 'auto' : '0px',
        'right': isRight ? '0px' : 'auto',        
    }"
    @click.self="$emit('close')"
  >
    <div
      class="component-sidenav"
      :style="{
        'transform': translateState,
        'left': isRight ? 'auto' : '0px',
        'right': isRight ? '0px' : 'auto',
        'width': width,
    }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-side",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    isRight: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "250px"
    },
    duration: {
      type: String,
      default: "0.2s"
    }
  },
  computed: {
    translateState() {
      if (this.isRight) {
        return this.isOpen
          ? "translateX(0px)"
          : "translateX(" + this.width + ")";
      } else {
        return this.isOpen
          ? "translateX(0px)"
          : "translateX(-" + this.width + ")";
      }
    },
    translateStateWrapper() {
      if (this.isRight) {
        return this.isOpen ? "translateX(0px)" : "translateX(100vw)";
      } else {
        return this.isOpen ? "translateX(0px)" : "translateX(-100vw)";
      }
    }
  }
};
</script>


<style scoped>
.component-sidenav-wrapper {
  background: transparent;
  position: fixed;
  height: 100%;
  z-index: 999;
  top: 0;
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transition: transform 0.4s ease-in-out;
  will-change: transform;
  overflow: hidden;
  width: 100vw;
}
.component-sidenav {
  position: fixed;
  height: 100%;
  z-index: 1000;
  top: 0;
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transition: transform 0.4s ease-in-out;
  will-change: transform;
  overflow: hidden;
  overflow-y: auto;
}
</style>
