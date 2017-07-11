<!--<template lang="html">-->

  <!--<div class="cartcontrol">-->

    <!--<transition name="fadeRotate">-->
      <!--<div class="cart-decrease" v-show='food.count>0' @click.stop.prevent="decreaseCart()">-->
          <!--<span class="icon-remove_circle_outline inner"></span>-->

      <!--</div>-->
    <!--</transition>-->
    <!--<div class="cart-count" v-show="food.count>0">-->
      <!--{{food.count}}-->
    <!--</div>-->
    <!--<div class="cart-add" @click.stop.prevent="addCart($event)">-->
      <!--<i class="icon-add_circle"></i>-->
      <!--<button>123123</button>-->
    <!--</div>-->
  <!--</div>-->

<!--</template>-->

<!--<script>-->
<!--import Vue from 'vue'-->

<!--export default {-->
  <!--props: {-->
    <!--food: Object-->
  <!--},-->
  <!--methods: {-->
    <!--addCart(event) {-->
      <!--console.log(event.target);-->
      <!--if (!event._constructed) {-->
        <!--return-->
      <!--}-->
      <!--if (!this.food.count) {-->
        <!--Vue.set(this.food, 'count', 0)-->
      <!--}-->
      <!--this.food.count++;-->
      <!--this.$root.eventHub.$emit('cart.add', event.target)-->
    <!--},-->
    <!--decreaseCart() {-->
      <!--if (!event._constructed || !this.food.count) {-->
        <!--return-->
      <!--}-->
      <!--this.food.count&#45;&#45;;-->
    <!--}-->
  <!--}-->
<!--}-->

<!--</script>-->


