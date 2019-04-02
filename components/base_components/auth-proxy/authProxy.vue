/**

根据登陆状态码判断是否展示传入的slot。如果不展示，根据不同状态提示不同字符串。

* props *
* name        type                required        detail
* code       [String, Number]     true            登陆状态码

*/
<template>
  <div class="auth-proxy">
    <div v-if="statusObj[loginStatus[code]]===true">
      <slot></slot>
    </div>
    <div class="auth-proxy-cover" v-else :style="styleObj">
      {{statusObj[loginStatus[code]]}}
    </div>
  </div>
</template>

<script>
  //根据当前权限显示不同内容
  import codeStatus from "components/codeStatus"

  export default{
    name: "authProxy",
    props: {
      code: {
        type: [String, Number],
        required: true
      },
      styleObj: Object
    },
    data: function (){
      return {
        statusObj: {
          "notLogin": "登录可见",
          "notCertified": "认证可见",
          "success": true,          //显示slot内容
        },
        loginStatus: codeStatus.loginStatus
      }
    },
  }
</script>

<style lang="scss">
  @import "~static/css/variables_m";
  .auth-proxy {
    .auth-proxy-cover {
      padding-bottom: 18px;
      font-size: 24px;
      color: #a97335;
      text-align: center;
    }
  }

</style>