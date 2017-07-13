<template>
  <div id="reg">
    <div class="wrapper">
      <div class="container">
        <form class="form-horizontal">
          <div class="form-group fontH">
            <h1>Join us!</h1>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label fontC">用户名</label>
            <div class="col-sm-8">
              <input type="text" placeholder="username" v-model="username">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label fontC">密码</label>
            <div class="col-sm-8">
              <input type="password" placeholder="Password" v-model="password">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label fontC">确认密码</label>
            <div class="col-sm-8">
              <input type="password" placeholder="Confirm Password" v-model="confirmPassword">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label fontC">邮箱</label>
            <div class="col-sm-8">
              <input type="text" placeholder="Email" v-model="email">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label fontC">手机号</label>
            <div class="col-sm-8">
              <input type="text" placeholder="Mobile" v-model="phone">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-4 col-sm-8 fontC">
              <button type="button" @click="submit()">注册</button>
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
  import API from '../config/req'
  export default {
    name: 'reg',
    data () {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: ''
      }
    },
    methods: {
      initPost(){
        let postData = {
          username: this.username,
          password: this.password,
          email: this.email,
          phone: this.phone
        };
        let self = this;
        self.$http.post(API.reg, postData).then((response) => {
          console.log(response);
          if (response.body.id === -1) {
            alert(response.body.message);
          } else {
            localStorage.setItem("username", response.data.user.username);
            let username = localStorage.getItem("username");
            console.log("username: " + username);
            localStorage.setItem("token", response.data.token);
            let token = localStorage.getItem("token");
            console.log("token: " + token);
            localStorage.setItem("email", response.data.user.email);
            let email = localStorage.getItem("email");
            console.log("email: " + email);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("phone", response.data.user.phone);
            let phone = localStorage.getItem("phone");
            console.log("phone: " + phone);
          }
        }, () => {
          console.log("error")
        })
      },
      submit(){
        let validateMob = /^1[3|4|5|7|8]\d{9}$/; //验证手机号格式的正则
        let validateEma = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/;//验证email格式的正则
        if (this.username === "") {
          alert("请填写用户名");
        } else if (this.password === "") {
          alert("请填写密码");
        } else if (this.password !== this.confirmPassword) {
          alert("确认密码与密码不一致！");
        } else if (!validateEma.test(this.email)) {
          alert("请填写正确的邮箱地址");
        } else if (!validateMob.test(this.phone)) {
          alert("请填写正确的手机号码");
        } else {
          this.initPost();
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/reg/css/styles.css";

  .picmove {
    margin-top: -30px;
    margin-left: -50%;
  }

  .fontH {
    margin-left: 80px;
    margin-top: -40px;

  }

  .fontC {
    font-weight: normal;
    font-family: Microsoft YaHei;
    font-size: 20px;
    font-size: medium;
  }

</style>
