<template>
  <transition name="slide-fade" appear>
    <div v-if="loaded">
      <MainView />
    </div>
  </transition>
</template>

<script>
import MainView from "./views/MainView.vue";

export default {
  name: "App",
  components: {
    MainView,
  },
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    this.loaded = true;
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: 0.6s all ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap");

#app {
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  align-content: center;
  color: rgb(37, 37, 37);
  padding: 0px;
  margin: 0px;
}

#app {
  --gradient0: #ff00ff;
  --gradient1: #ff00ff;
  --gradient2: #ff00ff;
  --gradient3: #ff00ff;
  --gradient4: #ff00ff;
  --gradient5: #ff00ff;
  --gradient6: #ff00ff;
  box-sizing: border-box;

  background-attachment: fixed;
}
</style>
