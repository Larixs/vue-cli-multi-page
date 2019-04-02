/**
* Created by lai on 2018/4/19.

* props *
* name        type                default        detail
*
*/
<template>
  <div>
      <div v-if="compName">
        <component
          :is="compName"
        >
        </component>
      </div>
  </div>

</template>
<script>
  import * as testComponents from "../components"

  export default {
    name: '',
    props: {},
    components: {
      ...testComponents
    },
    mixins: [],
    data(){
      return {
        compName: ''
      }
    },
    created(){
      this.compName = this.$route.params.comp
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
</style>
