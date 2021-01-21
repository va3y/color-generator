<template>
  <div
    class="transition flex flex-col md:flex-row-reverse w-screen h-screen bg-gradient-to-b bg-fixed"
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
      <Buttons
        @changeBgShow="showSettings = !showSettings"
        @reroll="reroll()"
        v-model="showSettings"
      />
    </div>
    <Settings
      v-show="showSettings"
      @changeColorCode="colorCode = $event.colorCode"
      @reroll="reroll()"
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
import Buttons from "../components/Buttons.vue";

import { ref } from "vue";
export default {
  name: "MainView",
  components: {
    Bars,
    Settings,
    Buttons,
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
    } else {
      seed.value = location.hash;
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
    const currSettings = ref();

    const generateNewColors = (event) => {
      currSettings.value = event;
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

    const reroll = () => {
      regenerateSeed();
      generateNewColors(currSettings.value);
    };

    generateNewColors({
      colorModel: 3,
      colorsNum: 5,
      setSaturation: 0.6,
      setLightness: 0.7,
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
      reroll,
    };
  },
};
</script>

<style scoped>
</style>