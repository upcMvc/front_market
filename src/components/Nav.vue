<template>
  <div id="nav">
    <div id="wrapper" v-bind:class="{'toggled':isClosed}">
      <!-- Sidebar -->
      <nav  id="sidebar-wrapper" role="navigation">
        <ul class="sidebar-nav">
          <li>
            <a href="/index">
              <img src="../assets/img/nav/home.png" alt="" width="22px">
              &nbsp;&nbsp;主页
            </a>
          </li>
          <li>
            <a href="/index#daily">
              <i class="fa fa-fw"></i>
              <img src="../assets/img/nav/stuff.png" alt="" width="22px">
              &nbsp;&nbsp;日常用品
            </a>
          </li>
          <li>
            <a href="/index#snacks">
              <img src="../assets/img/nav/snack.png" alt="" width="22px">
              &nbsp;&nbsp;零食
            </a>
          </li>
          <li>
            <a href="/index#fruits">
              <img src="../assets/img/nav/fruit.png" alt="" width="22px">
              &nbsp;&nbsp;水果
            </a>
          </li>
          <li>
            <a href="/index#drink">
              <img src="../assets/img/nav/drink.png" alt="" width="22px">
              &nbsp;&nbsp;饮品
            </a>
          </li>
          <li>
            <a href="/shopcar">
              <img src="../assets/img/nav/shopcar.png" alt="" width="22px">
              &nbsp;&nbsp;购物车
            </a>
          </li>
          <li>
            <a href="/perinfo">
              <img src="../assets/img/nav/person.png" alt="" width="22px">
              &nbsp;&nbsp;个人信息
            </a>
            <!--<a href="/perinfo"><i class="fa fa-fw fa-dropbox"></i>个人信息</a>-->
          </li>
          <li>
            <a href="/buyed">
              <img src="../assets/img/nav/histroy.png" alt="" width="22px">
              &nbsp;&nbsp;购买历史
            </a>
            <!--<a href="/history"><i class="fa fa-fw fa-twitter"></i>历史</a>-->
          </li>
        </ul>
      </nav>
      <!-- /#sidebar-wrapper -->
      <!-- Page Content -->
      <div id="page-content-wrapper">
        <button type="button" class="hamburger animated fadeInLeft" v-bind:class="{'is-closed':!isClosed,'is-open':isClosed}" @click="hamburger_cross()">
          <span class="hamb-top" style="background: salmon"></span>
          <span class="hamb-middle" style="background: salmon"></span>
          <span class="hamb-bottom" style="background: salmon"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import '../../node_modules/bootstrap/dist/js/bootstrap'
  import Nav from './Nav.vue'
  export default {
    name: 'nav',
    data () {
      return {
        isClosed: false,  //判断左侧导航栏的开关
        overlay:''
      }
    },
    created(){
        this.myInit()
    },
    mounted(){

    },
    methods : {
      myInit(){
        this.overlay = $('.overlay')
      },
      hamburger_cross(){
        if (this.isClosed == true) {
          this.overlay.hide()
          this.isClosed = false;
        } else {
          this.overlay.show()
          this.isClosed = true
        }
      }
    }
  }
</script>


<style scoped>
  @import '../assets/silder/css/style.css';
</style>
