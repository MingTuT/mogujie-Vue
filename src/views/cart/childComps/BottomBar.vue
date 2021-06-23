<template>
  <div class="bottom-menu">
    <div class="check-content">
      <check-button class="check-button" :ischecked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">合计：{{totalPrice}}</div>

    <div class="calculate" @click="calClick">去结算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton.vue'
  export default {
    name: "BottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((pre,item) => {
          return pre + item.price * item.count
        },0).toFixed(2)
      },

      checkLength() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
      },

      isSelectAll() {
        if(this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
      }


    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calClick() {
        if(!this.$store.state.cartList.find(item => item.checked)) {
          this.$toast.show('至少选中一样商品')
        }
      }

    }

  }
</script>

<style>
  .bottom-menu {
   /* width: 100%;
    height: 40px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 40px;
    padding-left: 35px;
    box-sizing: border-box; */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    font-size: 14px;
    color: #888;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: orangered;
    color: #fff;
    text-align: center;
  }
</style>
