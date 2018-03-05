/**
 * Created by lai on 2017/12/28.
 */

const fs = require("fs")
const region = require("./regionTree.json")

function recursive(i){
  let item = []
  if(Array.isArray(i.children)){
    item.push(i.item_name)
    item.push(i.children.map(recursive))
  }else {
    item = i.item_name
  }
  return item

}
let result = region.map(recursive)

fs.writeFile("regionTreeSimple.json", JSON.stringify(result), 'utf8')