/**
 * Created by zfl on 2017/7/11.
 */

const baseurl = 'http://localhost:8082';

const API = {
  URL: "http://localhost:8089/",
  testGet: 'http://172.20.51.1:8082/dev/user',
  testPost: 'http://172.20.51.1:8082/dev/user',
  logIn: baseurl + '/user/login',
  GoodsInfo: baseurl + '/goods/findAll',
  reg: baseurl + "/user/regist",//用户注册api
  shoppingCart: baseurl + "/ShoppingCart",//购物车相关操作api
};

module.exports = API;
