/**
* Created by lai on 2017/12/14.
*/
<template>
    <div>
        <MiniForm
                :config="MiniFormConfig"
                v-model="miniFormValue"
        >
            <div
            >
                <h3>产品id: {{miniFormValue.productCode}} </h3>
                <ProductChart
                        :data="trend"
                        :productName="productName"
                />
            </div>
        </MiniForm>

    </div>

</template>
<script>
  import {ProductChart} from "base_components"
  import {MiniForm} from "./micro_components"

  export default {
    name: "",
    props: {},
    components: {
      ProductChart,
      MiniForm
    },
    data() {
      const defaultProductCode = "P015978";
      return {
        MiniFormConfig: [
          {
            type: 'select',
            name: 'productCode',
            options: [
              "P015978",
              "P075070",
              "P079697"
            ]
          },
        ],
        miniFormValue: {
          productCode: defaultProductCode
        },
        defaultProductCode,
        trend: [],
        productName: '',
        infoHash: {}
      };
    },
    created() {
    },
    mounted() {
      this.$nextTick(function () {
      });
    },
    filters: {},
    watch: {
      miniFormValue: {
        deep: true,
        handler(val = {}) {
          const code = val.productCode || this.defaultProductCode;
          if (!this.infoHash[code]) {
            this.fetchProductInfo(code);
          }else {
            this.formatProductInfo(this.infoHash[code]);
          }
        }
      }
    },
    computed: {},
    methods: {
      async fetchProductInfo(productCode) {
        const {result} = await this.$$request.post("/api/v1/data/simu/product/info", {
          product_id: productCode,
        });
        this.infoHash[productCode] = result;
        this.formatProductInfo(result);
      },
      formatProductInfo(result) {
        this.trend = this.$lodash.get(result, 'trend');
        this.productName = this.$lodash.get(result, 'product_abbr_name');
      }
    }
  };
</script>
<style lang="scss" scoped>
    @import "~static/css/variables_m";

    h3 {
        padding: 20px 12px;
    }
</style>