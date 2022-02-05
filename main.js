// define elements

let name = document.querySelector("#name")
let price = document.querySelector("#price")
let discount= document.querySelector("#discount")
let total = document.querySelector("#total")
let submit = document.querySelector("#submit")
let totalP = document.querySelector(".inputs-c2 p")
let table = document.querySelector("#table")
let deleteBtn = document.querySelector("#delete")
let deleteAll = document.querySelector("#deleteAll")
let pNumber = document.querySelector("#p-number")
let errorsDiv = document.querySelector(".errors")







// get total

function getTotal(){
  let totalCount = (+price.value - +discount.value)
  total.innerHTML = totalCount + "$"
  if (totalCount<0) {
    total.style ="color:red;"
    totalP.style = "background-color: rgba(255, 0, 0, 0.10)"
  }else{
    total.style ="color:green;"
    totalP.style = "background-color: rgba(0, 192, 130, 0.13)"
    if (totalCount == 0) {
      total.style = "none"
      totalP.style = "none"
    }else{}
  }
}
price.oninput = function(){getTotal()}
discount.oninput = function(){getTotal()}








// check empty inputs
function check(){
  let errors = []
  if (name.value.length>0 && price.value.length>0) {
    btnOnclick()
    errorsDiv.style = "display: none"
  }else{
  if (name.value.length == 0){
    errors.push("Name is empty !")
  }
  if (price.value.length == 0) {
    errors.push("Price is empty !")
  }
 
    if (errors.length > 0) {
      
      let errorsP = "<ul>"
      for (var i = 0; i < errors.length; i++) {
        errorsDiv.style = "display: flex"
        errorsP += "<li>" + errors[i] + "</li>"
      }
      errorsP += "</ul>"
      errorsDiv.innerHTML = errorsP
      }
    }}





// initialize & define the array

let data = []
if (localStorage.products != null) {
  data = JSON.parse(localStorage.products)
}else{
  let data = [];
}

// delete btn function
function deleteAllBtn(){
  if (data.length > 0) {
    deleteAll.style = "display: block"
  } else {
    deleteAll.style = "display: none"
  }
}
deleteAllBtn()








// create an product on click

submit.onclick = function(){check()}
function btnOnclick() {

    // create the product
    let dataP = {
      name: name.value,
      price: price.value,
      discount: discount.value,
      total: total.innerHTML,
      productsNumber: pNumber.value,
    }

    let clearData = (
      name.value = "",
      price.value = "",
      discount.value = "",
      total.innerHTML = "",
      total.innerHTML = "",
      totalP.style = "none",
      pNumber.value = ""
    )

    if (dataP.productsNumber > 1) {
      for (var i = 0; i < dataP.productsNumber; i++) {
        data.push(dataP)
        localStorage.setItem("products", JSON.stringify(data));
        clearData
        dataOut()
      }
    } else {
      data.push(dataP)
      localStorage.setItem("products", JSON.stringify(data));
      clearData;
      dataOut()
    }
    dataOut()
  }








// show all data from array in the table

function dataOut(){
 let tbody = ''
  for (var i = 0; i < data.length; i++) {
  tbody += `<tr>
              <td>${i+1}</td>
              <td>${data[i].name}</td>
              <td>${data[i].price}</td>
              <td>${data[i].discount}</td>
              <td>${data[i].total}</td>
              <td><button id="edit">Edit</button></td>
              <td><button id="delete" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`
  }
  table.innerHTML = tbody
  if (data.length > 0) {
    deleteAll.style = "display: block"
  } else {
    deleteAll.style = "display: none"
  }

}
dataOut()









// delete an product 

function deleteProduct(i) {
  setTimeout(()=> {
  data.splice(i,1);
  localStorage.products = JSON.stringify(data)
  dataOut()
}, 150) 
  
}








// delete all products

function deleteAllProducts(){
  data.splice(0)
  localStorage.clear()
  dataOut()
}
deleteAll.onclick = function(){setTimeout(()=>{deleteAllProducts()}, 250)}





