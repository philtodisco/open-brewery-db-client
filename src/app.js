const showAllBtn = document.getElementById('show-all')
const breweryList = document.getElementById('brewery-list')

//this function displays API data as an HTML list
function displayData(data) {
    data.forEach(brewery => {
        let breweryListItem = document.createElement("li")
    breweryListItem.classList.add("list-item")
        breweryListItem.textContent += brewery.name
        breweryList.appendChild(breweryListItem)
        console.log(brewery.name)
    })
}

//GET all data from API and call
function getAllBreweries() {
    fetch('https://api.openbrewerydb.org/breweries')
    .then((response) => response.json())
    .then((data) => {
        displayData(data)
    })
}

showAllBtn.addEventListener('click', getAllBreweries)