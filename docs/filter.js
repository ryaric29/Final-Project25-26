const filterButton = document.querySelector('#f-tog')
const menu = document.querySelector('#f-menu')
const checkboxes = document.querySelectorAll('.ildiv input')
filterButton.addEventListener('click', toggleFilter)
let filteredStores = []
let checkboxString = ''
function toggleFilter() {
    menu.classList.toggle('f-menu')
    if(menu.classList.contains('f-menu')){
        menu.classList.remove('f-menu-displayed')
    } else{
        menu.classList.add('f-menu-displayed')
    }


}
for(let checkbox of checkboxes ){
    checkbox.addEventListener('change', updateCheckboxes)
}

function updateCheckboxes() {
  filteredStores = []
    for (let checkbox of checkboxes ){
    if(checkbox.checked){
        filteredStores.push(checkbox.name)
    }
}
let checkboxString = filteredStores.join()
console.log(checkboxString)
}

function filterStores() {
    if(filteredStores.length === 35){
        return
    } else {
        url += `&storeID=${checkboxString}`
    }
    console.log(url)

}

