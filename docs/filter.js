const filterMenu = document.querySelector('#f-tog')
const menu = document.querySelector('#f-menu')
const checkboxes = document.querySelectorAll('.ildiv input')
const SelAllBtn = document.querySelector('#sel-all')
const DesAllBtn = document.querySelector('#des-all')
const filterBtns = document.querySelectorAll('.lowprice, .perc-saved, .rating-s')
const clearSBtn = document.querySelector('#clear-sort')
const minPriceInp = document.querySelector('#min-price-input')
const maxPriceInp = document.querySelector('#max-price-input')
filterMenu.addEventListener('click', toggleMenu)
SelAllBtn.addEventListener('click', selectAll)
DesAllBtn.addEventListener('click', deselectAll)
SelAllBtn.addEventListener('click', updateCheckboxes)
DesAllBtn.addEventListener('click', updateCheckboxes)
clearSBtn.addEventListener('click', clearSort)
let filteredStores = []
let checkboxString = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35'
function toggleMenu() {
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
function clearSort(){
    filterBtns.forEach(btn => {
        btn.classList.remove('active')
    })
}
function selectAll() {
    for(let checkbox of checkboxes) {
        checkbox.checked = true
    }
}
function deselectAll() {
    for(let checkbox of checkboxes) {
        checkbox.checked = false
    }
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
filterBtns.forEach(btn => {
   btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.toggle('active');
  });
});
