module.exports = (query) => {
  let filterStatus = [
    {
      name: "ALL",
      status: "",
      class: ""
    },
    {
      name: "Active",
      status: "Active",
      class: ""
    },
    {
      name: "Inactive",
      status: "Inactive",
      class: ""
    }
  ]

  if(query.status){
    const index = filterStatus.findIndex(item => item.status == query.status) 
    filterStatus[index].class = "active"
  }
  else{
    const index = filterStatus.findIndex(item => item.status == "")
    filterStatus[index].class = "active"
  }

  return filterStatus
}