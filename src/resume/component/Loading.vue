<template>
    <div class="loadingBox">
        <div class="loadingCircle"></div>
    </div>
</template>

<script>
    export default{
        name:"Loading"
    }
    window.onload = function cancelLoading(){
        setTimeout(function(){
            let loadingBox = document.getElementsByClassName("loadingBox")[0];
            loadingBox.classList.add("hiddenLoadingBox");
        },1000);

    }
</script>
<style>
    .loadingBox{
        position: fixed;
        z-index: 9999;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        height:100%;
        width:100%;
        background-color: lightblue;
    }
    .hiddenLoadingBox{
        animation: loadingFade 0.8s;
        animation-fill-mode: forwards;
    }
    .loadingCircle{
        position: absolute;
        top:50%;
        left:50%;
        margin: -50px 0 0 -50px ;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        background-color: #fff;
        animation: scaleOut 1s infinite ease-in-out;
        opacity: 0.8;
    }
    @keyframes scaleOut {
        0%{
            transform:scale(0);
        }
        100%{
            transform: scale(1);
        }
    }
    @keyframes loadingFade {
        from{
            opacity: 1;
        }
        to{
            opacity: 0;
            visibility: hidden;
        }
    }
</style>