<template>
    <div class= "rightAppBox"
         :style = "{ top: '-'+ sliderActiveIndex * 100 +'%' }"
         v-on:mousewheel = "changeActivePage($event)"
         v-on:DOMMouseScroll = "changeActivePage($event)"
    >
        <div class="page">
            <SlidePart1></SlidePart1>
        </div>
        <div class="page">
            <SlidePart2></SlidePart2>
        </div>
        <div class="page" >
            <SlidePart3></SlidePart3>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    import SlidePart1 from "./SlidePart1.vue";
    import SlidePart2 from "./SlidePart2.vue";
    import SlidePart3 from "./SlidePart3.vue";
    export default{
        name:"RightApp",
        components:{
            SlidePart1,
            SlidePart2,
            SlidePart3
        },
        computed:{
            sliderActiveIndex(){
                //取得当前页面的index，直接更改right的css高度
                return this.$store.state.isActive.indexOf(true);
            }
        },
        data(){
            return {
                lastWheelEventTime: 0
            }
        },
        methods:{
            changeActivePage(event){
                let t = new Date;
                //在chrome下 滚动事件是连续触发的，滚一次滚轮可能触发好几次滚动事件。
                // 在chrome中、使用我的鼠标的情况下，一次滚动事件的deltaY为100或者-100。
                if( t - this.lastWheelEventTime > 500){
                    this.lastWheelEventTime = t;
                    if(event.deltaY  > 0 || event.detail > 0){
                        this.wheelChangeActive(1);
                    }else{
                        this.wheelChangeActive(-1);
                    }
                }

            },
            ...mapMutations([
                "wheelChangeActive"
            ])
        }
    }
</script>
<style>
    .page{
        height: 100%;
        width: 100%;
        background-color: lightblue
    }
    .rightAppBox{
        position: relative;
        height: 100%;
        width: 100%;
        transition:top 0.4s;
    }
</style>