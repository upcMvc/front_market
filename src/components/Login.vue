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

          <div class="form-group">
            <!--<label class="col-sm-6 control-label fontC" style="display: none"></label>-->
            <div class="col-sm-offset-6 col-sm-6 fontC" style="position: relative">
              <button style="position: absolute;left: 8px" type="button" class="btn btn-default col-md-4 col-md-offset-1 btnC" data-toggle="modal" data-target="#info">
                  忘记密码
              </button>
              <div class="col-sm-4"> </div>
              <button style="position: absolute;right:30px" type="button" class="btn btn-default col-md-4 col-md-offset-2 btnC" @click="reg()">
                注册
              </button>
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

    <!--模态框-->
    <div class="modal fade" id="info" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="exampleModalLabel">请输入用户名，系统会自动发送新的密码</h4>
          </div>
          <div class="modal-body">
                <h4 class="text-left h4">用户名:</h4>
                <input type="text" class="form-control" v-model="forgetName">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="forget()">提交</button>
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
        forgetName:''
      }
    },
    created(){

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
            localStorage.setItem("avatar",response.data.user.avatar);
            this.$router.push({name: 'index'})
          }
        }, () => {
          console.log('error!')
        })
      },
      reg(){
        this.$router.push({path: '/reg'})
      },


      //发送用户名
      forget(){
        let self = this
        self.$http.get(API.forget+'?userName='+self.forgetName).then((response)=>{
            alert("提交成功")
          console.log(response.body)
          if(response.body.id == -1){
                alert("用户名不存在")
          }else {
              alert("请查看邮件")
          }
        },()=>{
            alert("链接服务器失败")
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/login/css/styles.css";
  @import "../assets/login/css/tncode.css";
  .btnC{
    color:Tomato;
  }
</style>
