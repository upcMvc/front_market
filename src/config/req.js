/**
 * Created by zfl on 2017/7/11.
 */

const baseurl = 'http://localhost:8082';

const API = {
  URL: "http://localhost:8089/",
  testGet: 'http://localhost:8082/dev/user',
  //testPost: 'http://localhost:8082/dev/user',
  logIn: baseurl + '/user/login',
  GoodsInfo: baseurl + '/goods/findAll',
  reg: baseurl + "/user/regist",//用户注册api
  shoppingCart: baseurl + "/ShoppingCart",//购物车相关操作api
  shoppcartCreat: baseurl + '/ShoppingCart' + '/create',
  history:baseurl+"/history",//历史记录相关操作API
};

module.exports = API;
