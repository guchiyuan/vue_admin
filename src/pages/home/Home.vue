<template>
  <div class="home">
    <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide>
          <img class="swiper-img" :src="item.imgUrl" @click="handleClickXtbwh">
        </swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          loop:true
        },
        item:{imgUrl:"http://img1.qunarzz.com/piao/fusion/1805/b2/ea3845efcd579802.jpg_750x200_f2131e39.jpg"}
      }
    },
  methods:{
    handleClickXtbwh() {
      this.$router.push('/dwxx')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .home >>>.swiper-pagination-bullet-active
      background #fff
  .home
    position absolute
    // left 4rem
    overflow hidden
    width 100%
    height 0
    padding-bottom 26.7% 
    background #eee
    .swiper-img
        width 100%

</style>

