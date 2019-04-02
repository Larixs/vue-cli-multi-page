<template>
  <div @click.stop.prevent="clickHandler(value)">
    <ProductDetailName
      :isHot="isHot"
      :value="value.name"/>
    <authProxy
      v-if="code!==undefined"
      :code="code"
    >
      <ProductDetailData
        :value="value.detail"
        :replaceStr="value.replaceStr"
      />
    </authProxy>
    <ProductDetailData
      v-else
      :value="value.detail"
      :replaceStr="value.replaceStr"
    />
    <ProductDetailComment :value="value.comment"/>
    <slot></slot>
  </div>
</template>
<script>
import {
  ProductDetailName,
  ProductDetailComment,
  authProxy,
  ProductDetailData
} from "base_components";

export default {
  name: "ProductDetail",
  data: function() {
    return {};
  },
  props: {
    code: { type: [Number, String] }, //如果传code，则用authProxy，如果没有code，则不用authProxy
    value: { type: Object, default: { name: "", detail: "", comment: "" } },
    isHot: {
      type: Boolean
    },
    clickHandler: {
      type: Function,
      default: function(value) {
        this.$$utils.jump(this.$lodash.get(value, "next_url"));
      }
    }
  },
  components: {
    ProductDetailName,
    ProductDetailComment,
    ProductDetailData,
    authProxy
  },
  methods: {},
  watch: {},
  computed: {},
  created: function() {}
};
</script>
<style lang="scss" scoped>

</style>