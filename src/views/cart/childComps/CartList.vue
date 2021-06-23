<template>
  <scroll class="content" ref="scroll">

      <cart-list-item class="cart-list" v-for="item in cartList" :key="item.iid" :item-info="item"/>

  </scroll>

</template>

<script>
  import Scroll from 'components/common/scroll/Scroll.vue'
  import CartListItem from './CartListItem.vue'

  export default {
    name: "CartList",
    props: {
      cartList: {
        type: Array,
        default() {
          return []
        }
      }

    },
    components: {
      Scroll,
      CartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
    }

  }
</script>

<style scoped>
  .content {
   height: calc(100% - 44px - 49px - 40px);
  }
</style>
