<template>
  <div>
    <Pic v-on:picInfo="getPic"></Pic>
  </div>
</template>

<script>
  import Pic from './pic/Pic.vue'
  export default {
    name:'locate',
    data(){
      return{

      }
    },
    mounted () {

    },
    components:{
      Pic
    },
    methods:{
      getPic(format,base){
        console.log("gerPic")
        console.log(format)
        console.log(base)
      }
    }
  }
</script>

<style scoped>

</style>
