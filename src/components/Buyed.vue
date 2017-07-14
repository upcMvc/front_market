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
                <img alt="" v-bind:src="info.imgPath1">
                <img alt="" v-bind:src="info.imgPath2">
                <ul class="list-inline">
                  <li style="position: relative">
                    <i style="position: absolute;top:-52px;left: -50px" class="heart" v-bind:id="'h' + info.id" v-on:click="heart(info.id)" rel="like"></i>
                  </li>
                  <li><a href="" data-toggle="modal"
                         v-bind:data-target="'#model' + info.id"><i class="icon-speak"></i></a></li>
                  <!--<li><a href="#"><i class="icon-speak"></i></a></li>-->
                  <!--<li class="pull-right"><a href="#"><i class="icon-tripledot"></i></a></li>-->
                  <!--<li class="pull-right"><a href="#"><i class="icon-tripledot"></i></a></li>-->
                </ul>
              </div>
              <div class="legend">
                <h3 style="position: relative">
                  <!--<i class="icon-heart"></i>-->
                  <i class="heart" style="background-position: right;position: absolute;left: 330px;top: -32px;"></i>
                  {{ info.like }} Likes
                </h3>
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
                        <button type="button" class="btn btn-primary" v-on:click="comment(info.id)"
                                data-dismiss="modal">提交
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
  import Navs from './Nav'
  export default {
    name: 'buyed',
    data () {
      return {
        tempcommon: '',
        username: '',
        allInfor: [
          {
            id: 1,
            imgPath1: 'http://182.254.130.205/picture/%E7%AC%94.jpg',
            imgPath2: 'http://182.254.130.205/picture/%E7%AC%941.jpg',
            like: 21,
            goodname: '胡萝卜卡通笔',
            comment: [
              {
                evaluate: '超级润滑！！！',
                username: '小明'
              },
              {
                evaluate: '网站写得真好看！！！',
                username: '凡'
              },
              {
                evaluate: '那可不！',
                username: '熙阳'
              },
              {
                evaluate: '超级好用',
                username: '匿名'
              }
            ]
          },
          {
            id: 2,
            goodname: '橙子',
            like: 7,
            imgPath1: "http://182.254.130.205/picture/%E6%A9%99%E5%AD%901.jpg",
            imgPath2: "http://182.254.130.205/picture/%E6%A9%99%E5%AD%90.jpg",
            comment: [
              {
                evaluate: '我不想评论',
                username: '陈子枫'
              },
              {
                evaluate: '真好吃！！',
                username: '琪琪'
              },
              {
                evaluate: '那可不',
                username: '小明'
              }
            ]
          },
          {
            id: 3,
            goodname: '麻薯',
            like: 50,
            imgPath1: "http://182.254.130.205/picture/%E9%BA%BB%E8%96%AF1.jpg",
            imgPath2: "http://182.254.130.205/picture/%E9%BA%BB%E8%96%AF.jpg",
            comment: [
              {
                evaluate: '贼好吃',
                username: '小红'
              },
              {
                evaluate: '还可以',
                username: '小丽'
              },
              {
                evaluate: '我是吃货',
                username: '默默'
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
      heart(id){
        let self = this;

        let h = $('#h' + id);
        if (h.attr("rel") === 'like') {
          h.addClass('heartAnimation').attr("rel", "unlike");
          for (let i = 0; i < self.allInfor.length; i++) {
            if (self.allInfor[i].id === id) {
              self.allInfor[i].like ++;
              break;
            }
          }
        } else {
          h.removeClass("heartAnimation").attr("rel", "like");
          h.css("background-position", "left");
          for (let i = 0; i < self.allInfor.length; i++) {
            if (self.allInfor[i].id === id) {
              self.allInfor[i].like --;
              break;
            }
          }
        }
      },
      comment(id){
        console.log(id);
        let self = this;
        console.log(self.tempcommon);

        if (self.tempcommon === '') {
          alert('请输入内容');
          return false;
        }

        for (let i = 0; i < self.allInfor.length; i++) {
          if (self.allInfor[i].id === id) {
            self.allInfor[i].comment.push({username: self.username, evaluate: self.tempcommon});
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
  @import "../assets/heart/css/default.css";
  @import "../assets/heart/css/style.css";
  @import "../assets/heart/css/normalize.css";

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
