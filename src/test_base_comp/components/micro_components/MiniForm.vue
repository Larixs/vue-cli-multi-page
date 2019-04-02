/**
* Created by lai on 2018/4/25.
  由于是咱们自己用的页面，那么我就不考虑兼容性，随意使用css特性了，( •̀ ω •́ )y
* props *
* name        type                default        detail
*

*/
<template>
  <div class="mini-form">
    <h3>{{formTitle}}</h3>
    <div class="mini-form-items">
      <div v-for="(item,index) in config" class="mini-form-item-box">
        <label>
          <span>{{item.name}}</span>
          <select
            v-if="item.type==='select'"
            v-model="formValue[item.name]"
            :name="item.name"
          >
            <option
              v-for="option in item.options"
              :value="option.value!==undefined ?  option.value : option"
            >
              {{option.text!==undefined ? option.text : option}}
            </option>
          </select>
          <input
            v-if="item.type==='input'"
            :type="item.inputType || 'text'"
            v-model="formValue[item.name]"
          >
        </label>
      </div>
    </div>
    <div class="other-part">
      <h3>组件展示区</h3>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    props: {
      config: {
        type: Array,
        default: () => ([])
      },
      value: {
        type: Object,
        default: () => ({})
      },
      formTitle: {
        type: String,
        default: '配置区域'
      }
    },
    components: {},
    mixins: [],
    data(){
      const formValue = Object.assign({}, this.getDefaultValue(this.config), this.value)
      return {
        formValue
      }
    },
    created(){
    },
    mounted(){
    },
    filters: {},
    watch: {
      formValue: {
        deep: true,
        immediate: true,
        handler(val){
          this.$emit('input', val)
        }
      }
    },
    computed: {},
    methods: {
      getDefaultValue(config){
        let result = {}
        const getDefaultSingleValue = function (configItem){
          if ( configItem.type === 'select' ) {
            return configItem.options[0]
          }
        }
        config.forEach((i) =>{
          result[i.name] = getDefaultSingleValue(i)
        })
        return result
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";
  .other-part{
    padding: 0 0 12px 0;
  }
  .mini-form{
    margin-bottom: 20px;
    background-color: #ebeaea;
    h3{
      padding: 12px;
      color: lightslategray;
    }
  }
  .mini-form-items{
    padding: 12px;
    display: flex;
    flex-wrap: wrap;
    .mini-form-item-box{
      min-width: 50%;
      text-align: center;
      padding: 4px 0;
      label{
        span{
          font-family: initial;
          margin-right: 6px;
        }
        select{
          padding: 2px;
          border-radius: 6px;
          color: $gray-8;
          background: #fff;
        }
        input{
          padding:2px 6px;
          width: 80px;
          border-radius: 4px;
          border: 1px solid $gray-5;
        }
      }
    }
  }
</style>
