const sInput = document.querySelector("#s-input")
const sBtn = document.querySelector("#s-btn")
const resContainer = document.querySelector("#results") 
sBtn.addEventListener("click", fetchDeals)
sBtn.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        fetchDeals()
    }
})

let currentResults = []
function fetchDeals() {
    const query = sInput.value.trim().toLowerCase()
    if(query===""){
        resContainer.innerHTML = '<div class="empty-state">Please type a name</div>';
        return
    }
    const url = `https://www.cheapshark.com/api/1.0/deals?title=${query}`
     fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            let cheapestDeal = []
            data.forEach(deal => {
                let multiples = false
                for(let i = 0; i < cheapestDeal.length; i++) {
                    if(cheapestDeal[i].gameID === deal.gameID){
                        multiples = true
                        let cheapestPrice = Number(deal.salePrice)
                        let  checkedPrice = Number(cheapestDeal[i].salePrice)
                
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
        
})
function displayDeals(data) {
    resContainer.innerHTML = ""
    if (data.length === 0) {
        resContainer.innerHTML = '<div class="empty-state">No Deals Found :( </div>'
        return
    }
    data.forEach(deal => {
        let imageUrl = deal.thumb
      const card = document.createElement("div")
        card.className = "deal-card"
        card.innerHTML = `
            <img src="${imageUrl}" alt="${deal.title}">
            <div class="deal-price">${deal.salePrice} <s>${deal.normalPrice}</s></div>
            <div class="info">
                <h3>${deal.title}</h3>
            </div>
        `
        resContainer.appendChild(card)
        })
        
    }
}

