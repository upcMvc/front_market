<template>

  <div id="perInfo">

    <Navs></Navs>
      <div class="row bag">
        <div class="col-md-8 col-md-offset-2">
          <div class="feedify">
            <section class="feedify-item">
              <header class="feedify-item-header clearfix">
                <img src="../assets/perinfo/img/user-2.jpg" class="img-circle pull-left" id="head" @click="changeHead()">
                <h1 class="pull-left">{{username}}</h1>
                <h2 class="pull-right hidden-xs">
                  <button class="btn btn-default" data-toggle="modal" data-target="#info">修改个人信息</button>
                  <button class="btn btn-default" data-toggle="modal" data-target="#pw">修改密码</button>
                </h2>
              </header>
              <div class="feedify-item-body" v-for="">
                <h2 class="text-left fontA">手机：{{phone}}</h2>
                <h2 class="text-left fontA">邮箱：{{email}}</h2>
                <h2 class="text-left fontA">地址：{{address}}(地址不准?请于地图选点)</h2>
              </div>
              <Locate v-on:mapReturn="addr"></Locate>
            </section>
          </div>
        </div>
      </div>
    <button id="vis" style="display: none" data-toggle="modal" data-target="#chhead">头像</button>
    <!--模态框-->
    <div class="modal fade" id="info" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="exampleModalLabel">修改个人信息</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <p class="text-left p">姓名:</p>
                <input type="text" class="form-control" v-model="username" readonly>
              </div>
              <div class="form-group">
                <p class="text-left p">手机号:</p>
                <input type="text" class="form-control" v-model="phone">
              </div>
              <div class="form-group">
                <p class="text-left p">邮箱:</p>
                <input type="text" class="form-control" v-model="email">
              </div>
              <div class="form-group">
                <p class="text-left p">地址:</p>
                <input type="text" class="form-control" v-model="address">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="submit()">提交</button>
          </div>
        </div>
      </div>
    </div>
    <!--修改密码-->
    <div class="modal fade" id="pw" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">修改密码</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <p class="text-left p">修改密码:</p>
                <input type="password" class="form-control" v-model="password">
              </div>
              <div class="form-group">
                <p class="text-left p">确认密码:</p>
                <input type="password" class="form-control" v-model="repassword">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="submitw()">提交</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="chhead" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">更改头像</h4>
          </div>
          <div class="modal-body">
            <Pic v-on:picInfo="getPic"></Pic>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="subpic()">提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import API from '../config/req'
  import Locate from './map/Locate.vue'
  import Pic from './pic/Pic.vue'
  import '../assets/perinfo/js/init'
  import Navs from './Nav.vue'
  export default {
    name: 'perInfo',
    data () {
      return {
        phone:'',
        username:'',
        email:'',
        address:'',
        password:'',
        repassword:'',
        format:'',
        base:''
      }
    },
    created(){
      this.phone = localStorage.getItem("phone")
      this.username = localStorage.getItem("username")
      this.email = localStorage.getItem("email")
      this.getaddr()
    },
    mounted(){
      $('.feedify').feedify();
    },
    components: {
      Locate,
      Pic,
      Navs
    },
    methods: {
      //拿到用户地址
      getaddr(){
        let data = {
          Authorization: localStorage.getItem("token"),
          userId: localStorage.getItem("id")
        };
        this.$http.get(API.getAddrFormBack,{params:data}).then((response)=> {
            this.address = response.body[0].location
        },()=>{
            consoele.log("error")
        })
      },
      //提交上传头像
      subpic(){
        let date ={
          Authorization: localStorage.getItem("token"),
          userId: localStorage.getItem("id"),
          base64: this.base,
          suffix:this.format
        }
        this.$http.post(API.setAvatar,data).then((response)=> {
          alert(上传成功)
        },()=>{
          consoele.log("头像上传失败")
        })
      },
      addr(pt,addCom){
        console.log(pt)
        console.log(addCom)
        this.address = addCom.province + ", " + addCom.city + ", " + addCom.district + ", " + addCom.street + ", " + addCom.streetNumber
        let data = {
          Authorization: localStorage.getItem("token"),
          userId: localStorage.getItem("id"),
          location: this.address,
          latitude: pt.coords.latitude,
          longitude: pt.coords.longitude,
          city: addCom.city
        };
        this.$http.post(API.setAddr,data).then((response)=>{
          alert("地址添加成功")
        },()=>{
          alert("error")
        })
      },
      //修改个人信息
      submit(){
         let data ={
           Authorization: localStorage.getItem("token"),
           userId: localStorage.getItem("id"),
           email:this.email,
           phone:this.phone
         };
        this.$http.post(API.updatePerInfor,data).then((response)=>{
          alert("个人信息修改成功")
        },()=>{
          alert("error")
        })
      },
      //组建拿到图片信息
      getPic(format,base){
        console.log("gerPic")
        console.log(format)
        console.log(base)
        this.format = format
        this.base = base
      },
      changeHead(){
        $('#vis').click()
      },
      submitpw(){
          let self = this
          if(this.password != this.repassword){
              alert("两次密码不一致")
          }else{
              let data = {
                userId : localStorage.getItem("id"),
                password: self.password
              }
              self.$http.post(API.resetPassword,data).then((response)=>{
                  alert()
                  if(response.body.id == -1){
                      alert("未知错误")
                  }else{
                      alert("重制成功")
                  }
              },()=>{
                  alert("链接服务器失败")
              })
          }
      }
    }
  }
</script>
<style scoped>
  @import "../../node_modules/bootstrap/dist/css/bootstrap.css";
  @import "../assets/perinfo/css/feedify.min.css";
  @import "../assets/perinfo/css/feedify-theme.min.css";
  .bag{
    background: silver ;
    z-index:0;
    margin-top: -60px;
    height: 1000px;
  }
  .fontA{
    font-family: "akkurat", sans-serif;
    margin-top: 10px;
    font-size: 20px;
  }
</style>
