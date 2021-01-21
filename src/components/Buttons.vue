<template>
  <div
    class="absolute flex w-36 h-14 bottom-14 right-1/4 cursor-pointer z-50"
  >
    <label
      class="flex bg-gray-300 mr-2 w-14 h-14 rounded-full justify-center bg-opacity-90"
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
        @click="changeBgShow()"
      />
    </label>

     <label
      class="flex bg-gray-300 w-14 h-14 rounded-full justify-center bg-opacity-90"
    >
      <img
        src="../assets/icons/dice.svg"
        alt="reroll"
        height="20"
        width="30"
        class="z-50 w-8 h-8 self-center mt-1 cursor-pointer fill-current text-green-200"
      />
      <button
        class="hidden"
        @click="reroll()"
      />
    </label>
  </div>
</template>

<script>
//import { toRefs } from 'vue'

export default {
  setup(props,context) {
    const changeBgShow = () => {
      context.emit('changeBgShow')
    } 

    const reroll = () => {
      context.emit('reroll')
    }
    return {
      changeBgShow,
      reroll
    } 
  }
};
</script>

<style lang="scss" scoped>
</style>