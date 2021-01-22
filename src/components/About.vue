<template>
  <div class="h-full w-full my-4 overflow-y-auto ">
    <div
      class="screen-size overflow-y-auto flex flex-col items-center align-middle"
    >
      <h1 class="text-4xl">HSLuv color picker</h1>
      by valerih21
      <h2 class="text-xl">What is HSLuv?</h2>
      this is a cool color model 
      <h2 class="text-xl pt-8 pb-2">Credits</h2>
      <div>
        The project is greatly inspired by the similar color palette generator
        by David Aerne: <a class="text-blue-600" href="https://farbvelo.elastiq.ch">farbvelo.elastiq.ch</a>
        <br />
        <br />
        Icons taken from the
        <a class="text-blue-600" href="https://thenounproject.com/">Noun Project</a>
        <br>
        <br>
        Color names are taken from the <a class="text-blue-600" href="https://github.com/meodai/color-names"> Color Names API </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.screen-size {
  height: 70vh;
}
</style>