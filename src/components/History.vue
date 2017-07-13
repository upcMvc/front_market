<template>
  <div id="history">
   <ul v-for="h in history">
     <li>{{h.goodId}}</li>
     <li>{{h.goodName}}</li>
     <li>{{h.imgPath}}</li>
     <li>{{h.time}}</li>
     <li>{{h.userId}}</li>
     <li>{{h.price}}</li>


     <li>history</li>

   </ul>
  </div>
</template>

<script>
  import $ from 'jquery'
  import BScroll from 'better-scroll'
  import API from '../config/req'
  export default {
    name: 'history',
    data () {
      return {
        history:[]
      }
    },
    created(){
      this.getHistory();
    //  this.deleteHistory() 清空浏览记录
    },
    methods:{
      getHistory(){
        let data = {
          Authorization: localStorage.getItem('token'),
          userId:localStorage.getItem('id')
        };
        let self = this;
        self.$http.get(API.history+'/find',{params:data}).then((response)=> {
            this.history=response.body;
            console.log(this.history)
        },()=>{
          console.log("error")
        })
      },
      //清空浏览记录
      deleteHistory(){
        let data = {
          Authorization: localStorage.getItem('token'),
          userId:localStorage.getItem('id')
        };
        let self=this;
        self.$http.post(API.history+'/deleteall',data).then((response)=>{
        console.log(response.data);
        },()=>{
            console.log("delete error")
        })
      }

    }
  }
</script>


<style scoped>
  @import url('../assets/good/css/styles.css');

</style>
