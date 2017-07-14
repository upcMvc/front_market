<template>
  <div id="test">
      <div class="items"><a :href="'#anchor-'+index" v-for="index in 20"> {{index}} </a></div>
      <div :id="'anchor-'+index" class="item" v-for="index in 20">{{index}}</div>
  </div>
</template>

<script>
  $('.items').click(function () {
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
    return false;
  });
  export default {
    name:'test',
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
  #test{
    transition: all 0.3s;
  }
  .item {
    padding: 20px;
  }
</style>
