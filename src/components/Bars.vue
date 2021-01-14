<template>
  <div class="flex-col place-self-center w-4/6 h-2/6">
    <div
      v-for="(bar, index) in colorsArray"
      :key="index"
      class=" h-auto overflow-auto"
      :style="'background-color: rgb(' + bar + ')'"
    >
      <div
        class="flex justify-end p-4 text-right border-blue-100"
        :style="'box-shadow:0 0 50px 200px rgb(' + bar + ')'"
      >
        <ColorTag :colorValue="bar"/>
      </div>
    </div>
  </div>
</template>

<script>
import ColorTag from './ColorTag.vue'

export default {
  components: { 
    ColorTag
  },
  props: ["colorsArray"],
  setup(props) {
    const getBackGroundStyle = (index) => {
      console.log(props.colorsArray[index]);
      return "background-color: rgba" + props.colorsArray[index];
    };
    return {
      getBackGroundStyle,
    };
  },
};
</script>

<style scoped>
.gradient-shadow {
  box-shadow: 0 0 140px 30px #0ff; /* outer cyan */
}
</style>