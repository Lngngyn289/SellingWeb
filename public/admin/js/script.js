//Start button status
const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0){
  let url = new URL(window.location.href);
  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      
      if(status){
        url.searchParams.set("status", status) 
      }
      else url.searchParams.delete("status")
      
      window.location.href = url.href
    })
  })
}
//End button status

//Form Search
const formSearch = document.querySelector('#form-search')
if(formSearch){
  let url = new URL(window.location.href)
  formSearch.addEventListener('submit', (e) => {
    e.preventDefault()
    const keyword = e.target.elements.keyword.value
    if(keyword){
      url.searchParams.set("keyword", keyword)
    }
    else{
      url.searchParams.delete("keyword")
    }
    window.location.href = url.href
  })
}

//Pagination 
const buttonPagination = document.querySelectorAll("[button-pagination]")
if(buttonPagination){
  let url = new URL(window.location.href)
  buttonPagination.forEach(button => {
    button.addEventListener('click', () => {
      const page = button.getAttribute("button-pagination")
      url.searchParams.set("page", page)
      window.location.href = url.href
    })
  })
}

//Check-box
const checkboxMulti = document.querySelector("[checkbox-multi]")
  if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputIds = checkboxMulti.querySelectorAll("input[name='id']")
    inputCheckAll.addEventListener("click", () => {
      if(inputCheckAll.checked){
        inputIds.forEach(input => {
          input.checked = true
        })
      }
      else{
        inputIds.forEach(input => {
          input.checked = false
        })
      }
    })
    inputIds.forEach(input => {
      input.addEventListener("click", () => {
        const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
        if(countChecked == inputIds.length){
          inputCheckAll.checked = true
        }        
        else{
          inputCheckAll.checked =  false
        }
      })
    })
  }

  //Form Execute Multi 
  const formChangeMulti = document.querySelector("[form-change-multi]")
  if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) =>{
      e.preventDefault()
      const inputsChecked = document.querySelectorAll("input[name='id']:checked")
      const checkboxMulti = document.querySelector("[checkbox-multi]")

      const typeChange = e.target.elements.type.value
      if(typeChange == "Delete"){
        const isConfirm = confirm("Are you sure to delete")
        if(!isConfirm){
          return
        }
      }


      if(inputsChecked.length > 0){
        let ids = []
        const inputIds = formChangeMulti.querySelector("input[name='ids']")
  
        inputsChecked.forEach(input => {
          const id = input.value
          ids.push(id)
        })
  
        inputIds.value = ids.join(", ")
        formChangeMulti.submit()
      }
      else{
        alert("Pick at least 1 product")
      }
    })
  }

  //show alert
  const showAlert = document.querySelector("[show-alert]")
  if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    setTimeout(() => {
      showAlert.classList.add("alert-hidden")
    }, time)
  }

  const uploadImage = document.querySelector("[upload-image]")
  if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    console.log(uploadImagePreview)
    uploadImageInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      console.log(file)
      if(file){
        uploadImagePreview.src = URL.createObjectURL(file)
      } 
    })
    const removeImage = document.querySelector("[remove-image]")
    removeImage.addEventListener("click", (e) => {
      uploadImagePreview.src = ""
      uploadImageInput.value = ""
    })
  }

  //Sỏt
  const sort = document.querySelector("[sort]")
  if(sort){
    let url = new URL(window.location.href)

    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]")
    
    sortSelect.addEventListener("change", (e) => {
      const value = e.target.value
      const [sortKey,sortValue] = value.split("-")
      url.searchParams.set("sortKey", sortKey)
      url.searchParams.set("sortValue", sortValue)

      window.location.href = url.href
    })

    sortClear.addEventListener("click", () => {
      url.searchParams.delete("sortKey")
      url.searchParams.delete("sortValue")
      window.location.href = url.href;
    })

    const sortKey = url.searchParams.get("sortKey")
    const sortValue = url.searchParams.get("sortValue")
    if(sortKey && sortValue){
      const stringSort = `${sortKey}-${sortValue}`
      console.log(stringSort)
      const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
      optionSelected.selected = true
    }
  }


  