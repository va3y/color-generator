<template>
  <div
    class="flex flex-col md:flex-row-reverse w-screen h-screen justify-center bg-gradient-to-b from-gradient0 via-gradient1 to-gradient2 bg-fixed"
    id="cont"
    :style="[
      `--gradient0: rgb(${colorsArr[0]})`,
      `--gradient1: rgb(${colorsArr[2]})`,
      `--gradient2: rgb(${getLastColor()})`,
    ]"
  >
    <Bars :colorsArray="colorsArr" class="flex align-middle" />
    <Settings @changeColors="generateNewColors($event)" @re-shade="reShade($event)"/>
    
  </div>
</template>

<script>
import Bars from "../components/Bars.vue";
import Settings from "../components/Settings.vue";
import ColorGenerator from '../colorGenerator.js'

import { ref } from "vue";
export default {
  name: "MainView",
  components: {
    Bars,
    Settings,
  },
  setup() {
    const init = (colorModel, colorsNum, setSaturation, setLightness ) => {
      const colorGenerator = new ColorGenerator(colorModel, colorsNum, setSaturation, setLightness);
      const colorArr = colorGenerator.RGBColorArray;
      return colorArr
    }
    let colorsArr = ref(init(3, 5, 0.5, 0.5));
    let baseColorsArr = ref(colorsArr.value);

    const generateNewColors = (event) => {
      colorsArr.value = init(event.colorModel, event.colorsNum, event.setSaturation, event.setLightness)
      baseColorsArr.value = colorsArr.value
      return colorsArr
    }
    const reShade = (event) => {
      colorsArr.value = ColorGenerator.correntLightnessAndSaturation(baseColorsArr.value, event.setSaturation, event.setLightness)
    }

    const getLastColor = () => {
      return colorsArr.value[colorsArr.value.length-1]
    }
    

    return {
      colorsArr,
      generateNewColors,
      reShade,
      getLastColor
    };
  },
};
</script>

<style scoped>
</style>