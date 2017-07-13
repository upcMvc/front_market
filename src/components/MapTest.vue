<template>
  <div>
    <Locate v-on:mapReturn="addr"></Locate>
  </div>
</template>

<script>
  import Locate from './map/Locate.vue'
  export default {
    name:'locate',
    data(){
      return{

      }
    },
    mounted () {

    },
    components:{
      Locate
    },
    methods:{
      addr(pt,addCom){
        console.log(pt)
        console.log(addCom)
      }
    }
  }
</script>

<style scoped>
  #allmap{
    width: 500px;
    height: 500px;
    margin:0;font-family:"微软雅黑";
  }
</style>
