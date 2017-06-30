<style scoped>
    ul{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 80px 0 150px 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.05);
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }
</style>

<template>
    <ul>
        <myMenuItem v-for = "(menuItem, index) in menuItems"
                    :key = "index"
                    :itemIndex = "index"
                    :itemText = "menuItem"
                    :itemIsActive = "isActive[index]" >
        </myMenuItem>
    </ul>
</template>

<script>
    import myMenuItem from "./myMenuItem.vue";
    export default{
        name:"LeftMenu",
        data(){
            return{
                //可以考虑改成英文版的
                menuItems:["基本信息","技术能力","个人生活"]
            }
        },
        components:{
            myMenuItem
        },
        computed:{
            isActive(){
                return this.$store.state.isActive;
            }
        }
    }
</script>