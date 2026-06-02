const cartContainer = document.querySelector("#cart-container")
let cart = []


// LOCAL STORAGE FUNCTIONS
function loadCart() {
    const saved = localStorage.getItem("gameDeals")
    if (saved !== null) {
        cart = JSON.parse(saved)
    }
    renderCart()
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
}

function toggleCart(game) {
    let found = false
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].gameID === game.gameID) {
            found = true
            break
        }
    }
    if (found) {
        const newCart = []
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].gameID !== game.gameID) {
                newCart.push(cart[i])
            }
        }
        cart = newCart
    } else {
        cart.push(game)
    }
    saveCart()
    renderCart()
}