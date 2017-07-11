<template>
  <div id="reg">
    <div class="wrapper">
      <div class="container">
        <!--<h1>Welcome to shopping~</h1>-->
        <form class="form-horizontal">
          <div class="form-group fontH">
            <!--<label  class="col-sm-4 control-label">Welcome to shopping~</label>-->
            <h1>Join us!</h1>
          </div>
          <div class="form-group">
            <label  class="col-sm-4 control-label fontC" style="font-size: 20px">用户名</label>
            <div class="col-sm-8">
              <input type="email"  placeholder="Email">
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-4 control-label fontC" style="font-size: 20px">密码</label>
            <div class="col-sm-8">
              <input type="password" placeholder="Password">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label fontC" style="font-size: 20px">确认密码</label>
            <div class="col-sm-8">
              <input type="password"  placeholder="Confirm Password">
            </div>
          </div>

          <div class="form-group">
          <label  class="col-sm-4 control-label fontC" style="font-size: 20px">邮箱</label>
          <div class="col-sm-8">
            <input type="e-mail" placeholder="Email">
          </div>

          </div>
            <div class="form-group">
              <label  class="col-sm-4 control-label fontC" style="font-size: 20px">手机号</label>
              <div class="col-sm-8">
                <input type="text"  placeholder="Mobile">
              </div>
            </div>

          <div class="form-group">
            <div class="col-sm-offset-4 col-sm-8 fontC">
              <!--<button type="submit" class="btn btn-default">Sign in</button>-->
              <button type="submit" id="reg-button">注册</button>
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
    <p><img src="../assets/reg/img/5.png" alt="picture" class="picmove"></p>
  </div>
</template>

<script>
  export default {
    name: 'reg',
    data () {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/reg/css/styles.css";
  .picmove{

    margin-top: -30px;
    margin-left: -50%;

  }
  .fontH{
    margin-left: 80px;
    margin-top: -40px;

  }
  .fontC{
    font-weight: normal;
    font-family: Microsoft YaHei;
    font-size: 25px;
    font-size: medium;
  }

</style>
