<template>

  <div>
    <div class="row bag">

      <div class="col-md-8 col-md-offset-2">
        <div class="feedify">
          <section class="feedify-item">
            <header class="feedify-item-header clearfix">
              <img alt="" src="../assets/perinfo/img/user-2.jpg" class="img-circle pull-left">
              <h1 class="pull-left">李一一</h1>

            </header>



            <footer>
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
                <h4 class="pull-left ">Marcus Lewis</h4>
                <p>Your bones don't break, mine do.</p>
              </div>
              <ul class="comments list-unstyled">
                <li>
                  <h4 class="pull-left ">Sawyer Flint</h4>
                  <p>You think water moves fast? You should see ice. It moves like it has a mind.</p>
                </li>
                <li>
                  <h4 class="pull-left ">Chelsea McKay</h4>
                  <p>Now that there is the Tec-9, a crappy spray gun from South Miami.</p>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../node_modules/bootstrap/dist/css/bootstrap.css";
  /*@import "http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,800,800italic,700italic";*/
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
  }


</style>
