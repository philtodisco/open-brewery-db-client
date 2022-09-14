const searchBtn = document.getElementById('search-btn')
const breweryList = document.getElementById('brewery-list')
const searchForm = document.getElementById('search-form')
const resultsContainer = document.getElementById('results-container')
let searchValue = ""

//this function displays API data as an HTML list
let displayData = (data) => {
    data.forEach(brewery => {
        let listItemContainer = document.createElement("div")
        listItemContainer.classList.add('list-item-container')
        breweryList.appendChild(listItemContainer)
        let listItemTitle = document.createElement("li")
        listItemTitle.classList.add("list-item-title")
        listItemTitle.textContent += `${brewery.name}`
        listItemContainer.appendChild(listItemTitle)
        let listItemBody = document.createElement("li")
        listItemBody.classList.add('list-item-body')
        listItemBody.textContent += `${brewery.city}, ${brewery.state}`
        listItemContainer.appendChild(listItemBody)
        console.log(data)
    })
}

let searchByCity = () => {
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchValue}&per_page=100`)
    .then((response) => response.json())
    .then((data) => displayData(data))
}

//updates and stores the value of the search form in real time
searchForm.addEventListener("input", (e) => {
    searchValue = e.target.value
})


searchBtn.addEventListener('click', () => {
    // searchByCity()
    searchBreweries()
    setTimeout(() => {
        resultsContainer.scrollIntoView({behavior: "smooth"})
    }, 100)     
})

let searchBreweries = () => {
    if (searchValue <= 99999) {
        fetch(`https://api.openbrewerydb.org/breweries?by_postal=${searchValue}&per_page=100`)
        .then((response) => response.json())
        .then((data) => displayData(data))
        return
        }
}


// if (data = []) {
//     console.log("this works")
// }