/**
 * Created by lai on 2017/12/28.
 */

const fs = require("fs")
const region = require("./regionArray.json")

const cities = region.city.map(city =>{
  "use strict";
  const item = {
    item_code: city.item_code,
    item_name: city.item_name,
  }
  const cityCode = city.item_code.slice(0, 4)
  const children = region.county.filter(i =>{
    return i.item_code.slice(0, 4) === cityCode
  })
  item.children = children
  return item
})

const result = region.province.map((province) =>{
  "use strict";
  const item = {
    item_code: province.item_code,
    item_name: province.item_name,
  }
  const provinceCode = province.item_code.slice(0, 2)
  const children = cities.filter(i =>{
    return i.item_code.slice(0, 2) === provinceCode
  })
  item.children = children
  return item
})

fs.writeFile("regionTree.json", JSON.stringify(result), 'utf8')