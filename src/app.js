const showAllBtn = document.getElementById('show-all')

function getAllBreweries() {
    fetch('https://api.openbrewerydb.org/breweries')
    .then((response) => response.json())
    .then((data) => console.log(data));
}

showAllBtn.addEventListener('click', getAllBreweries)