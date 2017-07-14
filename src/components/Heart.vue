<template>
  <div>
    <slide :slides="slides" :inv="inv" :style="styleObject" :name="transitionName1" :target="target"></slide>
  </div>
</template>
<script>
  import slide from '@/components/slide/slide.vue'
  import datu1 from  '../assets/img/ad/datu1.jpg'
  import datu2 from  '../assets/img/ad/datu2.jpg'
  import datu3 from  '../assets/img/ad/datu3.jpg'
  import datu4 from  '../assets/img/ad/datu4.jpg'
  export default{
    components: {slide},
    data () {
      return {
        slides: [
          {
            src: datu1,
            href: ''
          },
          {
            src: datu2,
            href: ''
          },
          {
            src: datu3,
            href: ''
          },
          {
            src: datu4,
            href: ''
          }
        ],
        inv: 3000,
        styleObject: {
          width: '1000px',
          height: '400px'
        },
        transitionName1: 'move',
        transitionName2: 'fade',
        target: '_blank'
      }
    }
  }
</script>
