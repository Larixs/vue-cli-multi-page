<template>
  <div>
    <transition name="fade">
      <div class="mask" v-show="show" @click="hide()"></div>
    </transition>
    <transition name="up" @before-enter="upBeforeEnter" @after-enter="upAfterEnter" @before-leave="upBeforeLeave">
      <div class="region-selector" v-show="show">
        <div class="title">
          <h1>所在地区</h1>
          <div class="subtitle">
            <h2 :data-checked="navChecked == 0">
              <span>省份</span>
            </h2>
            <h2 :data-checked="navChecked == 1">
              <span>城市</span>
            </h2>
            <h2 :data-checked="navChecked == 2">
              <span>区、县</span>
            </h2>
            <div class="cb"></div>
          </div>
        </div>
        <div class="selector">
          <div v-for="(region, i) in showRegion" :ref="region.key" :id="region.key + '-container'">
            <transition name="fade">
              <ul v-show="region.items.length > 0">
                <li v-for="(item, index) in region.items" @click="selectRegionHandler(region.key, item, i)" :data-checked="temporaryResults[region.key] == item.item_name" class="slide-li">
                  {{item.item_name}}
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import region from './city.json'
export default {
  data: function () {
    return {
      navChecked: 0,
      showRegion: [{
        key: 'province',
        items: []
      }, {
        key: 'city',
        items: []
      }, {
        key: 'county',
        items: []
      }],
      temporaryResults: {},
      isFirstTime: true
    }
  },
  props: [
    'show', 'value'
  ],
  created: function () {
    this.regionSelectorInit()
  },
  mounted: function () {
  },
  watch: {
    value: {
      handler: function (val) {
        const { province, city, county } = val
        this.temporaryResults = { province, city, county }
        // this.setScroll(val)
      },
      deep: true
    },
    show: function (val) {
      this.$nextTick(function () {
        if (val) {
          window.addEventListener('touchmove', this.moveHandler, false);
          if (this.isFirstTime) {
            this.isFirstTime = false
            this.setScroll(this.value)
          }
        } else {
          window.removeEventListener('touchmove', this.moveHandler, false);
        }
      })

    }
  },
  methods: {
    moveHandler: function () {
      if (event.target.className !== "slide-li") {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    setScroll: function (val) {
      const _info = {
        province: {
          sliceStart: 0,
          sliceEnd: 0,

        },
        city: {
          sliceStart: 0,
          sliceEnd: 2,

        },
        county: {
          sliceStart: 0,
          sliceEnd: 4,
        }
      }
      Object.keys(region).forEach((ele, index) => {
        const checked = region[ele].find(e => (val[ele] === e.item_name))
        _info[ele] = { ..._info[ele], ...checked }
      })
      Object.keys(region).forEach((ele, index) => {
        const _arr = region[ele].filter(e => (e.item_code.slice(_info[ele].sliceStart, _info[ele].sliceEnd) == (_info[ele].item_code || '').slice(_info[ele].sliceStart, _info[ele].sliceEnd)))
        this.showRegion[index].items = [..._arr]
        const checkedIndex = _arr.findIndex(e => e.item_name === val[ele])
        this.$nextTick(function () {
          document.getElementById(`${ele}-container`).scrollTop = checkedIndex * 44
        })
      })
    },
    regionSelectorInit: function () {
      var that = this
      this.showRegion = [{
        key: 'province',
        items: []
      }, {
        key: 'city',
        items: []
      }, {
        key: 'county',
        items: []
      }]
      const { province, city, county } = this.value
      this.temporaryResults = { province, city, county }
      delete this.temporaryResults.detail
      region.province.forEach(function (e) {
        that.showRegion[0].items.push(e)
      })
    },
    selectRegionHandler: function (key, ele, nav) {
      var that = this
      this.navChecked = nav
      this.$set(this.temporaryResults, key, ele.item_name)
      var _info = {
        province: {
          index: 0,
          sliceStart: 0,
          sliceEnd: 2,
          nextLevel: 'city',
          clear: function () {
            that.showRegion[1].items = []
            that.showRegion[2].items = []
          }
        },
        city: {
          index: 1,
          sliceStart: 0,
          sliceEnd: 4,
          nextLevel: 'county',
          clear: function () {
            that.showRegion[2].items = []
          }
        },
        county: {
          index: 2,
        }
      }[key]
      if ('nextLevel' in _info) {
        _info.clear()
        this.$nextTick(function () {
          var _arr = region[_info.nextLevel].filter(function (e) {
            return e.item_code.slice(_info.sliceStart, _info.sliceEnd) == ele.item_code.slice(_info.sliceStart, _info.sliceEnd);
          });
          if (_arr.length > 0) {
            _arr.forEach(function (e) {
              that.showRegion[_info.index + 1].items.push(e)
            })
          } else {
            delete this.temporaryResults.county
            this.hide()
            this.$emit('change', this.temporaryResults)
          }
        })

      } else {
        if (this.navChecked) {
          this.hide()
          this.$emit('change', this.temporaryResults)
        }
        this.isRegionSelectorShow = false
      }
    },
    hide: function () {
      this.$emit('show', false)
    },
    upBeforeEnter: function (el) {
      el.style.height = '0px'
      el.style.transitionDuration = '0s'
    },
    upAfterEnter: function (el) {
      el.style.transitionDuration = '0.3s'
      el.style.height = '308px'
    },
    upBeforeLeave: function (el) {
      el.style.height = '0px'
    },
  }
}
</script>
<style lang="scss">
@import "~static/css/variables_m";
.mask {
  width: calc(100% + 400px);
  height: calc(100% + 400px);
  position: fixed;
  top: -200px;
  bottom: -200px;
  left: -200px;
  right: -200px;
  background-color: black;
  opacity: 0.4;
  z-index: 998;
}

.region-selector {
  width: 100%;
  background-color: $gray-3;
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .title {
    background-color: $gray-1;
    h1 {
      width: 100%;
      padding-top: 16px;
      margin: 0;
      font-size: $font-5;
      color: $gray-5;
      line-height: 1;
      text-align: center;
    }
    .subtitle {
      h2 {
        float: left;
        width: calc(100% / 3);
        text-align: center;
        height: 38px;
        &[data-checked] span {
          color: $color-1;
          position: relative;
          &:after {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0px;
            border-bottom: 2px solid $color-1;
          }
        }
        span {
          padding: 12px 0;
          font-size: $font-5;
          color: $gray-8;
          line-height: 1;
          display: inline-block;
        }
      }
    }
  }
  .selector {
    >div {
      height: 240px;
      overflow-y: auto;
      overflow-x: hidden;
      float: left;
      width: calc(100% / 3);
      -webkit-overflow-scrolling: touch;
      li {
        height: 44px;
        text-align: center;
        color: $gray-8;
        font-size: $font-5;
        line-height: 44px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        &[data-checked] {
          color: $color-1;
        }
      }
    }
  }
}
</style>


