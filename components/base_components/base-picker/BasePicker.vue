/**
* Created by lai
* base-picker
* 半受控组件（？）。可以通过selectedIndex进行控制。
* 基础选择器。可以根据data里array的数量调整选择器的列数。本组件来自于better-scroll的示例。
* 直接拿过来用了，里面还是有些不太理解或者说不太合理的地方。
* 原作者使用vue的习惯在我看来不太好。譬如可能考虑到不需要对data里的某个数组进行监听，他就直接使用索引修改数据。可能不监听的数据也不注册到data里，就直接用“this.”进行初始化和修改。
* 欢迎修改或重写

* props *
* name           type       detail
* data           Array      所有选项的数据。形如[q1,q2,q3]（可以调整数量）。q1、q2、q3均为数组，内含第一列、第二列、第三列的所有选项。
*                           每个选项为对象，需要有text和value属性（也可以只传value，此时text与value相同。
* title          String     base-picker的名称，如果有值，则显示在“取消”和“确定”按钮中间
* cancelTxt      String     关闭此组件的按钮的文案。默认是“取消”
* confirmTxt     String     确认选值的按钮的文案。默认是“确定”
* selectedIndex  Array      选中的选项的index。
* styleRules
*


* emit *
* event           triggerTime                                         return
* select          点击确认按钮                                        -
* cancel          点击关闭按钮                                        -
* change          滚轮停止之后                                        base-picker的展示值
* hide            关闭base-picker                                     -
* valuechange     点击确认按钮时,且当前选择的值与上一个选择的值不同   base-picker的选值

*/


