<template>
  <div class="shopcar">
    <Navs></Navs>
    <div class="container">
      <div class="cart">
        <div class="checkout-title">
          <span>购物车</span>
        </div>
        <!--商品信息-->
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>商品信息</li>
                <li>商品金额</li>
                <li>商品数量</li>
                <li>总金额</li>
                <li>编辑</li>
              </ul>
            </div>
            <!--商品列表信息-->

            <ul class="cart-item-list">
              <li v-for="(item,index) in productList"> <!--item of productList 这两个是一样的-->
                <!--
                这块的 index 是让自己知道
                这块的index 是表示索引的值 和 js原生的 forEach(function(value,index){ }) 是一样的
                jq的 $.each(function(index ,value ){ }) 和它们是相反的
                -->
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <!--v-bind:class="" 里面一定是 一个对象或者是数组的形式
                     v-bind:class="{ }"  v-bind:class="[ ]"
                     -->
                    <a href="javascript:;" class="item-check-btn" v-bind:class="{'check':item.checked} "
                       @click="selectedProduct(item)">
                      <svg class="icon icon-ok" fill="Black">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <!--图片-->
                  <div class="cart-item-pic">
                    <img v-bind:src="item.productImage" alt="">
                    <!--<img src="{{item.productImage}}" alt=""> 会在浏览器加载时 vue实例没有渲染完成，把它当作图片路径来加载-->
                  </div>
                  <!--图片后面的文字-->
                  <div class="cart-item-title">
                    <div class="item-name">
                      {{ item.productName + "--我是index的值" + index}}
                    </div>
                  </div>
                  <!-- 赠送-->
                  <div class="item-include">

                  </div>
                </div>
                <!--第二列-->
                <div class="cart-tab-2">
                  <!-- 过滤器的使用方法 | 加方法 -->
                  <div class="item-price"> {{ item.productPrice | formatMoney }}</div>
                </div>
                <!--第三列-->
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="quentity">
                        <!-- 绑定事件 v-on：click 也可以 @click
                        调用方法的同时 我们需要把商品的对象传递过去 item
                         第二个参数 -1 减 1 加
                        -->
                        <a href="javascript:;" v-on:click=" changeMoney(item,-1)"> - </a>
                        <!--文本框 放入当前商品数量 v-model   -->
                        <input type="text" disabled v-model="item.productQuentity">
                        <a href="javascript:; " @click=" changeMoney(item,1) "> + </a>
                      </div>
                    </div>

                  </div>
                </div>
                <!--第四列-->
                <div class="cart-tab-4">
                  <!-- 总金额是当前的单价乘以商品总数-->
                  <div class="item-price-total">{{item.productPrice * item.productQuentity | formatMoney}}</div>

                </div>
                <!--第五列-->
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <span class="glyphicon glyphicon-trash" @click="deleteIt(item,index)"></span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!--footer-->
        <div class="cart-foot-wrap">
          <!--footer 左边的-->
          <div class="cart-foot-l">
            <div class="item-all-check">
              <a href="javascript:;">
                <!--v-bind:class 的简写  :class-->
                <span class="item-check-btn" :class="{'check': checkAllFlag}" @click="checkAll(true)">
                                <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
                            </span>
                <span @click="checkAll(true)"> 全选 </span>
              </a>
            </div>
            <div class="item-all-del">
              <a href="javascript:;" @click="checkAll(false)"> 取消全选</a>
            </div>
          </div>
          <!--footer 右边的-->
          <div class="cart-foot-r">
            <div class="item-total">
              总价：<span class="total-price"> {{ totalMoney }}</span>
            </div>
            <div class="next-btn-wrap">
              <a href="" class="btn btn--red" @click="sub()">结账</a>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import  '../../node_modules/bootstrap/dist/js/bootstrap'

  import Vue from  'vue'
  import API from '../config/req'
  import Navs from './Nav.vue'
  export default {
    name: 'shopcar',
    data () {
      return {
        totalMoney: 0,         // 总金额
        productList: [],       // 定义一个数组
        checkAllFlag: false,   // 定义是否全选
        curProduct: '',        // 保存删除的商品信息
        delFlag: false
      }
    },
    components: {
      Navs
    },
    filters: { // 过滤器 对数据实现转换 可以定义全局的 也可以定义局部的 这个是局部的 只有vue的实例才可以使用
      formatMoney: function (value) { // 默认接收一个参数
        return "¥ " + value.toFixed(2) + " 元"; // 返回一个¥ 加上2位小数
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.cartView();
      });
    },
    methods: {
      cartView: function () {
        let self = this
        this.productList = [
            {
            "productId": "600100002115",
            "productName": "黄鹤楼香烟",
            "productPrice": 19,
            "productQuentity": 1,
            "productImage": "http://d8.yihaodianimg.com/N05/M0B/D0/3E/CgQI0lSFGeSAYpHQAAT3Nw4l5Eo66700.jpg",
          }]
        let userId = localStorage.getItem("id");//拿到本地存储的userId
        let token = localStorage.getItem("token");//后台安全认证用token
        self.$http.get(API.shoppingCart + "/find", {
          params: {
            Authorization: token,
            userId: userId
          }
        }).then((response) => {
          console.log(response.data)
          for(let i = 0;i < response.body.length;i++){
            this.productList[i].productId =  response.body[i].id
            this.productList[i].productName =  response.body[i].goodId
            this.productList[i].productPrice =  response.body[i].price
            this.productList[i].productQuentity =  response.body[i].num
            this.productList[i].productImage =  response.body[i].imgPath
          }
        }, () => {
          console.log("error");
        })
      },
      // 点击 加减 的方法
      changeMoney:function(product, way) {
        if (way > 0) { //当 way>0 就是点击的 +
          product.productQuentity++; // 数量增加  就相当于 item 的productQuentity
        } else {
          product.productQuentity--; // 否则数量减少
          if (product.productQuentity < 0) { //
            product.productQuentity = 0;
          }
        }
        this.caleTotalPrice();
      },
      selectedProduct: function (item) { // 接收的参数
        if (typeof item.checked == 'undefined') { // 怎样判断一个对象的变量存不存在 看他的typeof == undedined
          Vue.set(item, "checked", true);
        } else {
          item.checked = !item.checked;
        }
        this.caleTotalPrice();
      },
      // 定义全选 函数
      checkAll: function (flag) {
        this.checkAllFlag = flag;
        var _this = this;
        this.productList.forEach(function (item, index) { // 用forEach来遍历 productList
          if (typeof item.checked === 'undefined') { // 先判断 是否有这个 item.checked
            Vue.set(item, "checked", _this.checkAllFlag);  // 没有 先注册
          } else {
            item.checked = _this.checkAllFlag;
          }
        });
        this.caleTotalPrice();
      },
      // 计算选中商品的总价
      caleTotalPrice: function () {
        var _this = this;
        this.totalMoney = 0;
        this.productList.forEach(function (item, index) {
          if (item.checked) {
            _this.totalMoney += item.productPrice * item.productQuentity;
          }
        });
      },
      //删除数据给后台
      deleteIt(item, index) {
        this.productList.splice(index, 1);
        console.log(item.shopcarId);//id

        let userId = localStorage.getItem("id");
        let token = localStorage.getItem("token");
        let postData = {
          Authorization: token,
          userId: userId,
          id: item.shopcarId
        };
        this.$http.post(API.shoppingCart + "/delete", postData).then((response) => {
          alert("删除成功");
          console.log(response.data);
        }, () => {
          console.log("删除购物车商品失败");
        });
      },
      sub(){
        var _this = this;
        this.totalMoney = 0;
        this.productList.forEach(function (item, index) {
          if (item.checked) {
            console.log(item)
          }
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../node_modules/bootstrap/dist/css/bootstrap.css";
  @import "../assets/shopcar/css/base2.css";
  @import "../assets/shopcar/css/checkout.css";
  @import "../assets/shopcar/css/modal.css";

  .quentity input {
    width: 40px;
    padding: 5px 10px;
    text-align: center;
  }

  .quentity > a {
    color: white;
    text-decoration: none;
  }

  .quentity > a:hover {
    color: white;
    text-decoration: none;
  }
</style>
