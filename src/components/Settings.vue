<template>
  <div>
    <div
      id="backdrop-blur"
      class="select-none flex flex-col m-auto md:mx-10 h-11/12 w-10/12 md:w-96 rounded-3xl md:p-10 p-12 z-50 border-gray-300 border border-opacity-20 shadow-xl"
    >
      <div class="h-28 section">
        <div class="section-title">Color harmony</div>
        <div class="flex justify-center align-center">
          <label
            for="color-model-1"
            class="model-button"
            :class="colorModel === 1 ? 'btn-active' : ''"
            >Monochrome
          </label>
          <input
            class="hidden"
            id="color-model-1"
            type="radio"
            :value="1"
            v-model="colorModel"
          />
          <label
            for="color-model-2"
            class="model-button"
            :class="colorModel === 2 ? 'btn-active' : ''"
            >Complementary
          </label>
        </div>
        <div class="flex justify-center align-center">
          <input
            class="hidden"
            id="color-model-2"
            type="radio"
            :value="2"
            v-model="colorModel"
          />
          <label
            for="color-model-3"
            class="model-button"
            :class="colorModel === 3 ? 'btn-active' : ''"
            >Triad
          </label>
          <input
            class="hidden"
            id="color-model-3"
            type="radio"
            :value="3"
            v-model="colorModel"
            
          />
          <label
            for="color-model-4"
            class="model-button"
            :class="colorModel === 4 ? 'btn-active' : ''"
            >Square</label
          >
          <input
            class="hidden"
            id="color-model-4"
            type="radio"
            :value="4"
            v-model="colorModel"
          />
        </div>
      </div>
      <div class="section h-20">
        <div class="section-title">Shades</div>
        <div class="flex justify-center">
          <label
            for="scaleOrDarken"
            :class="[!scaleOrDarken ? 'btn-active' : '']"
            class="model-button flex justify-center align-middle p-2 rounded-lg"
          >
            Darken</label
          >
          <input
            id="scaleOrDarken"
            type="radio"
            name="scaleOrDarken"
            :value="false"
            class="hidden"
            v-model="scaleOrDarken"
            @click="scaleOrDarken = false"
          />
          <label
            :class="[scaleOrDarken ? 'btn-active' : '']"
            class="model-button flex justify-center align-middle p-2 rounded-lg"
          >
            <input
              type="radio"
              name="scaleOrDarken"
              :value="true"
              class="hidden"
              v-model="scaleOrDarken"
              @click="scaleOrDarken = true"
            />
            Scale
          </label>
        </div>
      </div>
      <div class="section h-16">
        <label for="color-model" class="section-title">Number of colors </label>
        <input
          class="slider"
          type="range"
          v-model="colorsNum"
          id="color-model"
          name="color-model"
          :min="3"
          :max="scaleOrDarken ? 10 : 6"
          step="1"
        />
      </div>

      <div class="section h-16">
        <div class="section-title">Saturation</div>
        <input
          class="slider"
          type="range"
          v-model="setSaturation"
          id="saturation"
          name="saturation"
          :min="0.1"
          :max="1"
          step="0.01"
        />
      </div>
      <div class="section h-16">
        <div class="section-title">Lightness</div>
        <input
          class="slider"
          type="range"
          v-model="setLightness"
          id="lightness"
          name="lightness"
          :min="0.1"
          :max="0.9"
          step="0.01"
        />
      </div>
      <div class="flex justify-between">
        <label
          for="show-bg"
          :class="[showBg ? 'bg-white bg-opacity-40' : 'bg-white']"
          class="mr -2 p-2 bg-opacity-20 rounded-lg"
          >Show background
          <input type="checkbox" id="show-bg" v-model="showBg" class="hidden" />
        </label>

        <div class="flex rounded-lg px-4 max-w-1/3 bg-white bg-opacity-20">
          <label for="code-color" class="flex m-auto">Color code: </label>
          <div class="select-label m-auto">
            <select
              v-model="colorCode"
              id="code-color"
              class="m-auto appearance-none outline-none border-none bg-transparent"
            >
              <option value="hex" selected>Hex</option>
              <option value="rgb">RGB</option>
              <option value="lab">LAB</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center mt-4">
        <button
          @click="emitColorChangeEvent()"
          class="m-auto w-1/2 bg-white bg-opacity-20 rounded-lg active:bg-gray-300 h-12"
        >
          Generate
        </button>
      </div>
    </div>
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
      props.colorsArray.map((bar) => {
        let randomValue = Math.floor(Math.random() * 10).toString();
        bar.color = "#" + randomValue + randomValue + randomValue;
      });
    };
    const colorModel = ref(3);
    const colorsNum = ref(5);
    const setSaturation = ref(0.55);
    const setLightness = ref(0.5);
    const showBg = ref(false);
    const scaleOrDarken = ref(false);
    const colorCode = ref("hex");

    const emitColorChangeEvent = () => {
      context.emit("changeColors", {
        colorModel: colorModel.value,
        colorsNum: colorsNum.value,
        setSaturation: setSaturation.value,
        setLightness: setLightness.value,
        scaleOrDarken: scaleOrDarken.value,
      });
    };
    const emitSeedRenewal = () => {
      context.emit("renewSeed");
    };

    window.addEventListener("keyup", function (event) {
      if (event.keyCode === 32) {
        emitSeedRenewal();
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

    watch(showBg, (showBg) => {
      context.emit("changeBgShow", {
        showBg,
      });
    });

    watch(colorCode, (colorCode) => {
      context.emit("changeColorCode", {
        colorCode,
      });
    });

    watch(scaleOrDarken, (newValue) => {
      if (!newValue && parseInt(colorsNum.value) > 6) {
        colorsNum.value = "6";
      }
    });

    return {
      generateNewGradient,
      colorModel,
      colorsNum,
      setLightness,
      setSaturation,
      showBg,
      scaleOrDarken,
      emitColorChangeEvent,
      colorCode,
    };
  },
};
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 17px;
  width: 17px;
  border: 1px solid #a6a6a6;
  border-radius: 100%;
  background: #dedede;
  cursor: pointer;
  /* margin-top: -14px; You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
}

/* All the same stuff for Firefox */
input[type="range"]::-moz-range-thumb {
  border: 1px solid #a6a6a6;
  border-radius: 100%;
  background: #dedede;
  cursor: pointer;
}

input[type="range"] {
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -webkit-appearance: none;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20%;
  @apply justify-center mx-auto;
}

select {
  border: none;
  outline: none;
  display: inline-block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}

.select-label {
  position: relative;
}

.select-label:after {
  content: ".";
  color: #666;
  top: 0.6em;
  height: 7px;
  width: 7px;
  left: 32px;
  position: absolute;
  pointer-events: none;
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  background-color: rgb(50, 50, 50);
}

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
  box-shadow: inset 0 0 2000px rgba(184, 189, 227, 0.5);
  filter: blur(20px);
  margin: -20px;
}

@media screen and (max-width: 768px) {
  #backdrop-blur:before {
    box-shadow: inset 0 0 2000px rgba(184, 189, 227, 1);
    background: rgba(187, 187, 187, 0.9);

    backdrop-filter: blur(200px);
  }
}

.model-button {
  @apply p-1 mx-2 rounded-md w-1/2 h-8 flex flex-col text-center justify-center align-middle;
}

.btn-active {
  @apply bg-white bg-opacity-30;
}

.slider {
  @apply flex flex-col bg-white bg-opacity-20 rounded-xl w-full;
}

.section {
  @apply flex flex-col bg-white bg-opacity-20 rounded-lg w-full mb-2 px-6;
}

.section-title {
  @apply m-1 w-10/12 flex my-2;
}
</style>