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
            <button type="button" class="btn btn-primary btn-lg " data-toggle="modal" data-target="#info"
                    style="margin-left: 325px">
              忘记密码
            </button>
            <button type="button" class="btn btn-primary btn-lg "
                    style="margin-left: 325px">
              注册
            </button>
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

    <!--模态框-->
    <div class="modal fade" id="info" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="exampleModalLabel">请输入邮箱，系统会自动发送新的密码</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <p class="text-left p">邮箱:</p>
                <input type="text" class="form-control" >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary">提交</button>
          </div>
        </div>
      </div>
    </div>
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
    created(){
      this.$router.push({path: '/login'})
    },
    mounted() {
      tncode.init();
    },
    methods: {
      sub (){
        let tn = document.getElementById('tncode');
        if (tn.value != '验证成功') {
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
            localStorage.setItem("email", response.data.user.email);
            //let email = localStorage.getItem("email");
            localStorage.setItem("id",response.data.user.id);
            localStorage.setItem("phone",response.data.user.phone);
            this.$router.push({name: 'index'})
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

  .formM {
    width: 10px;
    text-align: center;
  }

</style>
