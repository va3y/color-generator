<template>
  <div
    class="flex-col m-auto my-10 md:m-auto md:mx-10 h-1/2 w-4/6 rounded-3xl p-10 z-50 border-gray-300 border border-opacity-20 shadow-xl"
    id="backdrop-blur"
  >
    <div
      class="bg-white bg-opacity-20 rounded-xl h-12 p-2 flex content-center justify-between"
    >
      <label for="color-model">Color model: </label>
      {{ colorModel == 1 ? "Monochrome" : "" }}
      {{ colorModel == 2 ? "Complementary" : "" }}
      {{ colorModel == 3 ? "Triad" : "" }}
      {{ colorModel == 4 ? "Square" : "" }}

      <input
        type="range"
        v-model="colorModel"
        id="color-model"
        name="color-model"
        min="1"
        max="4"
        step="1"
      />
    </div>
    <div
      class="bg-white bg-opacity-20 rounded-xl h-12 m-2 p-2 flex content-center justify-between"
    >
      <label for="color-model">Number of colors </label>
      <input
        type="range"
        v-model="colorsNum"
        id="color-model"
        name="color-model"
        min="3"
        max="10"
        step="1"
        class="rounded-md"
      />
    </div>
    <div
      class="bg-white bg-opacity-20 rounded-xl h-12 m-2 p-2 flex content-center justify-between"
    >
      Saturation
      <input
        type="range"
        v-model="setSaturation"
        id="saturation"
        name="saturation"
        min="0"
        max="1"
        step="0.01"
      />
    </div>
    <div
      class="bg-white bg-opacity-20 rounded-xl h-12 m-2 p-2 flex content-center justify-between"
    >
      Lightness
      <input
        type="range"
        v-model="setLightness"
        id="lightness"
        name="lightness"
        min="0"
        max="1"
        step="0.01"
      />
    </div>
    <div>
      <label for="show-bg">Show background</label>
      <input type="checkbox" name="show-bg" v-model="showBg" />
    </div>
    <div>
      <label>
        <input
          type="radio"
          name="scaleOrDarken"
          :value="true"
          class="hidden"
          v-model="scaleOrDarken"
          @click="scaleOrDarken = true"
        />
        Scale |
      </label>
      <label>
        <input
          type="radio"
          name="scaleOrDarken"
          :value="false"
          class="hidden"
          v-model="scaleOrDarken"
          @click="scaleOrDarken = false"
        />
        Darken</label
      >
    </div>
    <button
      @click="emitColorChangeEvent()"
      class="bg-white p-5 bg-opacity-10 rounded-2xl"
    >
      Generate New Gradient
    </button>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    colorsArray: Object,
  },
  setup(props, context) {
    const generateNewGradient = () => {
      console.log(props);
      props.colorsArray.map((bar) => {
        let randomValue = Math.floor(Math.random() * 10).toString();
        console.log(randomValue);
        bar.color = "#" + randomValue + randomValue + randomValue;
      });
      console.log("finished");
    };
    const colorModel = ref(3);
    const colorsNum = ref(8);
    const setSaturation = ref(0.5);
    const setLightness = ref(0.5);
    const showBg = ref(false);
    const scaleOrDarken = ref(true);

    const emitColorChangeEvent = () => {
      context.emit("changeColors", {
        colorModel: colorModel.value,
        colorsNum: colorsNum.value,
        setSaturation: setSaturation.value,
        setLightness: setLightness.value,
      });
    };

    window.addEventListener("keyup", function (event) {
      if (event.keyCode === 32) {
        emitColorChangeEvent();
      }
    });
    watch(
      [colorModel, colorsNum, setSaturation, setLightness, scaleOrDarken],
      ([colorModel, colorsNum, setSaturation, setLightness, scaleOrDarken]) => {
        context.emit("changeColors", {
          colorModel,
          colorsNum,
          setSaturation,
          setLightness,
          scaleOrDarken,
        });
      }
    );

    // watch([setSaturation, setLightness], ([setSaturation, setLightness]) => {
    //   context.emit("re-shade", {
    //     setSaturation,
    //     setLightness,
    //   });
    // });

    return {
      generateNewGradient,
      colorModel,
      colorsNum,
      setLightness,
      setSaturation,
      showBg,
      scaleOrDarken,
      emitColorChangeEvent,
    };
  },
};
</script>

<style scoped>
#backdrop-blur {
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
}

#backdrop-blur:before {
  content: "";
  position: absolute;
  background: inherit;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba(184, 189, 227, 0.3);
  filter: blur(10px);
  margin: -20px;
}
</style>