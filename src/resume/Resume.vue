<template>
    <div id="app">
        <Loading></Loading>
        <div class="leftApp">
            <LeftApp></LeftApp>
        </div>
        <div class="rightApp">
            <RightApp></RightApp>
        </div>
    </div>
</template>

<script>
    import LeftApp from "./component/LeftApp.vue";
    import RightApp from "./component/RightApp.vue";
    import Loading from "./component/Loading.vue";
    export default{
        components:{
            LeftApp,
            RightApp,
            Loading
        }

    }
</script>

<style>
    html,body{
        min-height: 100%;
        height:100%;
        overflow: hidden;
    }
    #app{
        display: flex;
        position: relative;
        min-width: 1500px;
        min-height: 600px;
        height: 100%;;
    }
    .leftApp{
        width: 15%;
        /*亮出阴影部分*/
        z-index: 2;
        position: relative;
    }
    .rightApp{
        height: 100%;
        width: 85%;
    }
    h3{
        height: 54px;
        line-height: 54px;
        text-align: left;
        padding: 18px 0 0 20px;
        font-size: 28px;
        letter-spacing: 4px;
        text-shadow: 1px 1px 3px #aaa;
        color: #fff;
    }
</style>

