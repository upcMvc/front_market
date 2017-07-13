<template>
  <div id="perInfo">
      <div class="row bag">
        <div class="col-md-8 col-md-offset-2">
          <div class="feedify">
            <section class="feedify-item">
              <header class="feedify-item-header clearfix">
                <img alt="" src="../assets/perinfo/img/user-2.jpg" class="img-circle pull-left">
                <h1 class="pull-left">李一一</h1>
                <h2 class="pull-right hidden-xs">
                  <button class="btn btn-default" data-toggle="modal" data-target="#info">修改个人信息</button>
                </h2>
              </header>
              <div class="feedify-item-body">
                <h2 class="text-left fontA">手机：17854222222</h2>
                <h2 class="text-left fontA">邮箱：lacunak@sina</h2>
                <h2 class="text-left fontA">地址：{{address}}(地址不准?请于地图选点)</h2>
              </div>
              <Locate v-on:mapReturn="addr"></Locate>
            </section>
          </div>
        </div>
      </div>
    <!--模态框-->
    <div class="modal fade" id="info" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="exampleModalLabel">修改个人信息</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <p class="text-left p">姓名:</p>
                <input type="text" class="form-control">
              </div>
              <div class="form-group">
                <p class="text-left p">手机号:</p>
                <input type="text" class="form-control" >
              </div>
              <div class="form-group">
                <p class="text-left p">邮箱:</p>
                <input type="text" class="form-control" >
              </div>
              <div class="form-group">
                <p class="text-left p">地址:</p>
                <input type="text" class="form-control" >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary">提交</button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
  import $ from 'jquery'
  import Locate from './map/Locate.vue'
  $(function() {
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
    name: 'perInfo',
    data () {
      return {
          address:''
      }
    },
    created(){
    },
    components: {
        Locate
    },
    methods: {
      addr(pt,addCom){
        console.log(pt)
        console.log(addCom)
        this.address = addCom.province + ", " + addCom.city + ", " + addCom.district + ", " + addCom.street + ", " + addCom.streetNumber
        let data = {
          addressId : '',
          location: '',
          latitude: pt.coords.latitude,
          longitude: pt.coords.longitude,
          city: addCom.city
        }
        this.$http.post().then((response)=>{

        },()=>{

        })
      }
    }
  }
</script>
<style scoped>
  @import "../../node_modules/bootstrap/dist/css/bootstrap.css";
  @import "../assets/perinfo/css/feedify.min.css";
  @import "../assets/perinfo/css/feedify-theme.min.css";
  .bag{
    background: dimgray ;
    z-index:0;
    margin-top: -60px;
    height: 1000px;
  }
  .fontA{
    font-family: "akkurat", sans-serif;
    margin-top: 10px;
    font-size: 20px;
  }
</style>
