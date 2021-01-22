<template>
  <div class="flex flex-col h-5/6 mt-14">
    <div
      class="flex flex-col justify-center flex-grow text-left"
      v-for="(bar, index) in colorsArr"
      :key="index"
      :style="'background-color: rgb(' + bar + ')'"
    >
      <transition name="fade">
        <div
          v-if="showColorNames"
          class="cursor-pointer ml-8 flex flex-col align-right fixed"
          :class="[detectDarkMode() ? '' : 'text-gray-400']"
          @click="copy(index, getColorCode(bar))"
        >
          <div class="">
            {{ getColorCode(bar) }}
            <transition name="fade">
              <span class="ml-4" v-if="copyLabelShow[index]">
                Copied to the clipboard
              </span>
            </transition>
          </div>
          <div class="">
            {{ getColorName(index) }}
          </div>
        </div>
      </transition>
    </div>
  </div>
  <div class="flex justify-end">
    <slot class="flex justify-end place-self-end" />
  </div>
</template>

<script>
import { watch, toRefs, ref } from "vue";
import chroma from "chroma-js";

export default {
  components: {},
  props: ["colorsArr", "colorCode"],
  setup(props) {
    const getBackGroundStyle = (index) => {
      return "background-color: rgba" + props.colorsArray[index];
    };
    const { colorsArr, colorCode } = toRefs(props);
    watch(colorCode, (newValue) => {
      colorCode.value = newValue;
    });

    const colorsData = ref([]);
    const showColorNames = ref(false);

    const findColorName = async () => {
      showColorNames.value = false;
      colorsData.value = [];
      const hexArr = [];
      for (const color of colorsArr.value) {
        const hexValue = chroma(color).hex();
        hexArr.push(hexValue.slice(1, hexValue.length)); //delete the # from hex
      }
      fetch(
        `https://api.color.pizza/v1/${hexArr}?noduplicates=true&goodnamesonly=true`
      )
        .then((response) => response.json())
        .then((data) => {
          colorsData.value.push(data.colors);
          showColorNames.value = true;
        });
    };
    findColorName();

    watch(colorsArr, () => {
      findColorName();
      darkMode.value = detectDarkMode();
    });

    const getColorName = (index) => {
      try {
        return colorsData.value[0][index].name;
      } catch (error) {
        return;
      }
    };
    const getColorCode = (color) => {
      switch (colorCode.value) {
        case "rgb": {
          const rgbArr = chroma(color).rgb().toString();

          return rgbArr.replace("[", "").replace("]", "").replace(/,/g, ", ");
        }
        case "hex":
          return chroma(color).hex();
        case "lab": {
          const labArray = chroma(color)
            .lab()
            .map((c) => {
              return parseFloat(c.toFixed(2));
            })
            .toString();
          return labArray.replace("[", "").replace("]", "").replace(/,/g, ", ");
        }
        default:
          break;
      }
    };
    const copyLabelShow = ref([]);

    const copy = (index, code) => {
      navigator.clipboard.writeText(code);
      copyLabelShow.value[index] = true;
      setTimeout(() => {
        copyLabelShow.value[index] = false;
      }, 1000);
    };

    const detectDarkMode = () => {
      const lightnness = chroma(props.colorsArr[2]).luminance();
      console.log("lightnness", lightnness);
      if (lightnness > 0.1) return true;
      return false;
    };
    const darkMode = ref(detectDarkMode());
    return {
      getBackGroundStyle,
      findColorName,
      colorsData,
      getColorName,
      showColorNames,
      getColorCode,
      copyLabelShow,
      copy,
      detectDarkMode,
    };
  },
};
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
  font-family: 'Montserrat'
} */

.gradient-shadow {
  box-shadow: 0 0 140px 30px #0ff; /* outer cyan */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>