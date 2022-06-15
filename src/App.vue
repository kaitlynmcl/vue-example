<template>
  <div id="app" class="app">
    <h2 class="app__header">EmployApp: simple Vue.js app to select an employee card.</h2>
    <SelectAvatar msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import SelectAvatar from './components/SelectAvatar.vue'

export default {
  name: 'App',
  components: {
    SelectAvatar
  }
}
</script>

<style lang="scss">
.app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  h2 {
    margin-block-start: 0em;
    margin-block-end: 0em;
  }

  &__header {
    background-color: #41B883;
    color: white;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    padding: 1rem;
  }
}
</style>
