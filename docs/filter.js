const filterButton = document.querySelector('#f-tog')
const menu = document.querySelector('#f-menu')
const checkboxes = document.querySelectorAll('.ildiv input')
filterButton.addEventListener('click', toggleFilter)
let filteredStores = []
function toggleFilter() {
    menu.classList.toggle('f-menu')
    if(menu.classList.contains('f-menu')){
        menu.classList.remove('f-menu-displayed')
    } else{
        menu.classList.add('f-menu-displayed')
    }


}

for (let checkbox of checkboxes ){
    if(checkbox.checked){
        filteredStores.push(checkbox.name)
    }
}
console.log(filteredStores)