const ProductCategory = require('../model/products-categoryModel')

module.exports.getSubCategory = async (parentId) => {
  const getCategory = async (parentId) => {
    const subs = await ProductCategory.find({
      parent_id: parentId,
      status: "Active",
      deleted: false
    })
  
    let allSub = [...subs]
  
    for(const sub of subs){
      const childs = await getCategory(sub.id)
      allSub = allSub.concat(childs)
    }
  
    return allSub
  }
  const result = await getCategory(parentId)
  return result
}