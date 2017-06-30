<template>
    <li >
        <a href="#" :class="{ active:itemIsActive }"
           v-on:click="changeActive(itemIndex)"
        >{{ itemText }}</a>
    </li>
</template>

<script>
    import { mapMutations } from 'vuex'
    export default{
        name:"myMenuItem",
        props:["itemText","itemIndex","itemIsActive"],
        methods:{
                ...mapMutations([
                    "changeActive"
                ])
        }
    }
</script>

<style scoped>
    li{
        text-align:center;
        height: 80px;
    }
    a{
        color: transparent;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
        cursor: pointer;
        transition: all 0.3s;
    }
    a:hover{
        color: #777;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    }
    .active{
        color: #777;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
        font-size: 110%;
    }
</style>