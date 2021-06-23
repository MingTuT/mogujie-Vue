<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
   <cart-list class="cart-list" :cartList="cartList"></cart-list>
   <bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import CartList from './childComps/CartList.vue'
  import BottomBar from './childComps/BottomBar.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      BottomBar
    },
    computed: {
      ...mapGetters(['cartLength','cartList'])
    }

  }
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
  }
  .cart-list {
    overflow: hidden;
    position: absolute;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 49px;
   }
</style>
