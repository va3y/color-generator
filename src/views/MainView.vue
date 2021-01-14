<template>
  <div
    class="flex flex-col md:flex-row-reverse w-screen h-screen justify-center bg-gradient-to-b from-gradient0 via-gradient1 to-gradient2 bg-fixed"
    id="cont"
    :style="[
      `--gradient0: rgb(${colorsArr[0]})`,
      `--gradient1: rgb(${getMiddleColor()})`,
      `--gradient2: rgb(${getLastColor()})`,
    ]"
  >
    <Bars :colorsArray="colorsArr" class="" />
    <div class="self-end"> 
      <label><img src="../assets/icons/settings.svg" alt="settings" height="20" width="30"
      class="bg-white rounded-full w-8 h-8">
        <input
          type="checkbox"
          name="show-settings"
          :value="true"
          class="hidden"
          v-model="showSettings"
        />
      </label>
    </div>
    <Settings
      v-show="showSettings"
      @changeColors="generateNewColors($event)"
      @re-shade="reShade($event)"
    />
  </div>
</template>

<script>
import Bars from "../components/Bars.vue";
import Settings from "../components/Settings.vue";
import ColorGenerator from "../colorGenerator.js";

import { ref } from "vue";
export default {
  name: "MainView",
  components: {
    Bars,
    Settings,
  },
  setup() {
    const init = (colorModel, colorsNum, setSaturation, setLightness) => {
      const colorGenerator = new ColorGenerator(
        colorModel,
        colorsNum,
        setSaturation,
        setLightness
      );
      const colorArr = colorGenerator.RGBColorArray;
      return colorArr;
    };
    let colorsArr = ref(init(3, 5, 0.5, 0.5));
    let baseColorsArr = ref(colorsArr.value);

    const generateNewColors = (event) => {
      colorsArr.value = init(
        event.colorModel,
        event.colorsNum,
        event.setSaturation,
        event.setLightness,
        event.scaleOrDarken
      );
      baseColorsArr.value = colorsArr.value;
      return colorsArr;
    };
    const reShade = (event) => {
      colorsArr.value = ColorGenerator.correntLightnessAndSaturation(
        baseColorsArr.value,
        event.setSaturation,
        event.setLightness
      );
    };
    const getMiddleColor = () => {
      return colorsArr.value[Math.floor(colorsArr.value.length / 2)];
    };

    const getLastColor = () => {
      return colorsArr.value[colorsArr.value.length - 1];
    };

    const showSettings = ref(true);

    return {
      colorsArr,
      generateNewColors,
      reShade,
      getLastColor,
      getMiddleColor,
      showSettings,
    };
  },
};
</script>

<style scoped>
</style>