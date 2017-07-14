<template>
  <div class="heart">
    <h3>点击下面的红心查看效果！</h3>
    <div class="feed" id="feed1">
      <p>W3C <a href="http://www.w3.org/" target="_blank">http://www.w3.org/</a></p>
      <div class="heart " id="like1" rel="like"></div>
      <div class="likeCount" id="likeCount1">14</div>
    </div>
  </div>
</template>

<script>
  import API from '../config/req'
  import Navs from './Nav.vue'
  import heartneed from './heartneed.js'
  export default {
    name: 'heart',
    data () {
      return {}
    },
    mounted(){
      this.ready()
    },
    components: {},
    methods: {
      ready(){
        $('body').on("click", '.heart', function () {
          var A = $(this).attr("id");
          var B = A.split("like");
          var messageID = B[1];
          var C = parseInt($("#likeCount" + messageID).html());
          $(this).css("background-position", "")
          var D = $(this).attr("rel");
          if (D === 'like') {
            $("#likeCount" + messageID).html(C + 1);
            $(this).addClass("heartAnimation").attr("rel", "unlike");
          }
          else {
            $("#likeCount" + messageID).html(C - 1);
            $(this).removeClass("heartAnimation").attr("rel", "like");
            $(this).css("background-position", "left");
          }
        });
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
