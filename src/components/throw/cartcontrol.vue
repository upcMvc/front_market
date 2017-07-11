<template>
  <div id="cartcontrol">
    <button class="btn btn-default" @click.stop.prevent="addCart($event)">加入购物车</button>
  </div>
</template>
<script>
export default {
  name:'cartcontrol',
  methods: {
    addCart(event) {
      this.$root.eventHub.$emit('cart.add', event.target)
    }
  }
}
</script>
<style scoped>
  @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

</style>

