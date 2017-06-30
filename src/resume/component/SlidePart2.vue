<template>
    <div class="slidePageContent">
        <div class="leftPage2">
            <h3>技术能力</h3>
            <ul class="techInfoLists">
                <techItem v-for="(item , index) in techInfoArr"
                          :techInfo = "item"
                          :key="index"></techItem>
            </ul>
        </div>
        <div class="rightPage2">
            <h3>小作品</h3>
        </div>
    </div>
</template>

<script>
    import techItem from "./techItem.vue"
    export default{
        name:"SlidePart2",
        components:{
            techItem
        },
        data(){
            return{
                techInfoArr:[
                    { name:"html", level: 0.85},
                    { name:"css", level:0.8 },
                    { name:"vue", level: 0.2},
                    { name:"jquery",level: 0.4},
                    { name:"js(ES5)", level:0.7 },
                    { name:"ES6",level:0.15},
                    { name:"webpack",level:0.35},
                    { name:"D3.js",level:0.4}
                ]
            }
        }
    }
</script>
<style>
    .slidePageContent{
        display: flex;
        flex-wrap: wrap;
        height:100%;
    }
    .techInfoLists{
        position: absolute;
        top: 50%;
        transform: translate(0,-50%);
    }
    .rightPage2{

    }
    .leftPage2{
        position: relative;
        width:70%;
        height:100%;
    }
</style>