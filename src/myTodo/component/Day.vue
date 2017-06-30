
<template>
    <div>Today is {{ time }}</div>
</template>
<script>
    export default{
        name:'Day',
        data(){
            let time = this.$route.params.date;
            if(time === 'today'){
                time = new Date();
            }
            return{
                time
            }
        }
    };
</script>