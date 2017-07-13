<template>
  <div id="history">
    <Navs></Navs>
    <div class="product" v-for="h in history">
      <div class="make3D">
        <img src="../assets/good/img/8.jpg" alt="">
        <div class="stats">
          <div class="stats-container">
            <span class="product_price">¥{{ h.price }}</span>
            <span class="product_name">{{ h.goodName }}</span>   <!--加入商品详细信息-->
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import BScroll from 'better-scroll'
  import API from '../config/req'
  import Navs from './Nav'
  export default {
    name: 'history',
    data () {
      return {
        history:[]
      }
    },
    created(){
      this.getHistory();
    //  this.deleteHistory() 清空浏览记录
    },
    methods:{
      getHistory(){
        let data = {
          Authorization: localStorage.getItem('token'),
          userId:localStorage.getItem('id')
        };
        let self = this;
        self.$http.get(API.history+'/find',{params:data}).then((response)=> {
            this.history=response.body;
            console.log(this.history)
        },()=>{
          console.log("error")
        })
      },
      //清空浏览记录
      deleteHistory(){
        let data = {
          Authorization: localStorage.getItem('token'),
          userId:localStorage.getItem('id')
        };
        let self=this;
        self.$http.post(API.history+'/deleteall',data).then((response)=>{
        console.log(response.data);
        },()=>{
            console.log("delete error")
        })
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
      }
    },
    components:{
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
