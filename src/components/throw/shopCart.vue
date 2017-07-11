<!--<template lang="html">-->
  <!--<div class="">-->
    <!--<div class="shopCart">-->
      <!--<div class="content">-->
        <!--<div class="content-left" @click="listToggle">-->
          <!--<div class="logo-wrapper">-->
            <!--<div class="badge" v-show="totalCount">-->
              <!--{{totalCount}}-->
            <!--</div>-->
            <!--<div class="logo" :class="{'active':totalPrice}">-->
              <!--<i class="icon-shopping_cart"></i>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="price" :class="{'active':totalPrice}">-->
            <!--￥{{totalPrice}}-->
          <!--</div>-->
          <!--<div class="desc">-->
            <!--另需要配送费￥{{deliveryPrice}}元-->
          <!--</div>-->
        <!--</div>-->
     <!--</div>-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--<div class="ball-container">-->
        <!--<transition name="drop" v-on:before-enter="beforeEnter"-->
          <!--v-on:enter="enter" v-on:after-enter="afterEnter"-->
          <!--v-for="(ball,index) in balls">-->
          <!--<div class="ball" v-show="ball.show">-->
            <!--<div class="inner inner-hook"></div>-->
          <!--</div>-->
        <!--</transition>-->
      <!--</div>-->

    <!--</div>-->




  <!--<transition name="fade-backdrop">-->
    <!--<div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>-->
  <!--</transition>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import cartcontrol from './cartcontrol'-->

<!--export default {-->
  <!--props: {-->
    <!--selectFoods: {-->
      <!--type: Array,-->
      <!--default: []-->
    <!--},-->
    <!--deliveryPrice: {-->
      <!--type: Number,-->
      <!--default: 0-->
    <!--},-->
    <!--minPrice: {-->
      <!--type: Number,-->
      <!--default: 0-->
    <!--}-->
  <!--},-->
  <!--data() {-->
    <!--return {-->
      <!--balls: [{-->
        <!--show: false-->
      <!--}, {-->
        <!--show: false-->
      <!--}, {-->
        <!--show: false-->
      <!--}, {-->
        <!--show: false-->
      <!--}, {-->
        <!--show: false-->
      <!--}],-->
      <!--dropBalls: [],-->
      <!--listShow: false-->
    <!--}-->
  <!--},-->
  <!--created() {-->
    <!--this.$root.eventHub.$on('cart.add', this.drop)-->
  <!--},-->
  <!--computed: {-->
    <!--showBackdrop() {-->
      <!--if (this.listShow && this.totalPrice) {-->
        <!--return true-->
      <!--}-->
      <!--this.listShow = false-->
      <!--return false-->
    <!--},-->
    <!--totalPrice() {-->
      <!--let total = 0-->
      <!--this.selectFoods.forEach((food) => {-->
        <!--if (food.count) {-->
          <!--total += food.price * food.count-->
        <!--}-->
      <!--})-->
      <!--return total-->
    <!--},-->
    <!--totalCount() {-->
      <!--let count = 0-->
      <!--this.selectFoods.forEach((food) => {-->
        <!--count += food.count-->
      <!--})-->
      <!--return count-->
    <!--},-->
    <!--leftAmount() {-->
      <!--if (this.minPrice - this.totalPrice > 0 && totalPrice) {-->
        <!--return true;-->
      <!--}-->
      <!--return false-->
    <!--},-->
    <!--payDesc() {-->
      <!--let diff = this.minPrice - this.totalPrice-->
      <!--if (!this.totalPrice) {-->
        <!--return `￥${this.totalPrice}起送`-->
      <!--} else if (diff > 0) {-->
        <!--return `还差￥${diff}元`-->
      <!--} else {-->
        <!--return '去结算'-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--drop(el) {-->
      <!--for (let i = 0, l = this.balls.length; i < l; i++) {-->
        <!--let ball = this.balls[i]-->
        <!--if (!ball.show) {-->
          <!--ball.show = true-->
          <!--ball.el = el-->
          <!--this.dropBalls.push(ball)-->
          <!--return-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--setEmpty() {-->
      <!--this.selectFoods.forEach((food) => {-->
        <!--food.count = 0-->
      <!--})-->
    <!--},-->
    <!--hideBackdrop() {-->
      <!--this.listShow = false-->
    <!--},-->
    <!--_initScroll() {-->
      <!--this.foodlistScroll = new BScroll(this.$refs.foodlist, {-->
        <!--click: true-->
      <!--});-->
    <!--},-->
    <!--listToggle() {-->
      <!--if (!this.selectFoods.length) {-->
        <!--return-->
      <!--}-->
      <!--this.listShow = !this.listShow-->
      <!--if (this.listShow) {-->
        <!--this.$nextTick(() => {-->
          <!--if (!this.foodlistScroll) {-->
            <!--this._initScroll()-->
          <!--} else {-->
            <!--this.foodlistScroll.refresh()-->
          <!--}-->
        <!--})-->
      <!--}-->
    <!--},-->
    <!--beforeEnter(el) {-->
      <!--let count = this.balls.length-->
      <!--while (count&#45;&#45;) {-->
        <!--let ball = this.balls[count]-->
        <!--if (ball.show) {-->
          <!--let rect = ball.el.getBoundingClientRect()-->
          <!--let x = rect.left - 32;-->
          <!--let y = -(window.innerHeight - rect.top - 22)-->
          <!--el.style.display = ''-->
          <!--el.style.webkitTransform = `translate3d(0,${y}px,0)`-->
          <!--el.style.transform = `translate3d(0,${y}px,0)`-->
          <!--let inner = el.querySelector('.inner-hook')-->
          <!--inner.style.webkitTransform = `translate3d(${x}px,0,0)`-->
          <!--inner.style.transform = `translate3d(${x}px,0,0)`-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--enter(el) {-->
      <!--el.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发-->
      <!--this.$nextTick(() => {-->
        <!--el.style.webkitTransform = 'translate3d(0,0,0)'-->
        <!--el.style.transform = 'translate3d(0,0,0)'-->
        <!--let inner = el.querySelector('.inner-hook')-->
        <!--inner.style.webkitTransform = 'translate3d(0,0,0)'-->
        <!--inner.style.transform = 'translate3d(0,0,0)'-->
      <!--})-->
    <!--},-->
    <!--afterEnter(el) {-->
      <!--let ball = this.dropBalls.shift()-->
      <!--if (ball) {-->
        <!--ball.show = false-->
        <!--el.style.display = 'none'-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--components: {-->
    <!--cartcontrol-->
  <!--}-->
<!--}-->

<!--</script>-->

<!--<style lang="stylus" scoped>-->


  <!--.ball-container-->
    <!--.ball-->
      <!--position fixed-->
      <!--left 32px-->
      <!--bottom 22px-->
      <!--z-index 200-->
      <!--&.drop-enter,&.drop-enter-active-->
        <!--transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)-->
        <!--.inner-->
          <!--width 16px-->
          <!--height 16px-->
          <!--border-radius 50%-->
          <!--background rgb(0,160,220)-->
          <!--transition all 0.4s linear-->
  <!--.shopcart-list-->
    <!--position absolute-->
    <!--top 0-->
    <!--left 0-->
    <!--width 100%-->
    <!--background white-->
    <!--transform translate3d(0,-100%,0)-->
    <!--z-index -1-->
    <!--&.transHeight-enter-active,&.transHeight-leave-active-->
      <!--transition all 0.5s-->
    <!--&.transHeight-enter,&.transHeight-leave-active-->
      <!--transform translate3d(0,0,0)-->

<!--</style>-->
