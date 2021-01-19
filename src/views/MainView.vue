<template>
  <div
    class="flex flex-col md:flex-row-reverse w-screen h-screen bg-gradient-to-b bg-fixed"
    id="cont"
    :class="[
      showBg
        ? 'from-gradient0 via-gradient1 to-gradient2'
        : 'from-gray-500 to-gray-600',
    ]"
    :style="[
      '--gradient0: rgb(' + getFirstColor() + ')',
      '--gradient1: rgb(' + getMiddleColor() + ')',
      '--gradient2: rgb(' + getLastColor() + ')',
    ]"
  >
    <div class="flex flex-col h-4/5 m-auto w-4/5 md:w-3/5">
      <Bars :colorsArr="colorsArr" :colorCode="colorCode"> </Bars>

      <div class="absolute flex w-36 h-14 bottom-14 inset-x-3/4 cursor-pointer z-50">
        <label
          class="flex bg-gray-300 w-14 h-14 rounded-full justify-center bg-opacity-90"
        >
          <img
            src="../assets/icons/settings.svg"
            alt="settings"
            height="20"
            width="30"
            class="w-8 h-8 self-center mt-1 cursor-pointer fill-current text-green-200"
          />
          <input
            type="checkbox"
            name="show-settings"
            :value="true"
            class="hidden"
            v-model="showSettings"
          />
        </label>
      </div>
    </div>
    <Settings
      v-show="showSettings"
      @changeColorCode="colorCode = $event.colorCode"
      @renewSeed="regenerateSeed()"
      @changeColors="generateNewColors($event)"
      @re-shade="reShade($event)"
      @changeBgShow="showBg = !showBg"
      class="absolute flex inset-0 md:static"
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
    const seed = ref();

    const regenerateSeed = () => {
      const rnd = Math.random() * 10;
      seed.value = rnd;
      location.hash = "seed=" + seed.value;
      console.log("new seed!");
    };

    if (location.hash === "") {
      console.log("it is en amty string");
      regenerateSeed();
    }
    const init = (
      colorModel,
      colorsNum,
      setSaturation,
      setLightness,
      scaleOrDarken
    ) => {
      const colorGenerator = new ColorGenerator(
        colorModel,
        colorsNum,
        setSaturation,
        setLightness,
        scaleOrDarken,
        seed.value
      );
      const colorArr = colorGenerator.RGBColorArray;

      return colorArr;
    };

    let colorsArr = ref();
    let baseColorsArr = ref();

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

    generateNewColors({
      colorModel: 3,
      colorsNum: 5,
      setSaturation: 0.5,
      setLightness: 0.5,
      scaleOrDarken: false,
    });

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

    const getFirstColor = () => {
      return colorsArr.value[0];
    };

    const showSettings = ref(true);
    const showBg = ref(true);
    const colorCode = ref("hex");

    return {
      colorsArr,
      generateNewColors,
      reShade,
      getFirstColor,
      getLastColor,
      getMiddleColor,
      showSettings,
      showBg,
      colorCode,
      regenerateSeed,
    };
  },
};
</script>

<style scoped>
</style>