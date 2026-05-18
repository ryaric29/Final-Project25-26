const ApplyBtn = document.querySelector('#apply-changes')
const sInput = document.querySelector("#s-input")
const sBtn = document.querySelector("#s-btn")
const resContainer = document.querySelector("#results") 

sBtn.addEventListener("click", fetchDeals)
sInput.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        fetchDeals()
    }
})
ApplyBtn.addEventListener('click', fetchDeals)
let currentResults = []
function fetchDeals() {
    const query = sInput.value.trim().toLowerCase()
    if(query===""){
        resContainer.innerHTML = '<div class="empty-state">Please type a name</div>';
        return
    }
        let url = `https://www.cheapshark.com/api/1.0/deals?title=${query}`
   if (filteredStores.length < 35) {
    url += `&storeID=${checkboxString}`
} else if(filteredStores.length === 0) {
    return
}
     fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            let cheapestDeal = []
            data.forEach(deal => {
                let multiples = false
                if (Number(deal.salePrice) === Number(deal.normalPrice)) { 
                            return
                         }
                for(let i = 0; i < cheapestDeal.length; i++) {
                    if(cheapestDeal[i].gameID === deal.gameID){
                        multiples = true
                        let cheapestPrice = Number(deal.salePrice)
                        let checkedPrice = Number(cheapestDeal[i].salePrice)
                        if(cheapestPrice < checkedPrice) {
                            cheapestDeal[i] = deal
                        } 
                        

                        
                    } 
                  
                }
                if(multiples === false) {
                cheapestDeal.push(deal)
                }
                
                
       
            })
             displayDeals(cheapestDeal) 
             console.log(url)
            
        
})}
function displayDeals(data) {
    resContainer.innerHTML = ""
    if (data.length === 0) {
        resContainer.innerHTML = `<div class="empty-state">No Deals Found for "${sInput.value}" :( </div>`
        return
    }
    data.forEach(deal => {
        let imageUrl = deal.thumb
      const card = document.createElement("div")
        card.className = "deal-card"
        card.innerHTML = `
            <img class="deal-img" src="${imageUrl}" alt="${deal.title}">
            <div class="deal-price">${deal.salePrice} <s>${deal.normalPrice}</s></div>
            <div class="info">
                <h3>${deal.title}</h3>
            </div>
            <button class="all-games-deals"> See more deals for ${deal.title} </button>
        `
        resContainer.appendChild(card)
        })
        
    }
const sidebarToggle = document.querySelector('#sidebar-toggle')
const sidebar = document.querySelector('#sidebar')
const sideXbtn = document.querySelector('#sXbtn')
sidebarToggle.addEventListener('click', function() {
  sidebar.classList.toggle('active')
  sidebarToggle.classList.toggle('sidebaroff')
})
sideXbtn.addEventListener('click', function() {
  sidebar.classList.toggle('active')
  sidebarToggle.classList.toggle('sidebaroff')
})



