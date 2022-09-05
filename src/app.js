const searchBtn = document.getElementById('search-btn')
const breweryList = document.getElementById('brewery-list')
const searchForm = document.getElementById('search-form')
let searchValue = ""

//this function displays API data as an HTML list
let displayData = (data) => {
    data.forEach(brewery => {
        let breweryListItem = document.createElement("li")
    breweryListItem.classList.add("list-item")
        breweryListItem.textContent += brewery.name
        breweryList.appendChild(breweryListItem)
        console.log(brewery.name)
    })
}

let searchByCity = () => {
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchValue}&per_page=100`)
    .then((response) => response.json())
    .then((data) => displayData(data))
}

//stores the value of the search form in real time
searchForm.addEventListener("input", (e) => {
    searchValue = e.target.value
})


searchBtn.addEventListener('click', () => {
    searchByCity()
})
