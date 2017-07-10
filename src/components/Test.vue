<template>
  <div id="test">
    <div class="product">
      <div class="make3D">
        <img src="../assets/good/img/8.jpg" alt="">
        <div class="stats" >
          <div class="stats-container" @mouseover="myMouseOver(this)">
            <span class="product_price">$39</span>
            <span class="product_name">BEAD DETAIL DRESS</span>
            <p>Summer dress</p>
            <p>123123111</p>
          </div>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="make3D">
        <img src="../assets/good/img/8.jpg" alt="">
        <div class="stats" >
          <div class="stats-container" @mouseover="myMouseOver()">
            <span class="product_price">$39</span>
            <span class="product_name">BEAD DETAIL DRESS</span>
            <p>Summer dress</p>
            <p>123123111</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'test',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
        this.initShowing()
    },
    methods:{
      initShowing(){
        $('.product').each(function (i, el) {
          $(el).find('.make3D').hover(function () {
            $(this).parent().css('z-index', '20');
            $(this).addClass('animate');
            $(this).find('div.carouselNext, div.carouselPrev').addClass('visible');
          }, function () {
            $(this).removeClass('animate');
            $(this).parent().css('z-index', '1');
            $(this).find('div.carouselNext, div.carouselPrev').removeClass('visible');
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('../assets/good/css/styles.css');
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
