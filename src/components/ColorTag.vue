<template>
  <div>
    {{ colorName["name"] }}
    {{ colorName["value"] }}
  </div>
</template>

<script>
// import nearestColor from 'nearest-color';
// import namedColors from 'color-name-list';

import { toRefs, watch, ref, onMounted } from "vue";
import chroma from "chroma-js";

export default {
  props: {
    colorValue: Array,
  },
  setup(props) {
    const { colorValue } = toRefs(props);

    const colorName = ref({});

    const findColorName = async () => {
      //clien-side calculation was too slow :(
      
      // const hexValue = chroma(colorValue.value).hex();
      // const colors = namedColors.reduce(
      //   (o, { name, hex }) => Object.assign(o, { [name]: hex }),
      //   {}
      // );
      // const nearest = nearestColor.from(colors);
      // colorName.value = nearest(hexValue);

      const hexValue = chroma(colorValue.value).hex();
      console.log(hexValue)
      const fetched = await fetch(
        `https://api.color.pizza/v1/ffffff?noduplicates=true&goodnamesonly=true`
      )

      console.log(fetched);
      const data = await fetched.json()
      
      colorName.value = data;
      
    };

    onMounted(findColorName);

    watch(colorValue, findColorName);

    return {
      findColorName,
      colorName,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>