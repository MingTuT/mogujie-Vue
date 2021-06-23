<template>
  <div class="toast" v-show="ishow">
    <span>{{message}}</span>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: "",
        ishow: false
      }
    },
    methods: {
      show(message, duration = 2000) {
        this.ishow = true
        this.message = message
        setTimeout(() => {
          this.ishow = false
          this.message = ""
        },duration)
      }
      
    }


  }
</script>

<style>
  .toast {
    font-size: 16px;
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    padding: 8px 15px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.75);
  }
</style>
