<template>
  <div>

    <Navs></Navs>
    <div class="row bag">
      <div class="col-md-8 col-md-offset-2">
        <div class="feedify">
          <section class="feedify-item">
            <header class="feedify-item-header clearfix">
              <img alt="" v-bind:src="avatar" class="img-circle pull-left">
              <h1 class="pull-left">{{ username }}</h1>
            </header>
            <footer v-for="info in allInfor">
              <div class="actions">
                <img alt="" v-bind:src="info.imgPath">
                <img alt="" v-bind:src="info.imgPath">
                <ul class="list-inline">
                  <li><a href="#"><i class="icon-heart"></i></a></li>
                  <li><a href="" data-toggle="modal"
                         v-bind:data-target="'#model' + info.id"><i class="icon-speak"></i></a></li>
                  <!--<li><a href="#"><i class="icon-speak"></i></a></li>-->
                  <!--<li class="pull-right"><a href="#"><i class="icon-tripledot"></i></a></li>-->
                  <!--<li class="pull-right"><a href="#"><i class="icon-tripledot"></i></a></li>-->
                </ul>
              </div>
              <div class="legend">
                <h3><a href="#"><i class="icon-heart"></i> 51 Likes</a></h3>
                <h4 class="pull-left "></h4>
                <p></p>
              </div>
              <ul class="comments list-unstyled" v-for="co in info.comment">
                <li>
                  <h4 class="pull-left">{{ co.username }}</h4>
                  <p>{{ co.evaluate }}</p>
                </li>

                <!--模态框-->
                <div class="modal fade" v-bind:id="'model' + info.id" tabindex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                          aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="exampleModalLabel">对商品: {{ info.goodname }} 的评论</h4>
                      </div>
                      <div class="modal-body">
                        <h4 class="text-left h4"></h4>
                        <input type="text" class="form-control" v-model="tempcommon">
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" v-on:click="comment(info.id)" data-dismiss="modal">提交
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
  import im from  '../assets/buyed/img/1.jpg'
  import Navs from './Nav'
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
        tempcommon: '',
        username: '',
        allInfor: [
          {
            id: 1,
            imgPath: im,
            goodname: '可乐',
            comment: [
              {
                evaluate: 'this is just a test',
                username: 'dev'
              },
              {
                evaluate: 'this is just a test',
                username: 'dev'
              },
              {
                evaluate: 'this is just a test',
                username: 'dev'
              }
            ]
          },
          {
            id: 2,
            goodname: '可乐',
            imgPath: "http://182.254.130.205/picture/%E5%8F%AF%E4%B9%90.jpg",
            comment: [
              {
                evaluate: 'this is just a test',
                username: 'dev'
              },
              {
                evaluate: 'this is just a test',
                username: 'dev'
              },
              {
                evaluate: 'this is just a test',
                username: 'dev'
              }
            ]
          },

        ],
        avatar: localStorage.getItem('avatar')
      }
    },
    created(){
      let self = this;
      this.username = localStorage.getItem('username');
//      this.initData();
    },
    mounted(){
    },
    components: {
      Navs
    },
    methods: {
      comment(id){
        console.log(id);
        let self = this;
        console.log(self.tempcommon);

        if(self.tempcommon === ''){
            alert('请输入内容');
            return false;
        }

        for (let i = 0; i < self.allInfor.length; i++) {
            if(self.allInfor[i].id === id){
                self.allInfor[i].comment.push({username: self.username,evaluate: self.tempcommon});
            }
        }
        self.tempcommon = '';

      },
      initData(){
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
            console.log(goodId);
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
          localStorage.setItem('allInfor', tempInfo)
          console.log(tempInfo);
          console.log(this.allInfor)
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

  .bag {
    background: silver;

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
