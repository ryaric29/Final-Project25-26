const ApplyBtn = document.querySelector('#apply-changes')
const sInput = document.querySelector("#s-input")
const sBtn = document.querySelector("#s-btn")
const resContainer = document.querySelector("#results")
const moreDealsBtn = document.querySelectorAll(".all-games-deals")
sBtn.addEventListener("click", fetchDeals)
sInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        fetchDeals()
    }
})
ApplyBtn.addEventListener('click', fetchDeals)
let currentResults = []
function fetchDeals() {
    const query = sInput.value.trim().toLowerCase()
    if (query === "") {
        resContainer.innerHTML = '<div class="empty-state">Please type a name</div>';
        return
    }
    let url = `https://www.cheapshark.com/api/1.0/deals?title=${query}`
    if (filteredStores.length < 35) {
        url += `&storeID=${checkboxString}`
    } else if (filteredStores.length === 0) {
        return
    }
    filterBtns.forEach(btn => {
        if (btn.classList.contains('lowprice') && btn.classList.contains('active')) {
            url += `&sortBy=Price`
        }
        if (btn.classList.contains('perc-saved') && btn.classList.contains('active')) {
            url += `&sortBy=Savings`
        }
        if (btn.classList.contains('rating-s') && btn.classList.contains('active')) {
            url += `&sortBy=DealRating`
        }
    })
    if (minPriceInp.value && maxPriceInp.value) {
        url += `&lowerPrice=${minPriceInp.value}`
        url += `&upperPrice=${maxPriceInp.value}`
    } else if (minPriceInp.value && !maxPriceInp.value) {
        url += `&lowerPrice=${minPriceInp.value}`
    } else if (!minPriceInp.value && maxPriceInp.value) {
        url += `&upperPrice=${maxPriceInp.value}`
    }
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            let cheapestDeal = []
            data.forEach(deal => {
                let multiples = false
                if (Number(deal.salePrice) === Number(deal.normalPrice)) {
                    return
                }
                for (let i = 0; i < cheapestDeal.length; i++) {
                    if (cheapestDeal[i].gameID === deal.gameID) {
                        multiples = true
                        let cheapestPrice = Number(deal.salePrice)
                        let checkedPrice = Number(cheapestDeal[i].salePrice)
                        if (cheapestPrice < checkedPrice) {
                            cheapestDeal[i] = deal
                        }



                    }

                }
                if (multiples === false) {
                    cheapestDeal.push(deal)
                }



            })
            currentResults = cheapestDeal
            displayDeals(cheapestDeal)
            console.log(url)


        })
}
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
        const inCart = cart.some(item => item.gameID === deal.gameID)
        card.innerHTML = `
            <img class="deal-img" src="${imageUrl}" alt="${deal.title}">
            <div class="deal-price"><strong class="sale-price">$${deal.salePrice}</strong> <s class="normal-price">$${deal.normalPrice}</s></div>
            <div class="info">
                <h3 class="deal-title">${deal.title}</h3>
            </div>
            <a class="link-to-btn" href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" target="_blank">
                <button class="link-to-btn"><img class="link-to-image" src="images/external-link (1).svg"></button></a>
            </a>
            <button class="all-games-deals"> See more deals for ${deal.title} </button>
            <button class="add-to-cart">
    ${inCart ? "Remove from Cart" : "Add to Cart"}
</button>
        `
        resContainer.appendChild(card)
        const addBtn = card.querySelector(".add-to-cart")

        addBtn.addEventListener("click", function () {
            toggleCart(deal)
        })
    })

}
const sidebarToggle = document.querySelector('#sidebar-toggle')
const sidebar = document.querySelector('#sidebar')
const sideXbtn = document.querySelector('#sXbtn')
sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('active')
    sidebarToggle.classList.toggle('sidebaroff')
})
sideXbtn.addEventListener('click', function () {
    sidebar.classList.toggle('active')
    sidebarToggle.classList.toggle('sidebaroff')
})


loadCart()
