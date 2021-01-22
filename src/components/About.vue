<template>
  <div class="h-full w-full my-4 overflow-y-auto select-text">
    <div
      class="screen-size overflow-y-auto flex flex-col items-right align-middle"
    >
      <div class="mb-4">
        <h1 class="text-4xl inline mr-2">HSLuv color picker</h1>
        <a class="text-sm text-blue-600" href="https://github.com/valerih12">by valerih21</a>
      </div>

      <div class="mb-4">A color picker adjusted for natural human perception.</div>
      <div>
        <img
          src="../assets/graph.png"
          class="w-32 float-left mr-2 mb-2"
          alt=""
        />
        <h2 class="text-2xl pb-2">What is HSLuv?</h2>
        <p>
          HSLuv is a human-friendly alternative to HSL. Here you can see CIELUV,
          a color space designed for perceptual uniformity based on human
          experiments. When accessed by polar coordinates, it becomes
          functionally similar to HSL with a single problem: its chroma
          component doesn't fit into a specific range.
        </p>
      </div>
      <h2 class="text-2xl pt-8 pb-2">Credits</h2>
      <div>
        The project is greatly inspired by the similar color palette generator
        from David Aerne:
        <a class="text-blue-600" href="https://farbvelo.elastiq.ch"
          >farbvelo.elastiq.ch</a
        >
        <br />
        <br />
        Icons taken from the
        <a class="text-blue-600" href="https://thenounproject.com/"
          >Noun Project</a
        >
        <br />
        <br />
        Color names are taken from the
        <a class="text-blue-600" href="https://github.com/meodai/color-names">
          Color Names API
        </a>
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