<template>
  <div>
    <div class="icon-selector" :class="{'selector-active':ischecked}">
      <img src="~/assets/img/cart/tick.svg">
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      ischecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style>
 .icon-selector {
   border-radius: 50%;
   border: 1px solid #ccc;
 }

 .selector-active {
   background-color: #ff8198;
   border-color: #ff8198;
 }
</style>
