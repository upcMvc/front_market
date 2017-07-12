<template>
  <div id="login">
    <div class="wrapper">
      <div class="container">
        <form class="form-horizontal">
          <div class="form-group fontH">
            <!--<label  class="col-sm-4 control-label">Welcome to shopping~</label>-->
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
            <div class="col-sm-6">
              <input id="tncode" class="tncode" placeholder="验证图片">
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-6 col-sm-6 fontC">
              <!--<button type="submit" class="btn btn-default">Sign in</button>-->
              <button type="button" id="reg-button" v-on:click="sub">登录</button>
            </div>
          </div>
        </form>

        <!--<form class="form">-->
        <!--<h1>Welcome to shopping~</h1><br>-->
        <!--<input type="text" placeholder="Username"><br>-->
        <!--<input type="password" placeholder="Password"><br>-->
        <!--<button type="submit" id="login-button">Login</button>-->
        <!--</form>-->
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
        msg: 'Welcome to Your Vue.js App',
        username: '',
        password: '',
      }
    },
    mounted() {
      tncode.init();
    },
    methods: {
      sub (){
        let tn = document.getElementById('tncode');
        if(tn.value != '验证成功'){
            alert('请输入验证码');
            return false;
        }


        let postData = {
          username: this.username,
          password: this.password
        };
        this.$http.post(API.logIn, postData).then((response) => {
          if (response.data.id == -1) {
            alert(response.data.message);
          } else {
            //console.log(response.data);
            localStorage.setItem("username", response.data.user.username);
            //let username = localStorage.getItem("username");
            //console.log(username);
            localStorage.setItem("token", response.data.token);
            //let token = localStorage.getItem("token");
            //console.log(token);
            localStorage.setItem("email",response.data.user.email);
            //let email = localStorage.getItem("email");
            localStorage.setItem("id",response.data.user.id);
            localStorage.setItem("phone",response.data.user.phone);
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
  @import "../assets/login/css/styles.css";
  @import "../assets/login/css/tncode.css";

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: Coral;
  }
</style>
