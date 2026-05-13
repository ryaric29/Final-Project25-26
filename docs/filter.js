const filterButton = document.querySelector('#f-tog')
const menu = document.querySelector('#f-menu')
const checkboxes = document.querySelectorAll('.ildiv input')
filterButton.addEventListener('click', toggleFilter)
let filteredStores = []
let checkboxString = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35'
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
checkboxString = filteredStores.join()
console.log(checkboxString)
}


