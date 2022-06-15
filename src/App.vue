<template>
  <div id="app">
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
