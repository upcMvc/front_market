<template>
  <div id="index">
    <Navs></Navs>
    <div class="ad">
      <slide :slides="slides" :inv="inv" :style="styleObject" :name="transitionName1" :target="target"></slide>
    </div>
    <div style="overflow: hidden;">
      <h2 id="daily">日常用品</h2>
      <hr>
      <div class="product" v-for="(info,index) in daily">
        <div class="make3D">
          <!--<img src="../assets/good/img/8.jpg" alt="">-->
          <img v-bind:src="info.imgPath" alt="">
          <div class="stats">
            <div class="stats-container">
              <span class="product_price">¥{{ info.price }}</span>
              <span class="product_name">{{ info.name }}</span> <br>
              <div>
                <h4>{{ info.kind }}</h4>
              </div>
              <div>
                <h4 class="text-left h4">描述：{{ info.describes }}</h4>
              </div>
              <br>
              <cartcontrol :pushid="info.id" v-on:push="getId"></cartcontrol>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="overflow: hidden;">
      <h2 id="snacks">零食</h2>
      <hr>
      <div class="product" v-for="(info,index) in snacks">
        <div class="make3D">
          <!--<img src="../assets/good/img/8.jpg" alt="">-->
          <img v-bind:src="info.imgPath" alt="">
          <div class="stats">
            <div class="stats-container">
              <span class="product_price">¥{{ info.price }}</span>
              <span class="product_name">{{ info.name }}</span> <br>
              <div>
                <h4>{{ info.kind }}</h4>
              </div>
              <div>
                <h4 class="text-left h4">描述：{{ info.describes }}</h4>
              </div>
              <br>
              <cartcontrol :pushid="info.id" v-on:push="getId"></cartcontrol>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="overflow: hidden;">
      <h2 id="fruits">水果</h2>
      <hr>
      <div class="product" v-for="(info,index) in fruits">
        <div class="make3D">
          <img v-bind:src="info.imgPath" alt="">
          <div class="stats">
            <div class="stats-container">
              <span class="product_price">¥{{ info.price }}</span>
              <span class="product_name">{{ info.name }}</span> <br>
              <div>
                <h4>{{ info.kind }}</h4>
              </div>
              <div>
                <h4 class="text-left h4">描述：{{ info.describes }}</h4>
              </div>
              <br>
              <cartcontrol :pushid="info.id" v-on:push="getId"></cartcontrol>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="overflow: hidden;">
      <h2 id="drink">饮品</h2>
      <hr>
      <div class="product" v-for="(info,index) in drink">
        <div class="make3D">
          <img v-bind:src="info.imgPath" alt="">
          <div class="stats">
            <div class="stats-container">
              <span class="product_price">¥{{ info.price }}</span>
              <span class="product_name">{{ info.name }}</span> <br>
              <div>
                <h4>{{ info.kind }}</h4>
              </div>
              <div>
                <h4 class="text-left h4">描述：{{ info.describes }}</h4>
              </div>
              <br>
              <cartcontrol :pushid="info.id" v-on:push="getId"></cartcontrol>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shopCar" @click="shopCar()"></div>
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
  import slide from '@/components/slide/slide.vue'
  import datu1 from  '../assets/img/ad/datu1.jpg'
  import datu2 from  '../assets/img/ad/datu2.jpg'
  import datu3 from  '../assets/img/ad/datu3.jpg'
  import datu4 from  '../assets/img/ad/datu4.jpg'
  export default {
    name: 'index',
    data () {
      return {
        goodsinfo: [],
        daily: [],
        drink: [],
        fruits: [],
        snacks: [],
        //轮播图
        slides: [{
          src: datu1,
          href: ''
        }, {
          src: datu2,
          href: ''
        }, {
          src: datu3,
          href: ''
        }, {
          src: datu4,
          href: ''
        }],
        inv: 3000,
        styleObject: {
          width: '100%',
          height: '400px'
        },
        transitionName1: 'move',
        transitionName2: 'fade',
        target: '_blank'
      }
    },
    created(){
      this.initData()
    },
    mounted(){
      let self = this
      //this.initScroll()
      setTimeout(() => {
        self.initShowing()
      }, 1000)
    },
    methods: {
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
        let token = localStorage.getItem('token');
        this.$http.get(API.GoodsInfo, {params: {Authorization: token}}
        ).then((response) => {
          self.goodsinfo = response.data
        }, () => {
          console.log('error !')
        })

        //日常用品
        this.$http.get(API.daily, {params: {Authorization: token}}
        ).then((response) => {
          self.daily = response.data;
        }, () => {
          console.log('error !');
        })
        //零食
        this.$http.get(API.snacks, {params: {Authorization: token}}
        ).then((response) => {
          self.snacks = response.data;
        }, () => {
          console.log('error !');
        })
        //水果
        this.$http.get(API.fruits, {params: {Authorization: token}}
        ).then((response) => {
          self.fruits = response.data
        }, () => {
          console.log('error !')
        })
        //饮品
        this.$http.get(API.drink, {params: {Authorization: token}}
        ).then((response) => {
          self.drink = response.data;
        }, () => {
          console.log('error !');
        })
      },
      getId(id){
        let token = localStorage.getItem('token');
        let userid = localStorage.getItem('id');
        let postData = {
          Authorization: token,
          userId: userid,
          goodId: id,
          num: 1
        };
        this.$http.post(API.shoppcartCreat, postData).then((response) => {
          console.log(response.data)
        }, () => {
          alert('添加购物车失败！请稍后再试！')
        });
      },
      shopCar(){
        this.$router.push({path: '/shopcar'})
      }
    },
    components: {
      shopCart,
      cartcontrol,
      Navs,
      slide
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
    background: url('../assets/img/nav/shopcar.png') no-repeat 0 0;
    background-size: 50px;
    background-position: 4px 4px;
    width: 60px;
    height: 60px;
    position: fixed;
    bottom: 22px;
    left: 32px;
    z-index: 100;

  }

  .shopCar:hover {
    border-radius: 5px;
    box-shadow: 1px 1px 1px 1px #888888;
    transition: all 0.5s;
  }

  .ad {
    width: 80%;
    height: 400px;
    margin-left: 10%;
  }

</style>
