<template>
    <div class="ball-container">
      <transition name="drop" v-on:before-enter="beforeEnter"
                    v-on:enter="enter" v-on:after-enter="afterEnter"
                    v-for="(ball,index) in balls"  v-bind:key="index">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook">
            <img src="../../assets/img/throw.png" alt="" width="35px">
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import cartcontrol from './cartcontrol'

  export default {
    data() {
      return {
        balls: [{
          show: false
        },
          {
            show: false
          },{
            show: false
          }],
        dropBalls: [],
        listShow: false
      }
    },
    created() {
      this.$root.eventHub.$on('cart.add', this.drop)
    },

    methods: {
      drop(el) {
        for (let i = 0, l = this.balls.length; i < l; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      _initScroll() {
        this.foodlistScroll = new BScroll(this.$refs.foodlist, {
          click: true
        });
      },
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.querySelector('.inner-hook')
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter(el) {
        el.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    },
    components: {
      cartcontrol
    }
  }

</script>

<style>
  @import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
</style>
<style lang="stylus" scoped>

  .ball-container
    .ball
      position fixed
      left 40px           //终点坐标
      bottom 25px
      z-index 50
      &.drop-enter,&.drop-enter-active
        transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width 50px
          height 50px
          transition all 0.4s linear
</style>
