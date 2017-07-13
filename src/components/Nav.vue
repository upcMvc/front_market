<template>
  <div id="nav">
    <div id="wrapper" v-bind:class="{'toggled':isClosed}">
      <!-- Sidebar -->
      <nav  id="sidebar-wrapper" role="navigation">
        <ul class="sidebar-nav">
          <li>
            <a href="#" ><i class="fa fa-fw fa-home"></i>主页</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-fw fa-folder"></i>Page one</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-fw fa-file-o"></i>Second page</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-fw fa-cog"></i>Third page</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-fw fa-bank"></i>Page four</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-fw fa-dropbox"></i>Page 5</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-fw fa-twitter"></i>Last page</a>
          </li>
        </ul>
      </nav>
      <!-- /#sidebar-wrapper -->
      <!-- Page Content -->
      <div id="page-content-wrapper">
        <button type="button" class="hamburger animated fadeInLeft" v-bind:class="{'is-closed':!isClosed,'is-open':isClosed}" @click="hamburger_cross()">
          <span class="hamb-top" style="background: DarkSalmon"></span>
          <span class="hamb-middle" style="background: DarkSalmon"></span>
          <span class="hamb-bottom" style="background: DarkSalmon"></span>
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
