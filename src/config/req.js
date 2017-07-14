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
  forget: baseurl + "/user/forget_password",
  getAddrFormBack: baseurl + "/address/findbyuserid",
  setAddr: baseurl + "/address/create",
  updatePerInfor: baseurl + "/user/reset_user",
  resetPassword: baseurl + '/user/reset_password',
  setAvatar: baseurl + '/user/setAvatar',
  shoppcartCreat: baseurl + '/ShoppingCart' + '/create',
  history: baseurl + "/history",//历史记录相关操作API
  findShopRecord: baseurl + '/ShopRecord' + '/find',
  getGoodImage: baseurl + '/getGoodImage',
  getCommentn: baseurl + '/ShopRecord' + '/getEvalutionByGoodId',
  createShopRecord: baseurl + "/ShopRecord/create",
  sendEmail:baseurl+"/ShopRecord/whSendEmail",
  daily : baseurl + '/goods/daily',
  drink : baseurl + '/goods/drink',
  fruits: baseurl + '/goods/fruits',
  snacks: baseurl + '/goods/snacks',
  pushgood: baseurl + '/goods/create',
  getGood: baseurl+ '/warehouse/findWhid'
};

module.exports = API;
