<template>
  <div class="hello">
    <Navs></Navs>


  </div>
</template>

<script>
  import API from '../config/req'
  import Navs from './Nav.vue'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
//    this.initGet()
    this.initPost()
  },
  components:{
      Navs
  },
  methods:{
    initGet(){
      let self = this
        self.$http.get(API.testGet).then((response)=> {
            console.log(response)
        },()=>{
            console.log("error")
        })
    },
    initPost(){
      let self = this
      let data = {
          a:'test'
      }
      self.$http.post(API.testPost,data).then((response)=> {
        console.log()
      },()=>{
        console.log("error")
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: #42b983;
}
</style>
