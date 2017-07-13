<template>
  <div id="login">
    <div class="wrapper ">
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
            <div class="col-sm-6">
              <input id="tncode" class="tncode" placeholder="验证图片">
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-6 col-sm-6 fontC">
              <button type="button" id="reg-button" @click="sub">登录</button>
            </div>
          </div>
          <div class="formM">
            <button type="button" class="btn btn-primary btn-lg " data-toggle="modal" data-target="#myModal" style="margin-left: 325px">
             忘记密码
            </button>
          <button type="button" class="btn btn-primary btn-lg " data-toggle="modal" data-target="#myModal" style="margin-left: 325px">
            注册
          </button>
      </div>


        </form>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">重置密码</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  输入邮箱账号，将给您发送重置密码的邮件
                  <div class="col-sm-8">
                    <input type="text" placeholder="Email" v-model="email" style="margin-left: 175px">
                  </div>
                </div>

<<<<<<< HEAD
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">发送</button>
              </div>
            </div>
          </div>
        </div>
=======
>>>>>>> 4ea4a90096dfe5eecf18448cdc8cf9f9ce74058f
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
            alert(response.data.id);
            alert(response.data.message);
          } else {
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
      },
      reg(){
        this.$router.push({path: '/reg'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  @import "../assets/login/css/styles.css";
  @import "../assets/login/css/tncode.css";
  .formM{
    width: 10px;
    text-align: center;
  }

</style>
