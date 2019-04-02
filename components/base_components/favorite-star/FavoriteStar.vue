/**
FavoriteStar
收藏的小星星。

props:

value:    Object. 产品详细信息，用于发送ajax时使用。
isStar:   Any.    是否收藏。
styleObj: Object. 最外层box的样式，可用于调整点击热区等。

*/

<template>
  <div
    :style="styleObj"
    class="favorite-star"
    @click="toggleStar"
    @touchstart.stop
  >
    <i
      :class="{ active : isThisProductStared }"
      class="star"
    ></i>
  </div>
</template>
<script>
import request from "components/request";
import { Toast } from "base_components"
//要可以增大可点击区域
export default {
  name: "FavoriteStar",
  props: {
    styleObj: {
      type: Object
    },
    stop: {
      type:Boolean,
      default: true
    },
    isStar: null,
    value: {
      type: Object,
      default: () => {}
    }
  },
  components:{
    Toast
  },
  data: function() {
    return {
      isThisProductStared: !!this.isStar,
      isPosting: false
    };
  },
  computed: {
    postData: function() {
      const { index_name, product_id, title, product_code } = this.value;
      return {
        index_name,
        product_id: product_id || product_code,
        title
      };
    }
  },
  watch: {
    isStar: function() {
      this.isThisProductStared = !!this.isStar;
    }
  },

  methods: {
    toggleStar: function(event) {
      if(this.stop) event.stopPropagation()
      if (this.isPosting) {
        //避免过快点击造成发送大量的ajax请求的情况
        return;
      }
      if (this.isThisProductStared) {
        this.unStar();
      } else {
        this.star();
      }
    },
    star: function() {
      this.isPosting = true;
      this.isThisProductStared = true; //先显示收藏
      request.post("/api/v1/data/favorite/pick", this.postData).then(res => {
        this.isPosting = false;
        if (res.code !== 0) {
          //如果后台没有返回正确状态，那么取消收藏
          this.isThisProductStared = false;
          Toast(res.msg + ", 添加自选失败")
        } else {
          Toast("添加自选成功")
          this.$emit('starStatus', true)
        }
      });
    },
    unStar: function() {
      this.isPosting = true;
      this.isThisProductStared = false;
      request.post("/api/v1/data/favorite/throw", this.postData).then(res => {
        this.isPosting = false;
        if (res.code !== 0) {
          this.isThisProductStared = true;
          Toast(res.msg + ", 取消自选失败")
        } else {
          Toast("取消自选成功")
          this.$emit('starStatus' , false)
        }
      });
    },
    emitWithArray: function(emitArray) {
      if (Array.isArray(emitArray)) {
        emitArray.forEach(item => {
          this.$emit(item);
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~static/css/variables_m";

$starSize: 20px;
.favorite-star {
  position: relative;
  min-width: $starSize;
  min-height: $starSize;
  line-height: 1;
  i.star {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -$starSize/2;
    margin-left: -$starSize/2;
    width: $starSize;
    height: $starSize;
    background-image: url("~static/img/base_components/favorite-star/star.png");
    background-repeat: no-repeat;
    background-size: 100%;
    transition: all .5s;
  }
  i.star.active {
    background-position: 0 -20px;
  }
}
</style>