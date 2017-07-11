<template>
  <div class="shopcar">
    <Navs></Navs>
    <div class="container">
      <div class="cart">
        <div class="checkout-title">
          <span>Vue购物车实例</span>
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
                这块的index 是表示索引的值 和 js原声的 forEach(function(value,index){ }) 是一样的
                jq的 $.each(function(index ,value ){ }) 和它们是相反的
                -->
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <!--v-bind:class="" 里面一定是 一个对象或者是数组的形式
                     v-bind:class="{ }"  v-bind:class="[ ]"
                     -->
                    <a href="javascript:;" class="item-check-btn" v-bind:class="{'check':item.checked} " @click="selectedProduct(item)">
                      <svg class="icon icon-ok"  fill="Black"><use xlink:href="#icon-ok"></use></svg>
                    </a>
                  </div>
                  <!--图片-->
                  <div class="cart-item-pic">
                    <img  v-bind:src="item.productImage" alt="">
                    <!--<img src="{{item.productImage}}" alt=""> 会在浏览器加载时 vue实例没有渲染完是，把它当作图片路径来加载-->
                  </div>
                  <!--图片后面的文字-->
                  <div class="cart-item-title">
                    <div class="item-name">
                      {{ item.productName + "--我是index的值"+index}}
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
                  <div class="item-price-total">{{item.productPrice*item.productQuentity | formatMoney}}</div>

                </div>
                <!--第五列-->
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <span class="glyphicon glyphicon-trash" @click="del(item,index)"></span>
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
            <div  class="next-btn-wrap">
              <a href="address.html" class="btn btn--red" > 结账 </a>
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

  import Navs from './Nav.vue'
  export default {
    name: 'shopcar',
    data () {
      return {
        totalMoney:0,         // 总金额
        productList:[],       // 定义一个数组
        checkAllFlag:false,   // 定义是否全选
        curProduct:'',        // 保存删除的商品信息
        delFlag:false
      }
    },
    components:{
      Navs
    },
    filters:{ // 过滤器 对数据实现转换 可以定义全局的 也可以定义局部的 这个是局部的 只有vue的实例才可以使用
      formatMoney:function (value) { // 默认接收一个参数
        return "¥ " + value.toFixed(2) +" 元"; // 返回一个¥ 加上2位小数
      }
    },
    // 这个方法就相当于jq的ready()方法
    mounted:function () { //生命周期的一部分，在实例化创建完成后，需要查询某一个方法 需要定义一个mounted 方法
      this.$nextTick(function () {  // 代码保证 this.$el 在 document 中
        this.cartView();
        // 也可以使用 vm.cartView();
      });
    },
    methods:{
      cartView:function () {
        var _this = this;
        _this.productList = [
          {
            "productId":"600100002115",
            "productName":"黄鹤楼香烟",
            "productPrice":19,
            "productQuentity":1,
            "productImage":"http://d8.yihaodianimg.com/N05/M0B/D0/3E/CgQI0lSFGeSAYpHQAAT3Nw4l5Eo66700.jpg",
            "parts":[
              {
                "partsId":"10001",
                "partsName":""
              },
              {
                "partsId":"10002",
                "partsName":""
              }
            ]
          },
          {
            "productId":"600100002120",
            "productName":"加多宝",
            "productPrice":8,
            "productQuentity":5,
            "productImage":"http://att2.citysbs.com/hangzhou/image1/2009/12/04-12/20091204_719e654b12716c0e89ccWlbSHzl1q43v.jpg",
            "parts":[
              {
                "partsId":"20001",
                "partsName":""
              }
            ]
          },
          {
            "productId":"600100002130",
            "productName":"",
            "productPrice":10,
            "productQuentity":3,
            "productImage":"http://image.cn.made-in-china.com/prodzip/000-qeLEpStIJKgl.jpg",
            "parts":[
              {
                "partsId":"20001",
                "partsName":""
              }
            ]
          },
          {
            "productId":"600100002140",
            "productName":"中华香烟",
            "productPrice":100,
            "productQuentity":1,
            "productImage":"http://pic19.nipic.com/20120209/6322264_105904992000_2.jpg",
            "parts":[
              {
                "partsId":"10001",
                "partsName":""
              }
            ]
          }
        ]

      },
      // 点击 加减 的方法
      changeMoney:function (product, way) {
        if( way >0 ){ //当 way>0 就是点击的 +
          product.productQuentity++; // 数量增加  就相当于 item 的productQuentity
        }else {
          product.productQuentity--; // 否则数量减少
          if(product.productQuentity <0 ){ //
            product.productQuentity =0;
          }
        }
        this.caleTotalPrice();
      },
      //如何让Vue 监听一个不存在的变量 单选操作
      selectedProduct:function (item) { // 接收的参数
        if( typeof item.checked == 'undefined'){ // 怎样判断一个对象的变量存不存在 看他的typeof == undedined
          /**
           * 两种全局注册和局部注册  让vue 来监听
           * 第一个参数 要添加的对象
           * 第二个参数 添加的变量
           * 第三个参数 添加的值是什么
           * 意思是我们通过 Vue全局注册 往item变量中注册一个checked 属性 它的值是 true
           *
           * this.$set(item,"checked",true)  局部注册
           */
          Vue.set(item,"checked",true);
        }else {
          item.checked = !item.checked;
        }
        this.caleTotalPrice();
      },
      // 定义全选 函数
      checkAll:function (flag) {
        this.checkAllFlag = flag ;
        var _this = this;
        this.productList.forEach(function (item,index) { // 用forEach来遍历 productList
          if(typeof item.checked == 'undefined'){ // 先判断 是否有这个 item.checked
            Vue.set(item,"checked",_this.checkAllFlag);  // 没有 先注册
          }else {
            item.checked = _this.checkAllFlag;
          }
        });
        this.caleTotalPrice();
      },
      // 计算选中商品的总价
      caleTotalPrice:function () {
        var _this = this;
        this.totalMoney = 0;
        this.productList.forEach(function (item,index) {
          if(item.checked){
            _this.totalMoney += item.productPrice * item.productQuentity;
          }
        });
      },
      del(item,index){
        console.log(item.productId)//id
        this.productList.splice(index,1)
        //删除数据给后台
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
  .quentity input{
    width: 40px;
    padding: 5px 10px;
    text-align: center;
  }
  .quentity > a{
    color: white;
    text-decoration: none;
  }
  .quentity > a:hover{
    color: white;
    text-decoration: none;
  }
</style>
