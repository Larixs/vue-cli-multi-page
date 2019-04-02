/**
* Created by lai on 2018/4/25.
*/
<template>
  <MiniForm
    v-model="authProxyConfig"
    :config="MiniFormConfig"
  >
    <AuthProxy
      :code="authProxyConfig['登录状态码']"
    >
      <div class="auth-content">
        这里是需要登录并且认证才能查看的内容
        <img :src="$imgPath + 'test_base_comp/zelda.jpg'"/>
      </div>
    </AuthProxy>
  </MiniForm>
</template>
<script>
  import { AuthProxy } from "base_components"
  import { MiniForm } from "./micro_components"

  export default {
    name: '',
    props: {},
    components: {
      MiniForm, AuthProxy
    },
    mixins: [

    ],
    data(){
      return {
        authProxyConfig: {
          '登录状态码': 0
        },
        MiniFormConfig: [
          {
            type: 'select',
            name: '登录状态码',
            options: [
//              {'text': '登录并且认证', value: 0},
              0,
              1004,
              7001
            ]
          },
        ]
      }
    },
    created(){
    },
    mounted(){
    },
    filters: {},
    watch: {},
    computed: {},
    methods: {}
  }
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";
  .auth-content{
    padding: 12px;
    background-color: #fff;
    img{
      display: block;
      width: 100%;
    }
  }
</style>
