<template>
  <div id="cartcontrol">
    <button class="btn btn-default" @click.stop.prevent="addCart($event)" @click="push()">加入购物车</button>
  </div>
</template>
<script>
export default {
  props:{
    pushid: Number
  },
  name:'cartcontrol',
  methods: {
    addCart(event) {
      this.$root.eventHub.$emit('cart.add', event.target)
    },
    push(){
      let self = this;
      self.$emit('push',self.pushid);
    }
  }
}
</script>
<style scoped>
  @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

</style>