<template>
  <transition name="picker-fade">
    <div class="picker" v-show="state===1" @touchmove.prevent @click="cancel">
      <transition name="picker-move">
        <div class="picker-panel" v-show="state===1" @click.stop>
          <div class="picker-choose border-bottom-1px">
            <span
              :style="btnStyleObj"
              @click="cancel"
              class="cancel"
              v-clickFeedback
            >{{cancelTxt}}</span>
            <span
              :style="btnStyleObj"
              @click="confirm"
              class="confirm"
              v-clickFeedback
            >{{confirmTxt}}</span>
            <h1 class="picker-title">{{title}}</h1>
          </div>
          <div class="picker-content">
            <div class="mask-top border-bottom-1px"></div>
            <div class="mask-bottom border-top-1px"></div>
            <div
              ref="wheelWrapper"
              :style="styleRules ? styleRules.wrapperStyle : {}"
              class="wheel-wrapper"
            >
              <div class="wheel" v-for="data in pickerData">
                <ul class="wheel-scroll">
                  <li
                    v-for="item in data"
                    :style="styleRules ? styleRules.optionStyle : {}"
                    class="wheel-item"
                  >{{item.text || item.value}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="picker-footer"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  import "directive/clickFeedback"
  import BScroll from 'better-scroll'

  const STATE_HIDE = 0
  const STATE_SHOW = 1
  const COMPONENT_NAME = 'picker'
  const EVENT_SELECT = 'select'
  const EVENT_VALUE_CHANGE = 'valuechange'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CHANGE = 'change'
  const EVENT_HIDE = 'hide'

  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: Array,
        default(){
          return []
        }
      },
      title: {
        type: String,
        default: "",
      },
      cancelTxt: {
        type: String,
        default: '取消'
      },
      confirmTxt: {
        type: String,
        default: '确定'
      },
      selectedIndex: {
        type: Array,
        default(){
          return []
        }
      },
      styleRules: {
        type: [Array, Object, String, Function]
      }
    },
    data(){
      return {
        state: STATE_HIDE,
        pickerData: this.data.slice(),
        pickerSelectedIndex: this.selectedIndex,
        pickerSelectedVal: [],
        pickerSelectedText: [],
        wheels: []
      }
    },
    created(){
      if ( !this.pickerSelectedIndex.length ) {
        this.pickerSelectedIndex = []
        for ( let i = 0; i < this.pickerData.length; i++ ) {
          this.pickerSelectedIndex[i] = 0
        }
      }
    },
    computed: {
      btnStyleObj(){
        return {
          width: !!this.title ? "20%" : "50%",
        }
      }
    },
    methods: {
      confirm(){
        if ( !this._canConfirm() ) {
          return
        }
        this.hide()
        let changed = false
        for ( let i = 0; i < this.pickerData.length; i++ ) {
//          let index = this.wheels[i].getSelectedIndex() //不知为何，在从初始年份切换到其他年份（月、日未变）时，若初始年份的月份不足12月，则滚动
//          this.pickerSelectedIndex[i] = index
          let index = this.pickerSelectedIndex[i]
          let value = null
          if ( index !== -1 && this.pickerData[i][index] !== undefined ) {
            this.pickerSelectedText[i] = this.pickerData[i][index].text
            value = this.pickerData[i][index].value
          } else {
            this.pickerSelectedIndex.splice(i, 1, -1)
            this.pickerSelectedText[i] = ""
            value = ""
          }

          if ( this.pickerSelectedVal[i] !== value ) {
            changed = true
          }

          this.pickerSelectedVal[i] = value


        }
        this.$emit(EVENT_SELECT, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)
        if ( changed ) {
          this.$emit(EVENT_VALUE_CHANGE, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)
        }

      },
      cancel(){
        this.hide()
        this.$emit(EVENT_CANCEL)
      },
      show(){
        if ( this.state === STATE_SHOW ) {
          return
        }
        this.state = STATE_SHOW
        if ( !this.wheels.length || this.dirty ) {
          this.$nextTick(() =>{
            this.init();
            this.dirty = false
          })
        } else {
          for ( let i = 0; i < this.pickerData.length; i++ ) {
            this.wheels[i].enable()
            this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
          }
        }
      },
      hide(){
        this.$emit(EVENT_HIDE)
        this.state = STATE_HIDE
        for ( let i = 0; i < this.pickerData.length; i++ ) {
          this.wheels[i].disable()
        }
      },
      setData(data){
        this.pickerData = data.slice()
        this.dirty = true
        this.refresh()
      },
      setSelectedIndex(index){
        this.pickerSelectedIndex = index
        this.refreshSelectedIndex(index)
      },
      refreshSelectedIndex(dist){
        this.wheels.forEach((wheel, index) =>{
          wheel.wheelTo(dist[index])
        })
      },
//      refill(datas){
//        let ret = []
//        if ( !datas.length ) {
//          return ret
//        }
//        datas.forEach((data, index) =>{
//          ret[index] = this.refillColumn(index, data)
//        })
//        return ret
//      },
//      refillColumn(index, data){
//        if ( this.state !== STATE_SHOW ) {
//          console.error('can not use refillColumn when picker is not show')
//          return
//        }
//        const wheelWrapper = this.$refs.wheelWrapper
//        let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
//        let wheel = this.wheels[index]
//        if ( scroll && wheel ) {
//          let oldData = this.pickerData[index]
//          this.$set(this.pickerData, index, data)
//          let selectedIndex = wheel.getSelectedIndex()
//          let dist = 0
//          if ( oldData.length ) {
//            let oldValue = oldData[selectedIndex].value
//            for ( let i = 0; i < data.length; i++ ) {
//              if ( data[i].value === oldValue ) {
//                dist = i
//                break
//              }
//            }
//          }
//          this.pickerSelectedIndex[index] = dist
//          this.$nextTick(() =>{
//            // recreate wheel so that the wrapperHeight will be correct.
//            wheel = this._createWheel(wheelWrapper, index)
//            wheel.wheelTo(dist)
//          })
//          return dist
//        }
//      },
//      scrollTo(index, dist){
//        const wheel = this.wheels[index]
//        this.pickerSelectedIndex[index] = dist
//        wheel.wheelTo(dist)
//      },
      refresh(){
        this.$nextTick(() =>{
          this.wheels.forEach((wheel, index) =>{
            wheel.refresh()
          })
        })
      },
      init(){
        this.wheels = []
        let wheelWrapper = this.$refs.wheelWrapper
        for ( let i = 0; i < this.pickerData.length; i++ ) {
          this._createWheel(wheelWrapper, i)
        }
      },
      _createWheel(wheelWrapper, i){
        if ( !this.wheels[i] ) {
          this.wheels[i] = new BScroll(wheelWrapper.children[i], {
            wheel: {
              selectedIndex: this.pickerSelectedIndex[i],
              /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
              wheelWrapperClass: 'wheel-scroll',
              wheelItemClass: 'wheel-item'
            },
            probeType: 3
          })
          this.wheels[i].on('scrollEnd', () =>{
            this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex())
          })
        } else {
          this.wheels[i].refresh()
        }
        return this.wheels[i]
      },
      _canConfirm(){
        return this.wheels.every((wheel) =>{
          return !wheel.isInTransition
        })
      }
    },
    watch: {
      data(newData){
        this.setData(newData)
      },
      selectedIndex(newIndex){
        this.setSelectedIndex(newIndex)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .picker
    position: fixed
    left: 0
    top: 0
    z-index: 100
    width: 100%
    height: 100%
    overflow: hidden
    text-align: center
    font-size: 14px
    background-color: rgba(0, 0, 0, 0.5)
    &.picker-fade-enter, &.picker-fade-leave-active
      opacity: 0
    &.picker-fade-enter-active, &.picker-fade-leave-active
      transition: all .3s ease-in-out
    .picker-panel
      position: absolute
      z-index: 600
      bottom: 0
      width: 100%
      height: 273px
      background: #fff
      &.picker-move-enter, &.picker-move-leave-active
        transform: translate3d(0, 273px, 0)
      &.picker-move-enter-active, &.picker-move-leave-active
        transition: all .3s ease-in-out
      .picker-choose
        position: relative
        height: 44px
        color: #a97335;
        .picker-title
          margin: 0
          line-height: 44px
          font-weight: normal
          text-align: center
          font-size: 16px
          color: #a97335;
        .confirm, .cancel
          top: 6px
          font-size: 16px
          line-height: 44px
        .confirm
          float: right
          color: #a97335;
          &:active
            color: #a97335;
        .cancel
          float left
          &:active
            color: #a97335;
      .picker-content
        position: relative
        top: 20px
        .mask-top, .mask-bottom
          z-index: 10
          width: 100%
          height: 68px
          pointer-events: none
          transform: translateZ(0)
        .mask-top
          position: absolute
          top: 0
          background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8))
        .mask-bottom
          position: absolute
          bottom: 1px
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8))
      .wheel-wrapper
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        padding: 0 16px
        .wheel
          -ms-flex: 1 1 1 e-9px;
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          flex: 1;
          -webkit-flex-basis: 1 e-9px;
          -ms-flex-preferred-size: 1 e-9px;
          flex-basis: 1 e-9px;
          height: 173px
          overflow: hidden
          font-size: 18px
          .wheel-scroll
            padding: 0
            margin-top: 68px
            line-height: 36px
            list-style: none
            .wheel-item
              list-style: none
              height: 36px
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis;
              color: #000
    .picker-footer
      height: 20px
</style>