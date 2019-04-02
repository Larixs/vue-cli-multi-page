/**
* Created by lai on 2018/4/24.
*/
<template>
  <div>
    <MiniForm
      v-model="newsGalleryConfig"
      :config="MiniFormConfig"
    >
      <div
        class="news-gallery-box"
      >
        <NewsGallery
          :value="value"
          :imgShape="newsGalleryConfig.imgShape"
          :imgRight="newsGalleryConfig.imgRight"
          :labelType="newsGalleryConfig.labelType"
        />
      </div>
    </MiniForm>
    <div class="news-gallery-box">
      <h3>插槽位置示意</h3>
      <NewsGallery
        :value="value"
      >
        <div slot="title">slot title</div>
        <div slot="label">slot label</div>
        <div slot="time">slot time</div>
      </NewsGallery>
    </div>
  </div>
</template>
<script>
  import { NewsGallery } from "base_components"
  import { MiniForm } from "./micro_components"

  export default {
    name: '',
    props: {},
    components: {
      NewsGallery, MiniForm
    },
    mixins: [],
    data(){
      return {
        value: {
          title: "zelda",
          time: '2018-04-24',
          next_url: 'https://www.zelda.com/',
          pic: this.$imgPath + "test_base_comp/zelda.jpg",
          label: "Larix", //新闻作者，位于左下角
        },
        newsGalleryConfig: {},
        MiniFormConfig: [
          {
            type: 'select',
            name: 'imgShape',
            options: ['square', 'circle', 'none']
          },
          {
            type: 'select',
            name: 'imgRight',
            options: [false, true]
          },
          {
            type: 'select',
            name: 'labelType',
            options: ["default", "golden"],
          }
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

  .news-gallery-box {
    margin-bottom: px2rem(8);
    h3{
      padding: 12px;
      color: lightslategray;
    }
  }
</style>
