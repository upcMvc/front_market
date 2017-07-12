<template>
  <div class="hello">
    <Test></Test>
  </div>
</template>

<script>
  import Test from './Test.vue'
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components:{
        Test
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
