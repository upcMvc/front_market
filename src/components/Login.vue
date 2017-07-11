<template>
  <div id="login">
    <div class="wrapper">
      <div class="container">

        <form class="form">
          <h1>Welcome to shopping~</h1><br>
          <input type="text" placeholder="Username">
          <input type="password" placeholder="Password">
          <button type="submit" id="login-button">Login</button>
        </form>
      </div>

      <ul class="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <p><img src="../assets/login/img/5.png" alt="picture" class="picmove"></p>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/login/css/styles.css";
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: Coral ;
  }
</style>
