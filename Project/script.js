const sInput = document.querySelector("#s-input")
const sBtn = document.querySelector("#s-btn")
const resContainer = document.querySelector("#results")

function fetchDeals() {
    const query = sInput.value.trim().toLowercase()
    if(query===""){
        resultsContainer.innerHTML = '<div class="empty-state">Please type a name</div>';
        return
    }
    const url = "https://www.cheapshark.com/api/1.0/deals"
}