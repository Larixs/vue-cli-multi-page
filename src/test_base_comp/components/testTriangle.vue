/**
* Created by lai on 2018/4/24.
*/
<template>
  <div>
    <MiniForm
      v-model="triangleConfig"
      :config="MiniFormConfig"
    >
      <Triangle
        :value="value"
        :rowMaxLen="rowMaxLen"
      >
        <img slot="item" slot-scope="props" :src="props.data" alt="">
      </Triangle>
    </MiniForm>
  </div>
</template>
<script>
  import { Triangle } from "view_components"
  import { MiniForm } from "./micro_components"

  export default {
    name: '',
    props: {},
    components: {
      Triangle, MiniForm
    },
    mixins: [],
    data(){
      const value = []
      value.length = 5
      value.fill(this.$imgPath + "base_components/my-footer/CSRC.png")
      return {
        value: value,
        triangleConfig: {
          '数据的长度': value.length,
          'rowMaxLen': 2,
        },
        MiniFormConfig: [
          {
            type: 'input',
            name: '数据的长度',
          },
          {
            type: 'input',
            name: 'rowMaxLen',
          },
        ]
      }
    },
    created(){
    },
    mounted(){
    },
    filters: {},
    watch: {
      triangleConfig: {
        deep: true,
        immediate: true,
        handler(val){
          if ( typeof +val['数据的长度'] === 'number' && +val['数据的长度'] > 0) {
            const value = []
            value.length = +val['数据的长度']
            value.fill(this.$imgPath + "base_components/my-footer/CSRC.png")
            this.value = value
          }

        }
      }
    },
    computed: {
      rowMaxLen(){
        return +(this.triangleConfig.rowMaxLen || 0)
      }
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";

  p {
    padding-left: 12px;
    line-height: 32px;
    position: relative;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
  }
</style>
