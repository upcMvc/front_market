<template>
  <div>
    <div class="row bag container">
      <div class="col-md-8 col-md-offset-2">
        <div class="feedify">
          <section class="feedify-item">
            <header class="feedify-item-header clearfix">
              <img alt="" v-bind:src="avatar" class="img-circle pull-left">
              <h1 class="pull-left">{{username}}</h1>
              <h2 class="pull-right hidden-xs">
                <button class="btn btn-default" data-toggle="modal" data-target="#info">添加新的商品</button>
              </h2>
            </header>
            <footer>
              <div style="height: 900px;width: 100%">
                <div>
                  <div class="wrapper">
                    <img src="http://182.254.130.205/picture/%E7%AC%941.jpg" alt="" class="left">
                    <div class="right">
                      <p class="text-left  myfont">商品名：{{1}}</p><br>
                      <p class="text-left  myfont">仓库地址：{{}}</p><br>
                      <p class="text-left  myfont">商品价格：{{}}</p><br>
                      <p class="text-left  myfont">商品种类：{{}}</p><br>
                      <p class="text-left  myfont">商品描述：{{}}</p><br>
                      <button class="btn btn-default btn-lg">删除</button>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </section>
        </div>
      </div>
      <div class="modal fade" id="info" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title" id="exampleModalLabel">添加新的商品</h4>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <p class="text-left p">商品名称:</p>
                  <input type="text" class="form-control" v-model="goodname">
                </div>
                <div class="form-group">
                  <p class="text-left p">仓库地址:</p>
                  <input type="text" class="form-control" v-model="goodaddr">
                </div>
                <div class="form-group">
                  <p class="text-left p">商品价格:</p>
                  <input type="text" class="form-control" v-model="goodprice">
                </div>
                <div class="form-group">
                  <p class="text-left p">数量:</p>
                  <input type="text" class="form-control" v-model="goodnum">
                </div>
                <div class="form-group">
                  <p class="text-left p">商品种类:</p>
                  <select v-model="goodkind">
                    <option value="日常用品">日常用品</option>
                    <option value="零食">零食</option>
                    <option value="饮品">饮品</option>
                    <option value="水果">水果</option>
                  </select>
                </div>
                <div class="form-group">
                  <p class="text-left p">商品描述:</p>
                  <input type="text" class="form-control" v-model="gooddesc">
                </div>
                <Pic v-on:picInfo="getPic"></Pic>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit()">提交</button>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!--<p><img src="../assets/perinfo/img/bg-1.jpg" alt="picture" class="picmove"></p>-->
  </div>
</template>
<script>
  import $ from 'jquery'
  import API from '../config/req'
  import Pic from './pic/Pic.vue'
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
    name: 'hello',
    data () {
      return {
        goodname: '',
        goodaddr: '',
        goodprice: '',
        gooddesc: '',
        goodkind: '日常用品',
        goodnum: '',
        avatar: '',
        username: '',
        reader: '',
        suffix: '',
        stuff: []
      }
    },
    created(){
      this.username = localStorage.getItem('username')
      this.avatar = localStorage.getItem('avatar')
      this.getInfo()
    },
    components: {
      Pic
    },
    methods: {
      submit(){
        let self = this
        let data = {
          Authorization: localStorage.getItem('token'),
          name: self.goodname,
          kind: self.goodkind,
          describe: self.gooddesc,
          num: self.goodnum,
          price: self.goodprice,
          reader: self.reader,
          suffix: self.suffix
        }
        this.$http.post(API.pushgood, data).then((response) => {
            console.log(response)
        }, () => {
          alert("访问服务器失败")
        })
      },
      getInfo(){
        let data = {
          Authorization: localStorage.getItem('token'),
          userId : localStorage.getItem('id')
        }
        this.$http.post(API.getGood, {params:data}).then((response) => {
          console.log(response)
        }, () => {
          alert("访问服务器失败")
        })
      },
      getPic(reader, suffix){
        this.reader = reader
        this.suffix = suffix
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

  .left {
    float: left;
    width: 30%;
  }

  .right {
    float: left;
    width: 70%;
    height: 100%;
    padding: 20px;

  }

  .wrapper {
    width: 100%;
    height: 500px;
    overflow: hidden;
  }

  .myfont {
    font-family: "Microsoft YaHei", sans-serif;
    font-size: 25px;
  }
</style>
