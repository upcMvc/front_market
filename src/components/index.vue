<template>
  <div id="index">
    <Navs></Navs>
    <div class="product" v-for="info in goodsinfo">
      <div class="make3D">
        <img src="../assets/good/img/8.jpg" alt="">
        <div class="stats">
          <div class="stats-container">
            <span class="product_price">¥{{ info.price }}</span>
            <span class="product_name">{{ info.name }}</span>   <!--加入商品详细信息-->
            <cartcontrol></cartcontrol>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="shopCar"></div>
    <shopCart></shopCart>
  </div>

</template>
<script>
  import $ from 'jquery'
  import BScroll from 'better-scroll'
  import shopCart from './throw/shopCart'
  import cartcontrol from './throw/cartcontrol'
  import Navs from './Nav'
  import API from '../config/req'
  export default {
    name: 'index',
    mounted(){
      this.initData();
      //this.initScroll()
      this.initShowing()
    },
    methods: {
      data () {
        return {
          goodsinfo: []
        }
      },
      initScroll() {
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper);
      },
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
      },
      initData(){
        let self = this;
        this.$http.get(API.GoodsInfo,{params:{Authorization: localStorage.getItem('token')}}
        ).then((response) => {
          self.goodsinfo = response.data;
          console.log(self.goodsinfo)
        }, () => {
        });

      }
    },
    components: {
      shopCart,
      cartcontrol,
      Navs
    }
  }
</script>

<style scoped>
  @import url('../assets/good/css/styles.css');

  .stats-container {
    width: 324px;
    height: 359px;
  }

  .shopCar {
    background: white;
    background: url('../assets/img/shopcar.svg') no-repeat 0 0;
    background-position: -5px;
    width: 60px;
    height: 60px;
    box-shadow: 0.5px 0.5px 0.5px 0.5px #888888;
    border-radius: 5px;
    position: fixed;
    bottom: 22px;
    left: 32px;
    z-index: 100;

  }

  .shopCar:hover {
    box-shadow: 1px 1px 1px 1px #888888;
    transition: all 0.5s;
  }

</style>
