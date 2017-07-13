<template>
  <div>
    <div class="row bag">
      <div class="col-md-8 col-md-offset-2">
        <div class="feedify">
          <section class="feedify-item">
            <header class="feedify-item-header clearfix">
              <img alt="" v-bind:src="avatar" class="img-circle pull-left">
              <h1 class="pull-left">{{ username }}</h1>
            </header>
            <footer v-for="i in 5">
              <div class="actions">
                <img alt="" src="../assets/perinfo/img/1.jpg">
                <ul class="list-inline">

                  <li><a href="#"><i class="icon-heart"></i></a></li>
                  <li><a href="#"><i class="icon-speak"></i></a></li>
                  <li class="pull-right"><a href="#"><i class="icon-tripledot"></i></a></li>
                </ul>
              </div>
              <div class="legend">
                <h3><a href="#"><i class="icon-heart"></i> 51 Likes</a></h3>
                <h4 class="pull-left ">李三</h4>
                <p>好吃！</p>
              </div>
              <ul class="comments list-unstyled">
                <li>
                  <h4 class="pull-left ">李四</h4>
                  <p>下次还来！！</p>
                </li>
                <li>
                  <h4 class="pull-left ">李五</h4>
                  <p>谢谢店家！</p>
                </li>
              </ul>
            </footer>
          </section>
        </div>
      </div>
    </div>
    <!--<p><img src="../assets/perinfo/img/bg-1.jpg" alt="picture" class="picmove"></p>-->
  </div>
</template>
<script>
  import $ from 'jquery'
  import API from '../config/req'
  $(function () {
    $('.feedify').feedify();
  });
  !function (e) {
    e.fn.feedify = function () {
      var i = this;
      e(window).bind("scroll touchmove", function (d) {
        i.children(".feedify-item").each(function () {
          var d = e(this),
            t = i.width(),
            s = e(this).height(),
            h = e(this).children(".feedify-item-header").outerHeight(),
            f = d.offset(),
            o = f.top - e(window).scrollTop(),
            c = "-" + (s - h);
          o > c && 0 > o ? (e(this).addClass("fixed").removeClass("bottom").children(".feedify-item-header").css("width", t),
            e(this).children(".feedify-item-body").css("paddingTop", h),
            e(this).children(".feedify-item-header").css("width", t)) : c >= o ? (e(this).removeClass("fixed").addClass("bottom"),
            e(this).children(".feedify-item-body").css("paddingTop", h),
            e(this).children(".feedify-item-header").css("width", t)) : (e(this).removeClass("fixed").removeClass("bottom").children(".feedify-item-header").css("width", "auto"),
            e(this).children(".feedify-item-body").css("paddingTop", "0"),
            e(this).children(".feedify-item-header").css("width", "auto"))
        })
      })
    }
  }(jQuery);
  export default {
    name: 'buyed',
    data () {
      return {
        username: '',
        allInfor: [],
        avatar: localStorage.getItem('avatar')
      }
    },
    created(){
      let self = this;
      this.username = localStorage.getItem('username');
    },
    mounted(){

      this.initData();
    },
    components: {},
    methods: {
      initData(){

          console.log(localStorage.getItem('avatar'))
        let token = localStorage.getItem('token');
        let userid = localStorage.getItem('id');
        let sendData = {
          Authorization: token,
          userId: userid
        };
        let self = this;
        this.$http.get(API.findShopRecord, {params: sendData}).then((response) => {
          let tempInfo = response.data;
          for (let i = 0; i < tempInfo.length; i++) {
            let goodId = tempInfo[i].goodId;
            let sendData = {
              Authorization: token,
              goodId: goodId
            };
            self.$http.get(API.getGoodImage, {params: sendData}).then((response) => {
              tempInfo[i].imgPath = response.bodyText
            }, () => {
            });

            self.$http.get(API.getCommentn, {params: sendData}).then((response) => {
              tempInfo[i].comment = response.data;
            }, () => {
            });
          }

          self.allInfor = tempInfo;
          console.log(tempInfo)
         }, () => {
        });
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../node_modules/bootstrap/dist/css/bootstrap.css";
  /*@import "http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,800,800italic,700italic";*/
  @import "../assets/perinfo/css/feedify.min.css";
  @import "../assets/perinfo/css/feedify-theme.min.css";
  .bag{
    background: silver ;

    /*background: -webkit-linear-gradient(top left,  lightgray 0%, LightSlateGray  100%);*/
    /*background: linear-gradient(to bottom right, lightgray   100%, LightSlateGray  0%);*/
    z-index: 0;
    margin-top: -60px;
  }

  .fontA {
    font-family: "akkurat", sans-serif;
    margin-top: 10px;
  }
</style>
