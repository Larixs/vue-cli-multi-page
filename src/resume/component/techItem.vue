<template>
    <li class="techInfo">
        <span class="name">{{ techInfo.name }}</span>
        <span class="level"
              :style="{ background: 'linear-gradient(90deg, #fff 0 , #fff '+ techInfo.level * 100 + '%, grey '+ techInfo.level * 100 + '%)'}">
        </span>
        <span class="exp">{{exp}}</span>
    </li>
</template>
<script>
    export default{
        name:"techItem",
        props:["techInfo"],
        computed:{
            exp(){
                var level = this.techInfo.level;
                var exp = "";
                switch (true){
                    case  level > 0 && level <= 0.2:
                        exp = "了解";
                        break;
                    case  level > 0.2 && level <= 0.5:
                        exp = "掌握";
                        break;
                    case  level > 0.5 && level <= 0.7:
                        exp = "熟练";
                        break;
                    case  level > 0.7 && level <=1:
                        exp = "精通";
                        break;
                    default:
                        exp = "未知";
                        break;
                }
                return exp;
            }
        }
    }
</script>
<style >

    .techInfo{
        display: inline-block;
        box-sizing: border-box;
        padding-left: 20px;
        width: 50%;
        margin-bottom: 60px;
    }
    .techInfo .level{
        display: inline-block;
        border-radius: 6px;
        width: 200px;
        height:30px;
        box-shadow: 2px 2px 5px #bbb;
        vertical-align: baseline;
        margin: 0 30px;
    }
    .techInfo .name{
        display: inline-block;
        width: 90px;
        color: grey;
        font-size: 38px;
        font-family: deliciousMocha;
    }
    .techInfo .exp{
        color: #444;
        font-family: youyuan;
        vertical-align: super;
    }
</style>
