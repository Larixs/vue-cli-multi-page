 const utils = require("./utils");

const projectNames = process.argv.slice(2);
const indexOfCType = projectNames.indexOf("c");
const indexOfPType = projectNames.indexOf("p");
if(indexOfCType !== -1){
    projectNames.splice(indexOfCType,1)
    utils.rmComponent(projectNames);
}else if(indexOfPType !== -1){
    projectNames.splice(indexOfPType,1)
    utils.rmProject(projectNames);
}else{
    console.log("you need to choose something to remove");
}
