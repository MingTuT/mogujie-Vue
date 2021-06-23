<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot='center'>购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
    @tabClick="tabClick"
    ref="tabControl1"
    class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
    :probe-type="3"
    :pullUpLoad="true"
    @scroll="scrollControl"
    @pullingUp="loadMore">   <!-- @pullingUp="loadMore" -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>

    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/Feature.vue'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import {getHomeMultidata,getHomeGoods} from 'network/home.js'
  import {debounce} from 'common/utils.js'


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0,list:[]},
          'new': {page:0,list:[]},
          'sell': {page:0,list:[]}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y

      this.$bus.$off('homeItemImageLoad',this.itemImgListener)
    },
    //组件创建时 请求home数据
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,500)
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on('homeItemImageLoad',this.itemImgListener)

    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0,1000)
      },
      scrollControl(position) {
        this.isShowBackTop = -position.y > 1000

        this.isTabFixed = (-position.y)>this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },
      tabClick(index) {
        switch (index) {
          case 0:
          this.currentType = 'pop'
          break
          case 1:
          this.currentType = 'new'
          break
          case 2:
          this.currentType = 'sell'
          break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop)
      }

    }

  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  /* position: fixed;
    left: 0;
    top: 0;
    right: 0; */
    z-index: 999;
  }

  .content {
/*   height: calc(100% - 93px);

    margin-top: 44px; */
   overflow: hidden;
   position: absolute;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 49px;
  }
  .tab-control {
    background-color: #fff;
    position: relative;
    z-index: 99;
  }

</style>
