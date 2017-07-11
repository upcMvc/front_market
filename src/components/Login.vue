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
            <label  class="col-sm-6 control-label fontC">用户名</label>
            <div class="col-sm-6">
              <input type="email"  placeholder="Email">
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-6 control-label fontC">密码</label>
            <div class="col-sm-6">
              <input type="password" placeholder="Password">
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-6 control-label fontC">验证码</label>
            <div class="col-sm-6">
              <input type="img" placeholder="验证图片"><!--加入验证码-->
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-6 col-sm-6 fontC">
              <!--<button type="submit" class="btn btn-default">Sign in</button>-->
              <button type="submit" id="reg-button" >登录</button>
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
  export default {
    name: 'login',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/login/css/styles.css";
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
    color: Coral ;
  }
</style>
