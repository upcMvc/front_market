<template>
  <div>
      <div class="row bag">
        <div class="col-md-8 col-md-offset-2">
          <div class="feedify">
            <section class="feedify-item">
              <header class="feedify-item-header clearfix">
                <img alt="" src="../assets/perinfo/img/user-2.jpg" class="img-circle pull-left">
                <h1 class="pull-left">李一一</h1>
                <h2 class="pull-right hidden-xs"><a href="#"> 修改个人信息</a></h2>
              </header>
              <div class="feedify-item-body">
                <h2 class="text-left fontA">手机：17854222222</h2>
                <h2 class="text-left fontA">邮箱：lacunak@sina</h2>
              </div>
                <img alt="" src="../assets/perinfo/img/2.png" class="img-responsive center-block">
            </section>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import $ from 'jquery'
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
    name: 'hello',
    data () {
      return {}
    },
    created(){
    },
    components: {},
    methods: {
    }
  }
</script>
<style scoped>
  @import "../../node_modules/bootstrap/dist/css/bootstrap.css";
  @import "../assets/perinfo/css/feedify.min.css";
  @import "../assets/perinfo/css/feedify-theme.min.css";
  .bag{
    background: dimgray ;
    /*background: -webkit-linear-gradient(top left,  lightgray 0%, LightSlateGray  100%);*/
    /*background: linear-gradient(to bottom right, lightgray   100%, LightSlateGray  0%);*/
    z-index:0;
    margin-top: -60px;
  }
  .fontA{
    font-family: "akkurat", sans-serif;
    margin-top: 10px;
    font-size: 20px;
  }
</style>
