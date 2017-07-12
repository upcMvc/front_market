<template>
  <div id="login">
    <div class="wrapper">
      <div class="container">
        <form class="form-horizontal">
          <div class="form-group fontH">
            <h1>Shopping now!</h1>
          </div>
          <div class="form-group">
            <label class="col-sm-6 control-label fontC">用户名</label>
            <div class="col-sm-6">
              <input type="text" placeholder="用户名" v-model="username">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-6 control-label fontC">密码</label>
            <div class="col-sm-6">
              <input type="password" placeholder="Password" v-model="password">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-6 control-label fontC">验证码</label>
            <input type="text" style="display: none;" v-model="tncodeSucess">
            <div class="col-sm-6">
              <input id="tncode" class="tncode" placeholder="验证图片">
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-6 col-sm-6 fontC">
              <!--<button type="submit" class="btn btn-default">Sign in</button>-->
              <button type="button" id="reg-button" v-on:click="submit">登录</button>
            </div>
          </div>
        </form>

      </div>

      <ul class="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <p><img src="../assets/login/img/9.jpg" alt="picture" class="picmove"></p>
  </div>
</template>

<script>
  import API from '../config/req'
  import tncode from  '../assets/login/script/tn_code'
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        tncodeSucess: ''
      }
    },
    mounted() {
      tncode.init();
    },
    methods: {
      submit (){
        let postData = {
          username: this.username,
          password: this.password
        };
        this.$http.post(API.logIn, postData).then((response) => {
            if(response.data.id == -1){
                alert(response.data.id);
            }
        }, () => {
            console.log('error !')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../node_modules/bootstrap/dist/css/bootstrap.css";
  @import "../assets/login/css/styles.css";
  @import "../assets/login/css/tncode.css";
</style>
