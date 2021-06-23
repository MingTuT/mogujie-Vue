<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <div class="left">
        <img class="privateImage-svg" src="~/assets/img/profile/avatar.svg" >
      </div>

      <div class="login-info left">
        <slot name="user-nickname">
          <div class="login-register">登录/注册</div>
        </slot>
        <div class="phone">
          <img src="../../../assets/img/profile/phone.svg" >
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>

    </a>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .left {
    float: left;
  }

  .login-info {
    color: #fff;
    margin-left: 50px;
  }

  .login-register {
    padding-bottom: 10px;
  }

  .phone img {
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }

</style>
