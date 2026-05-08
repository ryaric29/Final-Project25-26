const filterButton = document.querySelector('#f-tog')
const menu = document.querySelector('#f-menu')
filterButton.addEventListener('click', toggleFilter)
function toggleFilter() {
    menu.classList.toggle('f-menu')
    if(menu.classList.contains('f-menu')){
        menu.classList.remove('f-menu-displayed')
    } else{
        menu.classList.add('f-menu-displayed')
    }


}