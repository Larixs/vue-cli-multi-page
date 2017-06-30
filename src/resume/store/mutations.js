export const state = {
    isActive:[true,false,false]
};

export const mutations ={
    changeActive(state,index){
        let lastActInd = state.isActive.indexOf(true);
        state.isActive.splice(lastActInd,1,false);
        state.isActive.splice(index,1,true);
    },
    wheelChangeActive(state,flag){
        let lastActInd = state.isActive.indexOf(true);
        let nextActInd;
        //flag=1，下翻一页，flag=-1，上滑一页
        if(flag === 1){
            nextActInd = lastActInd === state.isActive.length - 1 ? 0 : lastActInd + 1;
        }else if(flag === -1){
            nextActInd = lastActInd === 0 ? state.isActive.length - 1 : lastActInd - 1;
        }else{
            return;
        }
        state.isActive.splice(lastActInd,1,false);
        state.isActive.splice(nextActInd,1,true);
    }
};