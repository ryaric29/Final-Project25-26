const cartContainer = document.querySelector("#cart-container")
const cartTotalEl = document.querySelector("#cart-total")
let cart = []

function loadCart() {
    const saved = localStorage.getItem("gameDeals")
    if (saved !== null) {
        cart = JSON.parse(saved)
    }
    renderCart()
}
function updateCartTotal() {
    let total = 0

    for (let i = 0; i < cart.length; i++) {
        total += Number(cart[i].salePrice)
    }

    document.querySelector("#cart-total").textContent =
        `Total: $${total.toFixed(2)}`
}
function saveCart() {
    localStorage.setItem("gameDeals", JSON.stringify(cart))
}
function renderCart() {
    if (cart.length === 0) {
        cartContainer.innerHTML = `
        <div class="empty-state">Your cart is empty. Add deals to see them here!</div>      
        `
        return
    }

    cartContainer.innerHTML = ""
    for (let i = 0; i < cart.length; i++) {
        const game = cart[i]
        const card = document.createElement("div")
        card.className = "cart-card"
        card.innerHTML = `
        <img src="${game.thumb}" alt="${game.title}">
        <div class="info">
            <h3>${game.title}</h3>
            <div class="deal-price"><strong class="sale-price">$${game.salePrice}</strong> <s class="normal-price">$${game.normalPrice}</s></div>
            <button class="remove-btn">❌ Remove</button>
            
        </div>
        `
        cartContainer.appendChild(card)
        const removeBtn = card.querySelector(".remove-btn")
        removeBtn.addEventListener("click", function () {
            toggleCart(game)
           
        })
    }
    updateCartTotal()
}

function toggleCart(game) {
    const index = cart.findIndex(item => item.gameID === game.gameID)

    if (index !== -1) {
        cart.splice(index, 1)
    } else {
        cart.push(game)
    }

    saveCart()
    renderCart()
    displayDeals(currentResults)
}