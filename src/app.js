const showAllBtn = document.getElementById('show-all')
const breweryList = document.getElementById('brewery-list')

function displayData(data) {
    data.forEach(brewery => {
        let breweryListItem = document.createElement("li")
    breweryListItem.classList.add("list-item")
        breweryListItem.textContent += brewery.name
        breweryList.appendChild(breweryListItem)
        console.log(brewery.name)
    })
}

function getAllBreweries() {
    fetch('https://api.openbrewerydb.org/breweries')
    .then((response) => response.json())
    .then((data) => {
        displayData(data)

    })
}

showAllBtn.addEventListener('click', getAllBreweries)